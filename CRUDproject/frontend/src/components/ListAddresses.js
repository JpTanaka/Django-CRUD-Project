import React, { useState, useEffect } from 'react'
import CardAddress from './Card';

function ListAddresses(props) {
    const [listaddresses, setListAddresses] = useState([]);
    // UseEffect for updating when database changes.
    useEffect (() => {
        console.log("useEffect ListAddresses")
        const makeGETRequest = async () => {
        try {
          let res = await fetch("http://localhost:8000/api/list", {
            method: "GET",
          });
          let resJson = await res.json();
          if (res.status === 200) {
            console.log(typeof(resJson));
            setListAddresses(Object.entries(resJson));
          } else {   
          }
        } catch (err) {
          console.log(err);
        }
      };
      makeGETRequest();
    }, [props.count]
    )

    // Delete function using event and primary key

    async function handleDelete(e, id) {
      e.preventDefault();
      try {
        let res = await fetch("http://localhost:8000/api/detail/"+id, {
          method: "DELETE",
        });
        if (res.status === 204) {
          console.log("Deleted card " )
          props.setCount(count => count+1);
        } else {
          console.log(res.status);
        }
      } catch (err) {
          
        console.log(err);
      }

    };
  //   function makePOSTRequest(id) {
  //     const requestOptions = {
  //         method: 'DELETE',
  //         headers: {'Content-Type':'application/json'},
  //         body: JSON.stringify({
  //             pk: id
  //         }
  //         )

  //     };
  //     fetch('http://localhost:8000/api/list', requestOptions).then((response) =>
  //     response.json()
  //     ).then((data)=> console.log(data));
  // }

    const listcards = listaddresses.map((address) => (
      <div className="cards-container">
        <CardAddress address = {address} key = {address[0]} handleDelete = {handleDelete}/>
      </div>
       )
    )
    
    return (
    <>
        {listcards}
    </>
    )
}

export default ListAddresses