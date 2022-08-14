import './App.css';
import Teste from './components/Test';
import Forms from './components/Forms'
import ListAddresses from './components/ListAddresses.js'
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // function refreshList() {
  //   const makeGETRequest = async () => {
  //     try {
  //       let res = await fetch("http://localhost:8000/api/list", {
  //         method: "GET",
  //       });
  //       let resJson = await res.json();
  //       if (res.status === 200) {
  //         console.log(typeof(resJson));
  //         setListAddresses(Object.entries(resJson));
  //       } else {   
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   makeGETRequest();
  // }
  return (
    <div className='container-page'>
    <Forms count = {count} setCount = {setCount} />
    <ListAddresses count = {count} setCount = {setCount}/>
    </div>
  );
}

export default App;
