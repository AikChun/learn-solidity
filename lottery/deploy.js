// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const infura_api_endpoint =
  'https://rinkeby.infura.io/v3/685f851de0d84f6989dc57e8239e5dd6';

const provider = new HDWalletProvider(
  'clown enjoy case clump close potato entry anxiety wreck dial memory donor',
  infura_api_endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
  const [account, ...rest] = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', account);
  const contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: account });
  console.log('contract interface:', interface);
  console.log('contract deployed to:', contract.options.address);
};

deploy();
