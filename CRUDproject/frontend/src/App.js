import './App.css';
import Teste from './components/Test';
import Forms from './components/Forms'
import ListAddresses from './components/ListAddresses.js'
import { useState } from 'react';

function App() {
  // count is a variable that changes everytime the database changes.
  const [count, setCount] = useState(0);

  return (
    <div className='container-page'>
    <Forms count = {count} setCount = {setCount} />
    <ListAddresses count = {count} setCount = {setCount}/>
    </div>
  );
}

export default App;
