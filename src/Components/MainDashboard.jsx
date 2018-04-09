import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

class MainDashboard extends Component {
    render() {
        return (
            <div>
                <Paper>
                    <Menu>
                        <MenuItem primaryText="View Lists" />
                        <MenuItem primaryText="Create a New List" />
                        <MenuItem primaryText="Logout" />
                    </Menu>
                </Paper>
            </div>
        )
    }
}

export default MainDashboard