# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].


### Configuring your project
Versions and Dependencies
  - meta mask (extension for Google Chrome)
  - truffle: v4.1.14
  - ganache-cli: v6.1.8
  - "openzeppelin-solidity": "2.0.0-rc.1"
  - "truffle-hdwallet-provider": "0.0.6"

For Local tests you can use Ganache or similar

Use NPM to install the dependencies of the project.
```
npm install
```

## Running the server

To test code:
1: Open the node.js command prompt.
2: Navigate to the root folder of the project
3: Inside 'smart_contracts' folder
4: Be sure you ran the 'npm install' command

Using Ganache
1: Open a new the node.js command prompt
2: Run 'ganache-cli'
    2.a: Server must be running at localhost:8545
    2.b: Copy the mnemonic
3: Open Google Chrome, open MetaMask and connect to the fake account using the result of step 2.b

Using truffle
1: Open a new the node.js command prompt
2: Navigate to the projects folder, and inside 'smarts_contracts'
3: Run 'truffle migrate'
4: WARN - The Contract address must be updated on index.html

```
After all the steps you can run the index.html or truffle tests
```

## Rinkeby Network Information

- Transaction ID: 0xc63e1564f31adbab48be41482a8f600605a1d6365f8e40a0e39960a30e711ef0
- Contract address: 0x3ad4dd7ff49a625763d1a2eb0230a9434ff2ea16
- EtherScan: https://rinkeby.etherscan.io/address/0x3ad4dd7ff49a625763d1a2eb0230a9434ff2ea16