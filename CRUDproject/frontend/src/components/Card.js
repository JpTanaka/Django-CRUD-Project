import React from 'react';

function CardAddress(props) {

    return (
    <div className='card-content-container'>
        
        <div className="content-container">
        <div className="text-content">
            <div className="title-card">
                
                <div className="title-cep">
                    CEP: {props.address[1]["CEP"].substr(0,5)+"-"+props.address[1]["CEP"].substr(5,8)}
            </div>
            </div>
            {props.address[1].name}
            <br/>
            {props.address[1].district}
            <br/>
            {props.address[1].region}
        
        </div>
        
        <button onClick={(e) => (props.handleDelete(e, props.address[1]["id"]))} className="button-80">Delete</button>
    </div>
    <div className="number">{props.address[1]["id"]}</div>
    </div>
       
    )
}

export default CardAddress;





