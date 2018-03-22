import React, { Component } from 'react';
import { Container } from 'bloomer'


class SingleSearchResult extends Component {
    render() {
        const { title, episodeNumber, details, season } = this.props.episode;
        return <Container>
            <p>{title}</p>
            <p>
              Season {season}, Episode {episodeNumber}
            </p>
            <ul>
                {details.map(detail => {
                    return <li>{detail}</li>
                })}
            </ul>
          </Container>;
    }
}

export default SingleSearchResult;