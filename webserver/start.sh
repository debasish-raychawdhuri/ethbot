#!/bin/bash
docker build --tag webserver .
echo y| docker container prune

docker run --net projnet -v project:/volume --ip 172.18.1.1 --name "webserver" webserver  


