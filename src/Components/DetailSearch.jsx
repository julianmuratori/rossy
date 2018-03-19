import React, { Component } from 'react';
import axios from 'axios';
import DetailButton from './DetailButton';
import { Field, Button } from 'bloomer';


class DetailSearch extends Component {

    
    submitSearch(event) {
        event.preventDefault();
        console.log("hi");
    }

    render() {
        return (
            <Field onSubmit={(e) => this.submitSearch(e)}> 
                {this.props.details.map(detail => {
                    return (
                        <DetailButton detail={detail}/>
                    )
                })}
                <Button>Submit</Button>
            </Field>
        )
    }
}

export default DetailSearch;