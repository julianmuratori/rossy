import React, { Component } from 'react';
import axios from 'axios';
import DetailButton from './DetailButton';

class DetailSearch extends Component {

    submitSearch(event) {
        event.preventDefault();
        console.log("hi");
    }

    render() {
        return (
            <form onSubmit={(e) => this.submitSearch(e)}> 
                {this.props.details.map(detail => {
                    return (
                        <DetailButton detail={detail}/>
                    )
                })}
            </form>
        )
    }
}

export default DetailSearch;