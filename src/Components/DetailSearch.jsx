import React, { Component } from 'react';
import EpisodeSearchResults from './EpisodeSearchResults'
import DetailButton from './DetailButton'
import RaisedButton from 'material-ui/RaisedButton'

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
    const { searchResults, userLists } = this.props;

    const styles = {
      form: {
        width: '980px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap'
      }
    }
    return (
      <div>
      <form style={styles.form} onSubmit={e => this.submitSearch(e)}>
        {this.props.details.map(detail => {
          return (
            <DetailButton
              detail={detail}
              handleCheckboxChange={this.handleCheckboxChange}
              key={detail}
            />
          );
        })}
        <RaisedButton type="submit">Submit</RaisedButton>
      </form>
        <EpisodeSearchResults 
          searchResults={searchResults}
          userLists={userLists}
          addToList={this.props.addToList}   
        />
      </div>
    );
  }
}

export default DetailSearch;