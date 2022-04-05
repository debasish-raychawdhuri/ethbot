FROM ubuntu:18.04
RUN  apt-get update \
    && apt-get install -y wget \
    && rm -rf /var/lib/apt/lists/*
RUN mkdir server
WORKDIR server
RUN apt-get update \
    && apt-get install -y software-properties-common npm curl
RUN npm update -g npm
RUN npm install -g n
RUN n latest


COPY server.js .

CMD nodejs server.js


#CMD ["ls -l"]

#CMD ["echo", "we are running some # of cool things"]
