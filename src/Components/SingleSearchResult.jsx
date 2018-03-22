import React, { Component } from 'react';
import { Container, Form } from 'bloomer'
import AddToList from './AddToList'


class SingleSearchResult extends Component {
    
    addToList(event) {
        event.preventDefault();
        console.log(this.props.episode.title)
    }
    
    render() {
        const { title, episodeNumber, details, season } = this.props.episode;
        return (
          <Container>
            <form onSubmit={(e) => {this.addToList(e)}}>
              <p>{title}</p>
              <p>
                Season {season}, Episode {episodeNumber}
              </p>
              <ul>
                {details.map(detail => {
                  return <li>{detail}</li>;
                })}
              </ul>
              <AddToList />
            </form>
          </Container>
        )
    }
}

export default SingleSearchResult;