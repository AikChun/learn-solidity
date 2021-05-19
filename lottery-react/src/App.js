import { useEffect, useState } from 'react';
import lottery from './lottery';
import './App.css';

function App() {
  const [manager, setManager] = useState('');

  const fetchManagerAddress = async () => {
    const managerAddress = await lottery.methods.manager().call();
    setManager(managerAddress);
  };

  useEffect(() => {
    fetchManagerAddress();
  }, []);
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
    </div>
  );
}

export default App;
