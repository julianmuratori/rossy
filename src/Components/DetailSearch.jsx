import React, { Component } from 'react';
import axios from 'axios';

class DetailSearch extends Component {
    render() {
        return (
            <div>
                {this.props.details.map(detail => {
                    return (
                        <button>{detail}</button>
                    )
                })}
            </div>
        )
    }
}

export default DetailSearch;