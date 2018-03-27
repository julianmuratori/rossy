import React, { Component } from 'react'
import AddToList from './AddToList'
import SelectList from './SelectList'



class SingleSearchResult extends Component {
    
    addToList(event) {
        event.preventDefault();
        
    }
    
    render() {
        const { title, episodeNumber, details, season, _id } = this.props.episode
        return (
            <form onSubmit={(e) => {this.addToList(e)}}>
              <p>{title}</p>
              <p>
                Season {season}, Episode {episodeNumber}
              </p>
              <ul>
                {details.map((detail, key) => {
                  return <li key={key}>{detail}</li>;
                })}
              </ul>
              <SelectList userLists={this.props.userLists} episodeId={_id} listSelect={this.props.listSelect}/>
              <AddToList />
            </form>
        )
    }
}

export default SingleSearchResult;