#!/bin/bash
docker image build --tag project_server .
echo y| docker container prune
docker run -p 30303:30303 -p 30303:30303/udp --name server --net projnet --ip 172.18.0.2 project_server
