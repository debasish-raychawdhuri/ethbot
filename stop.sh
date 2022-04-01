#!/bin/bash
docker container stop `docker container ls|grep botxx|cut -d ' ' -f 1`
