# Dumper

[![Build Status](https://travis-ci.org/henrywang/dumper.svg?branch=master)](https://travis-ci.org/henrywang/dumper)

An RESTful API interface.

## Introduction

Dumper API is a fully hosted solution to manage IP address of each VM which is generated dynamically . Dumper API provides a [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) API built on [pragmatic RESTful design](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api) principles.

Dumper API uses resource-oriented URLs that leverage built in features of HTTP, like verbs, response codes. All request and response bodies are [JSON](http://en.wikipedia.org/wiki/JSON) encoded, including error responses. Any off-the-shelf HTTP client can be used to communicate with the API.
We believe an API is a user interface for a developer - accordingly, we've made sure our API can be easily explored from the browser!

## Cloud init

### How to generate ISO file used by cloud-init

Run the following Shell script with parameters:
```Shell
./tools/make-cloud-init-iso.sh <API URL> <Atomic Version> <Hypervisor Version> <Firmware> <Build Number> <Public Key>
```

The build number will come from your CI. The public key will be appended into .ssh/authorized_keys. The Atomic host will support SSH RSA/DSA authentication.

For example:

```Shell
./tools/make-cloud-init-iso.sh http://10.10.10.10:9000/api/v0/stacker/ipaddrs 7.4.1 2016 gen1 101 "`cat ~/.ssh/id_rsa.pub`"
```
