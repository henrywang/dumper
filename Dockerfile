FROM node:latest
MAINTAINER Xiaofeng Wang <xiaofwan@redhat.com>

RUN mkdir -p /usr/src/dumper
WORKDIR /usr/src/dumper
COPY . /usr/src/dumper

EXPOSE 9000
RUN npm install
CMD ["npm", "start"]
