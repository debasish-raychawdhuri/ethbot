#!/bin/bash
docker run -p 30304:30304 -p 30304:30304/udp --net projnet --name proj project
