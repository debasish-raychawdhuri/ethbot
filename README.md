# Running Ethbot

The Ethbot source code allows one to run and test the Ethbot concept. It is not designed to be used for truely mounting an attack. We use Docker to simulate different components of the distributed system. This readme describes how to run the test bench.

The following is the directory structure - 

- **Top level:** This directory contains the code for the bots.
- **server:** Contains the Docker code for the deployment of a single geth node which acts as proxy for the main Ethereum chain.
- **contract:** Contains the code to deploy the solidity contract and also create the public keys for the bots to transact.
- **webserver:** Contains a basic webserver that acts as a dummy target to test the attack.

## Steps to run:
We assume that a working docker installation is present and working.
 - **Setup:** To setup the system for running for the first time, use the following command from the top level directory - 
 ```bash 
 sh network_create.sh
 sh contract/setup.sh
 ```
This creates a Docker network and a volume. 

- **Start the server:** To start the server, first move to the `server` directory - 
 ```bash
 cd server
 ```
 Now use the command - 
 ```bash
 sh start.sh
 ```
