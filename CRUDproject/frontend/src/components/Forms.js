import React, { useState } from 'react'

function Forms() {
    const [cep, setCep] = useState("");
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("https://brasilapi.com.br/api/cep/v1/"+cep, {
            method: "GET",
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setCep("");
            console.log(resJson);
          } else {
            
          }
        } catch (err) {
          console.log(err);
        }
      };

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
        </div>
    )
}

export default Forms