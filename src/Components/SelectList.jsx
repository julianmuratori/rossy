import React, { Component } from "react";
// import { List, ListItem } from 'material-ui/List'
import SelectField from 'material-ui/SelectField'
import Subheader from 'material-ui/Subheader'
import MenuItem from 'material-ui/MenuItem'

class SelectList extends Component {
    state = {
        value: 0,
        episodeId: this.props.episodeId
    }

    handleChange = (value) => {
        this.setState({value})
        
        this.props.listSelect(value);
    }

    render() {
        const userLists = this.props.userLists;        
        return (
            <div>
                <Subheader>Select a List</Subheader>
                <SelectField
                    floatingLabelText="Select a List"
                    value={this.state.value}
                    episode={this.state.episodeId}
                    onChange={this.handleChange}>
                    {
                        Object.keys(userLists)
                            .map((userList, key) => {
                            return <MenuItem primaryText={userList} key={key} value={key}/>
                    })}
                    <MenuItem primaryText="Create New List" value="new"/>
                </SelectField>
            </div>
        )
    }
}

export default SelectList;