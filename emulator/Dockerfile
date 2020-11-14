FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y build-essential

RUN apt-get install -y  qemu-system

RUN apt-get install -y sudo
RUN apt-get install -y uml-utilities iproute2 wget iptables

COPY . /app

WORKDIR /app

RUN ./download.sh

ENTRYPOINT ["/app/run.sh"]
