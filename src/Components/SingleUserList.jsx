import React, { Component } from 'react'
import ListItem from 'material-ui/List/ListItem'
import List from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'


class SingleUserList extends Component {

    constructor() {
        super()
        this.renderEpisode = this.renderEpisode.bind(this)
    }

    state = {
        open: false,
        list: null,
        episodes: []
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

    

    renderEpisode(key) {
        const { list, episodes } = this.state
        const episode = episodes.find(x => x._id === key)        
        // const episode = episodes.find()
        if (this.state.open === false) {
            return <ListItem key={key} primaryText={'episode'} />
        } else {
            return (
                <List key={key}>
                    <ListItem primaryText={episode.title} />
                    <ListItem primaryText={`Season ${episode.season}, Episode ${episode.episodeNumber}`} />
                    <ListItem 
                        primaryText={episode.title} />
                    <RaisedButton>Remove?</RaisedButton>
                </List>
            )
    }
}

    componentWillReceiveProps = (nextProps) => {
        const { list, episodes } = nextProps
        this.setState({ list, episodes })
    }
    
    
    render() {
        const { title, list } = this.props;
        return (
            <ListItem 
                primaryText={title}
                open={this.state.open}
                onNestedListToggle={this.handleNestedListToggle}
                nestedItems={list.map(this.renderEpisode)}
            />
        )
    }
}

export default SingleUserList

