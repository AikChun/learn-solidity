import { useEffect, useState } from 'react';
import lottery from './lottery';
import './App.css';
import web3 from './web3';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const fetchContractDataAddress = async () => {
    const managerAddress = await lottery.methods.manager().call();
    setManager(managerAddress);
    const playersList = await lottery.methods.getPlayers().call();
    setPlayers(playersList);
    const contractBalance = await web3.eth.getBalance(lottery.options.address);
    setBalance(contractBalance);
  };

  const onValueChange = (e) => setValue(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setFormMessage('Waiting on transaction success...');
    await lottery.methods
      .enter()
      .send({ from: accounts[0], value: web3.utils.toWei(value, 'ether') });
    setFormMessage('You have been entered!');
  };

  const onPick = async () => {
    const accounts = await web3.eth.getAccounts();

    setFormMessage('Waiting on transaction success...');
    await lottery.methods.pickWinner().send({ from: accounts[0] });

    setFormMessage('A winner has been picked!');
  };

  useEffect(() => {
    fetchContractDataAddress();
  }, [players, balance]);
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>
        There are currently {players.length} people entered, competing to win{' '}
        {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input onChange={onValueChange} value={value} />
        </div>
        <button type="submit">Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={onPick} type="button">
        Pick a winner
      </button>
      <hr />
      <h1>{formMessage}</h1>
    </div>
  );
}

export default App;
