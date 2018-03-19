import React from 'react';

const DetailButton = (props) => {
    return (
        <div>
        <input type="radio" value={props.detail} id={props.detail}/>
        <label for={props.detail}>{props.detail}</label>
        </div>
    )
}

export default DetailButton;