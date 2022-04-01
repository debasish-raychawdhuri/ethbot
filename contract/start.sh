#!/bin/bash
docker build --tag contract .
echo y| docker container prune
docker run --net projnet -v project:/volume --name contract contract

