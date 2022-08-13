import React, { useState } from 'react'

function Forms() {
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
            // let resJsonparsed = JSON.parse(resJson)
            setName(resJson["street"])
            setDistrict(resJson["neighborhood"])
            setRegion(resJson["city"]+"/"+resJson["state"])
            console.log(resJson, resJson["street"], name, district, region);
            makePOSTRequest(cep, resJson["street"], resJson["neighborhood"], resJson["city"]+"/"+resJson["state"])
            setCep("")
          } else {
            
          }
        } catch (err) {
          console.log(err);
        }

      };

      let makeGETRequest = async () => {
        try {
          let res = await fetch("http://localhost:8000/api/list", {
            method: "GET",
          });
          let resJson = await res.json();
          if (res.status === 200) {
            console.log(resJson)
          } else {   
          }
        } catch (err) {
          console.log(err);
        }

      };
    function makeGETRequest() {
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
        <h1>Forms Teste</h1>
        <form onSubmit={handleSubmit}>
        <fieldset>
            <label>
            <p>CEP</p>
            <input name="CEP" value={cep} placeholder='Insira seu CEP aqui' 
            onChange={(e) => setCep(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </fieldset>

        </form>
        <button onClick={makeGETRequest}>Get list</button>
        </div>
    )
}

export default Forms