import React, { Component } from 'react';
import SingleSearchResult from "./SingleSearchResult";
import List from 'material-ui/List'

class EpisodeSearchResults extends Component {
    state = {
        results: []
    }

    componentWillReceiveProps = nextProps => {
        const results = nextProps.searchResults
        if (JSON.stringify(this.props.searchResults) !== JSON.stringify(results)) {
            this.setState({ results })
        }
    }

    render() {
        const { results } = this.state;
        return (
          <List>
            {
                results.map((result, i) => {
                    return <SingleSearchResult 
                        episode={result}
                        key={i}
                        userLists={this.props.userLists}
                        listSelect={this.props.listSelect}
                    />
                })
            }
          </List>
        )
    }
}

export default EpisodeSearchResults;