import React, { Component } from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import axios from "axios"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// COMPONENTS
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Signup from './Components/Signup'



class App extends Component {
  state = {
    user: {},
    episodes: [],
    paintingDetails: [],
    searchResults: [],
    userLists: {
      Trees: {
        listId: 1,
        listEpisodes: ['5aa983c0da22f444aca48359', '5aa983c0da22f444aca48359']
      },
      Mountains: {
        listId: 2,
        listEpisodes: ['5aa9867dda22f444aca48366', '5aa983c0da22f444aca48359']
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
        
        <Router>
          <div>
          <Switch>
              <Route
                exact
                path="/login"
                render={() =>
                  this.state.user ? 
                    <Redirect to="/mylists" /> : 
                    <Login />
                }
              />
              <Route
                exact
                path="/signup"
                render={() =>
                  this.state.user ? 
                    <Redirect to="/mylists" /> : 
                    <Signup />
                }
              />
              <Route
                path="/"
                render={() =>
                  this.state.user ? 
                    <Dashboard 
                      details={paintingDetails}
                      episodes={episodes}
                      returnedEpisodes={this.returnedEpisodes}
                      searchResults={searchResults}
                      userLists={userLists}
                      addToList={this.addToList}
                    /> : <Redirect to="/login" />
                }
              />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
};

export default App;
