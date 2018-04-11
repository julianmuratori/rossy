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

    handleSubmit(event) {
        event.preventDefault()
        this.props.removeFromList(event)
    }

    

    renderEpisode(key) {
        const { list, episodes } = this.state
        const episode = episodes.find(x => x._id === key)    

        if (this.state.open === false) {
            return <ListItem key={key} primaryText={'episode'} />
        } else {
            return (
                <form action="" onSubmit={this.handleSubmit}>
                <List key={key}>
                    <ListItem key={episode.title} primaryText={episode.title} />
                    <ListItem key={episode.season} primaryText={`Season ${episode.season}, Episode ${episode.episodeNumber}`} />
                </List>
                <RaisedButton type="submit" key={episode.details[0]}>Remove?</RaisedButton>
                </form>
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

