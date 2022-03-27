FROM ubuntu:20.04
RUN  apt-get update \
  && apt-get install -y wget \
  && apt-get install -y nodejs \
  && apt-get install -y npm  \
  && rm -rf /var/lib/apt/lists/*
RUN wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.10.16-20356e57.tar.gz

RUN tar -xzf geth-linux-amd64-1.10.16-20356e57.tar.gz
RUN mv geth-linux-amd64-1.10.16-20356e57 geth
WORKDIR geth
COPY genesis-block.json .
COPY keyfile .
COPY password .
RUN chmod +x geth
RUN mkdir ~/gethdir
RUN ./geth --networkid 2010 --datadir ~/gethdir init genesis-block.json
RUN ./geth account import --datadir ~/gethdir/ --password password keyfile

CMD ./geth --http -http.port 8545 --http.corsdomain '*' --networkid 2010 --http.api "personal,eth,net,web3,miner,txpool,admin" --nodiscover --miner.etherbase 0xAe930f01A40776B27E0bb92262537b3a83F92779 --datadir ~/gethdir --mine --miner.threads 1 --light.serve 100 --verbosity 9


