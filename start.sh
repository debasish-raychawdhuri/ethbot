#!/bin/bash
docker build --tag project .
echo y| docker container prune
docker run -p 30304:30304 -p 30304:30304/udp --net projnet -v project:/volume --name proj project

