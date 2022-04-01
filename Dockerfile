FROM ubuntu:18.04
RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*
RUN wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.10.16-20356e57.tar.gz

RUN tar -xzf geth-linux-amd64-1.10.16-20356e57.tar.gz
RUN mv geth-linux-amd64-1.10.16-20356e57 geth
WORKDIR geth
COPY server/genesis-block.json .
RUN chmod +x geth
RUN mkdir gethdir
COPY static-nodes.json gethdir/static-nodes.json
RUN ./geth --networkid 2010 --datadir gethdir init genesis-block.json
RUN apt-get update \
  && apt-get install -y software-properties-common npm curl
RUN npm update -g npm
RUN npm install -g n
RUN n latest

RUN npm install ethereumjs-tx
RUN npm install --save web3@1.2.9
COPY run_services.sh .
COPY bot.js .



CMD sh run_services.sh


#CMD ["ls -l"]

#CMD ["echo", "we are running some # of cool things"]
