import React, { Component } from 'react';
import { Control, Checkbox } from 'bloomer';


const selectedDetails = []

class DetailButton extends Component  {
    
    checked(event) {
        const detail = event.target.value;
        
        if (!selectedDetails.includes(detail)) {
            selectedDetails.push(detail)
        }
        console.log(selectedDetails);
                
    }
    render() {
        return (
            <Control>
                <Checkbox onChange={(e) => this.checked(e)} value={this.props.detail}>{this.props.detail}</Checkbox>
            </Control>
        )
    }
}

export default DetailButton;

