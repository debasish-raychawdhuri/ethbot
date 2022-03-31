#!/bin/bash
docker build --tag contract .
echo y| docker container prune
docker run -p 30304:30304 -p 30304:30304/udp --net projnet --name contract contract

