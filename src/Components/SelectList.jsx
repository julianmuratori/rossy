import React, { Component } from "react";
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class SelectList extends Component {
    
    handleChange = (event, index, value) => {
        const { listSelect } = this.props
        listSelect(value);
    }
    
    render() {
        const { userLists } = this.props        
        return (
            <div>
                <SelectField
                    floatingLabelText="Select a List"
                    onChange={this.handleChange}>
                    {
                        Object.keys(userLists)
                            .map((userList, key) => {
                            return <MenuItem 
                                primaryText={userList} 
                                key={key} 
                                value={userList}
                                />
                    })}
                    <MenuItem primaryText="Create New List" value="new"/>
                </SelectField>
            </div>
        )
    }
}

export default SelectList;