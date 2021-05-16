// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let fetchedAccounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there';
beforeEach(async () => {
  fetchedAccounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_MESSAGE],
    })
    .send({ from: fetchedAccounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, INITIAL_MESSAGE);
  });

  it('can change the message', async () => {
    const newMessage = 'Bye there';

    // returns transaction hash below
    await inbox.methods
      .setMessage(newMessage)
      .send({ from: fetchedAccounts[0] });

    const message = await inbox.methods.message().call();
    assert.strictEqual(message, newMessage);
  });
});
