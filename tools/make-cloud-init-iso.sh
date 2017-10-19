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
upload_script="$init_dir/upload_script"
iso_image="cloud-init.iso"
log_file=$(mktemp -t runcmd.log.XXXXXXXXXX)

vm_user="root"
vm_pass="atomic"

mkdir -p $init_dir

cat >$upload_script <<EOF
#!/bin/bash
curl --connect-timeout 2 --max-time 3 -i -X POST -H 'Content-Type: application/json' -d '{"vmName": "Atomic-${version}-${hypervisor}-${firmware}-${build_num}", "ip": "'"VMIPCMD"'"}' ${api_url} >${log_file}
exit 0
EOF
sed -i $upload_script -e 's/VMIPCMD/$(ip route get 8.8.8.8 | head -1 | cut -d\x27\ \x27 -f7)/'
script_b64=`cat $upload_script | base64 -w 0`

cat >$meta_data <<EOF
EOF

cat >$user_data <<EOF
#cloud-config
users:
  - default
  - name: ${vm_user}
    groups: users,wheel
    ssh-authorized-keys:
      - ${key_pub}
ssh_pwauth: True
chpasswd:
  list: |
    ${vm_user}:${vm_pass}
  expire: False
write_files:
  - encoding: b64
    path: /var/lib/cloud/upload_ip.sh
    permissions: '0555'
    content: ${script_b64}

runcmd:
  - /var/lib/cloud/upload_ip.sh
EOF

genisoimage -input-charset utf-8 -output $iso_image -volid cidata -joliet -rock $user_data $meta_data
