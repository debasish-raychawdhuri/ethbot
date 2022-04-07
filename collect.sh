#!/bin/bash
for box in `docker container ls|grep botxx|cut -d ' ' -f 1`
do
	docker exec -t $box cat output
done
