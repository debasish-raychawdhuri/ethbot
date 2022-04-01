#!/bin/bash
docker build --tag project .
echo y| docker container prune


for num in $(seq 1 $1)
do
	echo $num
	docker run --net projnet -v project:/volume --name "botxx$num" project > /dev/null 2>/dev/null  &
	sleep 2
done

