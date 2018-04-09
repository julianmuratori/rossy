import React, { Component } from 'react';
import { Container } from 'bloomer';
import SingleSearchResult from "./SingleSearchResult";

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
          <Container>
            {
                results.map((result, i) => {
                    return <SingleSearchResult 
                        episode={result}
                        key={i}
                    />
                })
            }
          </Container>
        )
    }
}

export default EpisodeSearchResults;