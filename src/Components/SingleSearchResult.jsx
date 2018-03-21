import React, { Component } from 'react';
import { Container } from 'bloomer'


class SingleSearchResult extends Component {
    render() {
        const { title, episodeNumber, details, season } = this.props.episode;
        return (
            <Container>
                <p>{title}</p>
            </Container>
        )
    }
}

export default SingleSearchResult;