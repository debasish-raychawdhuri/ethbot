FROM ubuntu:20.04
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
COPY run_services.sh .
CMD sh run_services.sh


#CMD ["ls -l"]

#CMD ["echo", "we are running some # of cool things"]
