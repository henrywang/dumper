#! /bin/bash
# -*- coding: utf-8 -*-

# This file is part of Stacker.

set -e

api_url=$1
version=$2
hypervisor=$3
firmware=$4
build_num=$5
key_pub=$6

# create the cloud-init iso
init_dir=$(mktemp -d)
meta_data="$init_dir/meta-data"
user_data="$init_dir/user-data"
iso_image="cloud-init.iso"

vm_user="root"
vm_pass="atomic"

mkdir -p $init_dir

cat >$meta_data <<EOF
EOF

cat >$user_data <<EOF
#cloud-config
users:
  - default
  - name: ${vm_user}
    groups: users,wheel
    ssh_authorized_keys:
      - ${key_pub}
ssh_pwauth: True
chpasswd:
  list: |
    ${vm_user}:${vm_pass}
  expire: False
write_files:
  - path: /usr/local/bin/updater.sh
    permissions: '0555'
    content: |
          #!/bin/bash
          curl --connect-timeout 2 --max-time 3 -i -X POST -H 'Content-Type: application/json' -d '{"vmName": "Atomic-${version}-${hypervisor}-${firmware}-${build_num}", "ip": `ip route get 8.8.8.8 | head -1 | cut -d' ' -f7`}' ${api_url} >/dev/null
runcmd:
  - /usr/local/bin/updater.sh
EOF

genisoimage -input-charset utf-8 -output $iso_image -volid cidata -joliet -rock $user_data $meta_data
