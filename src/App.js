import React, { Component } from "react";
import axios from "axios";
import { Container } from 'bloomer';

// COMPONENTS
// import UserLogin from "./Components/UserLogin";
import DetailSearch from './Components/DetailSearch';
import EpisodeSearchResults from './Components/EpisodeSearchResults';
// import Episodes from './Components/Episodes';



class App extends Component {
  state = {
    episodes: [],
    paintingDetails: [],
    searchResults: []
  }
  
  constructor() {
    super()
    this.returnedEpisodes = this.returnedEpisodes.bind(this);
  }

  // REFACTOR THIS INTO A SEPARATE COMPONENT AT SOME POINT
  refresh = () => {
    axios.get("/episodes").then(res => {
      const data = res.data

      if (data.payload) {
        this.setState({ episodes: data.payload });
      }
    })

    axios.get("/search").then(res => {
      const data = res.data

      if (data.payload) {
        this.setState({ paintingDetails: data.payload[0].details })
      }
    })
  }

  returnedEpisodes = (searchResults) => { this.setState({ searchResults })};



  componentDidMount() {
      this.refresh()
    }
  
  render() {
    
    const { paintingDetails, episodes, searchResults } = this.state;
    return (
      <Container className="App">
        {/* <UserLogin /> */}
        <DetailSearch details={paintingDetails} episodes={episodes} returnedEpisodes={this.returnedEpisodes}/>
        <EpisodeSearchResults searchResults={searchResults} />
      </Container>
    )
  }
};

export default App;
