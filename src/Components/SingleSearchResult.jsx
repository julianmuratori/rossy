import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import SelectList from './SelectList'



class SingleSearchResult extends Component {

    constructor() {
      super();
      this.listSelect = this.listSelect.bind(this);
    }

    state = {
      selectedList: 0,
      episodeId: undefined      
    }
    
    listSelect = (selectedList) => {
      this.setState({
        selectedList: selectedList,
        episodeId: this.props.episode._id
      })
      
    }

    handleSubmit(event) {
      event.preventDefault()
      const episodeIdAndSelectedList = this.state
      this.props.addToList(episodeIdAndSelectedList)
    }


    
    
    render() {
        const { title, episodeNumber, details, season, _id } = this.props.episode
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <p>{title}</p>
              <p>
                Season {season}, Episode {episodeNumber}
              </p>
              <ul>
                {details.map((detail, key) => {
                  return <li key={key}>{detail}</li>;
                })}
              </ul>
              <SelectList 
                userLists={this.props.userLists} 
                episodeId={_id} 
                listSelect={this.listSelect}
                />
              <RaisedButton type="submit">Add to List</RaisedButton>
            </form>
        )
    }
}

export default SingleSearchResult;