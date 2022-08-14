import React, { useState } from 'react'

function Forms(props) {
    const [cep, setCep] = useState("");
    const [name, setName] = useState("")
    const [district, setDistrict] = useState("")
    const [region, setRegion] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("https://brasilapi.com.br/api/cep/v1/"+cep, {
            method: "GET",
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setName(resJson["street"])
            setDistrict(resJson["neighborhood"])
            setRegion(resJson["city"]+"/"+resJson["state"])
            makePOSTRequest(cep, resJson["street"], resJson["neighborhood"], resJson["city"]+"/"+resJson["state"])
            setCep("")
            props.setCount(count => count+1);
          } else {
            alert("CEP não encontrado.");
            setCep("");
          }
        } catch (err) {
            
          console.log(err);
        }

      };

      
    // function makeGETRequest() {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //             CEP: cep,
    //             name: name,
    //             district: district,
    //             region: region,
    //         }
    //         )

    //     };
    //     fetch('http://localhost:8000/api/list', requestOptions).then((response) =>
    //     response.json()
    //     ).then((data)=> console.log(data));
    // }
    function makePOSTRequest(cep, name, district, region) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                CEP: cep,
                name: name,
                district: district,
                region: region,
            }
            )

        };
        fetch('http://localhost:8000/api/list', requestOptions).then((response) =>
        response.json()
        ).then((data)=> console.log(data));
    }

    return(
        <div className="wrapper">
        <div className="title-page">
            Consulte seu CEP
        </div>
        <form onSubmit={handleSubmit}>
            
        <fieldset>
            <div className="forms">
            <label>
            {/* <p>CEP</p> */}
            <input name="CEP" value={cep} placeholder='Ex.: 12345678' 
            onChange={(e) => setCep(e.target.value)} className="input-cep"/>
            </label>
            <button type="submit" className='button-9'>Submit</button>   
            </div>
        </fieldset>
     
        </form>
        {/* <button onClick={makeGETRequest}>Get list</button> */}
        </div>
    )
}

export default Forms