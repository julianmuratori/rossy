<<<<<<< HEAD
import React, { Component } from 'react'
import DetailButton from './DetailButton'
import RaisedButton from 'material-ui/RaisedButton'
=======
import React, { Component } from 'react';
import DetailButton from './DetailButton';
import { Button } from 'bloomer';
>>>>>>> parent of 460d8b7... working out how to select a list and add a result to it

class DetailSearch extends Component {
  constructor() {
    super();
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  submitSearch = event => {
    event.preventDefault();

    // 1. VARIABLES FOR DETAILS SET
    const searchItems = this.selectedCheckboxes;
    const searchResults = [];
    const { episodes, returnedEpisodes } = this.props;
    
    // 2. GO THROUGH EACH DETAIL IN THE SET
    searchItems.forEach(detail => {
    // 3. ITERATE OVER EVERY EPISODE WITH EVERY INDIVIDUAL DETAIL
      episodes.forEach(episode => {
         const details = episode.details;
    // 4. VERIFY IF THE DETAIL IS PRESENT
         if (details.includes(detail) === true) {
    // 5. RETURN THE EPISODE TO A NEW ARRAY
            searchResults.push(episode);       
         }
        }
      )
    })
    console.log(searchResults)
   returnedEpisodes(searchResults);
  }

  handleCheckboxChange = detail => {
    if (this.selectedCheckboxes.has(detail)) {
      this.selectedCheckboxes.delete(detail);
    } else {
      this.selectedCheckboxes.add(detail);
    }
  };

  render() {
    return (
      <form onSubmit={e => this.submitSearch(e)}>
        {this.props.details.map(detail => {
          return (
            <DetailButton
              detail={detail}
              handleCheckboxChange={this.handleCheckboxChange}
              key={detail}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default DetailSearch;