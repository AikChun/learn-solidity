import { useEffect, useState } from 'react';
import lottery from './lottery';
import './App.css';
import web3 from './web3';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState('');

  const fetchContractDataAddress = async () => {
    const managerAddress = await lottery.methods.manager().call();
    setManager(managerAddress);
    const playersList = await lottery.methods.getPlayers().call();
    setPlayers(playersList);
    const contractBalance = await web3.eth.getBalance(lottery.options.address);
    setBalance(contractBalance);
  };

  const onValueChange = (e) => setValue(e.target.value);

  useEffect(() => {
    fetchContractDataAddress();
  }, []);
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>
        There are currently {players.length} people entered, competing to win{' '}
        {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />
      <form>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input onChange={onValueChange} value={value} />
        </div>
        <button type="button">Enter</button>
      </form>
    </div>
  );
}

export default App;
