import React, { Component } from 'react'
import ListItem from 'material-ui/List/ListItem'

class SingleUserList extends Component {
    state = {
        open: false,
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        })
    }

    render() {
        const { list, title } = this.props;
      


        // const episodes = userLists.{title}.listEpisodes[1]

        return (
            <ListItem 
                primaryText={title}
                open={this.state.open}
                onNestedListToggle={this.handleNestedListToggle}
                nestedItems={[
                    list.map(function(episode, i) {
                        return <ListItem key={i} primaryText={episode} />
                    })
                ]}
            />
        )
    }
}

export default SingleUserList