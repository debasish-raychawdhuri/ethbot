FROM ubuntu:18.04
RUN mkdir work
WORKDIR work
RUN apt-get update \
  && apt-get install -y software-properties-common npm curl
RUN npm update -g npm
RUN npm install -g n 
RUN n latest
RUN  add-apt-repository -y ppa:ethereum/ethereum \
  && apt-get update \
  && apt-get install -y solc \
  && rm -rf /var/lib/apt/lists/*

RUN npm install ethereumjs-tx
RUN npm install web3
COPY contract.sol .
RUN solc --abi contract.sol|tail -1 > contract.abi
RUN solc --bin contract.sol|tail -1 > contract.bin
COPY publish.js .
CMD nodejs publish.js


#CMD ["ls -l"]

#CMD ["echo", "we are running some # of cool things"]
