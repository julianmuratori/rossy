import React, { Component } from 'react';
// import axios from 'axios';
import DetailButton from './DetailButton';
import { Button } from 'bloomer';


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
    const searchItems = this.selectedCheckboxes;
    
    
    // 1. take the array of episodes
    const { episodes } = this.props;
    // console.log(selectedDetails)
    episodes.forEach((episode) => {
      
      
    })


    // 2. filter through that array based on selected details
    // const newEps = episodes.filter(item => item[details] === details)
    
    // 3. return the results in a new array
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