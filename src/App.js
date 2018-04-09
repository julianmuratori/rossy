import React, { Component } from "react";
import axios from "axios";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// COMPONENTS
import UserLogin from "./Components/UserLogin";
import DetailSearch from './Components/DetailSearch';
import EpisodeSearchResults from './Components/EpisodeSearchResults';
import MainDashboard from "./Components/MainDashboard";
// import Episodes from './Components/Episodes';



class App extends Component {
  state = {
    user: {},
    episodes: [],
    paintingDetails: [],
    searchResults: [],
    userLists: {
      Trees: {
        listId: 1,
        listEpisodes: [1, 2, 5]
      },
      Mountains: {
        listId: 2,
        listEpisodes: [3, 5, 7]
      }
    }
  };

  constructor() {
    super();
    this.returnedEpisodes = this.returnedEpisodes.bind(this);
    this.addToList = this.addToList.bind(this)
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
    this.setState({ searchResults })
  }

  // GRABS AN EPISODE'S ID AND ADDS IT TO THE SELECTED LIST
  // IF THE EPISODE ID ALREADY EXISTS IN THAT LIST, SAY NO WAY JOSE
  addToList = (episodeIdAndSelectedList) => {
    const { episodeId, selectedList } = episodeIdAndSelectedList
    const newListAddition = Object.keys(this.state.userLists)
    const existingLists = this.state.userLists
    
    if (newListAddition.includes(selectedList) && !existingLists[selectedList].listEpisodes.includes(episodeId)) {
      // const list = selectedList
      existingLists[selectedList].listEpisodes.push(episodeId)
    }
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    const { paintingDetails, episodes, searchResults, userLists } = this.state;
    return (
      <MuiThemeProvider className="App">
        {/* <UserLogin /> */}
        {/* <DetailSearch
          details={paintingDetails}
          episodes={episodes}
          returnedEpisodes={this.returnedEpisodes}
        />
        <EpisodeSearchResults
          searchResults={searchResults}
          userLists={userLists}
          addToList={this.addToList}
        /> */}
        <MainDashboard />
      </MuiThemeProvider>
    );
  }
};

export default App;
