import React, { Component } from "react";
import axios from "axios";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// COMPONENTS
// import UserLogin from "./Components/UserLogin";
import DetailSearch from './Components/DetailSearch';
import EpisodeSearchResults from './Components/EpisodeSearchResults';
// import Episodes from './Components/Episodes';



class App extends Component {
  state = {
    user: {},
    episodes: [],
    paintingDetails: [],
    searchResults: [],
    userLists: {
      Trees: [1, 2, 5],
      Mountains: [3, 5, 7]
    }
  };

  constructor() {
    super();
    this.returnedEpisodes = this.returnedEpisodes.bind(this);
    this.listSelect = this.listSelect.bind(this)
  }

  // REFACTOR THIS INTO A SEPARATE COMPONENT AT SOME POINT
  refresh = () => {
    axios.get("/episodes").then(res => {
      const data = res.data;

      if (data.payload) {
        this.setState({ episodes: data.payload });
      }
    });

    axios.get("/search").then(res => {
      const data = res.data;

      if (data.payload) {
        this.setState({ paintingDetails: data.payload[0].details });
      }
    });
  };

  returnedEpisodes = searchResults => {
    this.setState({ searchResults });
  };

  listSelect = (list, episode) => {
    console.log(list);
    console.log(episode);
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    const { paintingDetails, episodes, searchResults, userLists } = this.state;
    return (
      <MuiThemeProvider className="App">
        {/* <UserLogin /> */}
        <DetailSearch
          details={paintingDetails}
          episodes={episodes}
          returnedEpisodes={this.returnedEpisodes}
        />
        <EpisodeSearchResults
          searchResults={searchResults}
          userLists={userLists}
          listSelect={this.listSelect}
        />
      </MuiThemeProvider>
    );
  }
};

export default App;
