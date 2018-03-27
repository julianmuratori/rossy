import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'

class AddToList extends Component {
    render() {
        return (
            <div>
                <RaisedButton type="submit">Add to List</RaisedButton>
            </div>
        )
    }
}

export default AddToList;