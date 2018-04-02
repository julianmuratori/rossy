import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// COMPONENTS
import UserLogin from "./Components/UserLogin"
import UserSignup from "./Components/UserSignup"
import DetailSearch from './Components/DetailSearch'
import EpisodeSearchResults from './Components/EpisodeSearchResults'
import { getToken } from './lib/tokenService'
// import Episodes from './Components/Episodes';



class App extends Component {
  state = {
    user: null,
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

  getCurrentUser = () => {
    // TRIES TO RETRIEVE USER'S TOKEN
    const token = getToken();
    // IF THEY HAVE A TOKEN, MAKE A REQUEST TO /USER/CURRENT FOR THEIR DETAILS
    if (token) {
      axios
        .get("/user/current", {
          header: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.status === 200) {
            const user = res.data.payload
            this.setState({ user })
          }
        })
    }
  }

  returnedEpisodes = searchResults => {
    this.setState({ searchResults });
  };

  listSelect = (list, episode) => {
    console.log(list);
    console.log(episode);
  };

  setUser = user => {
    this.setState({ user })
  }

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
            {/* IF THE USER IS LOGGED IN AND TRIES TO HIT SIGNUP, GO STRAIGHT TO THE DASHBOARD. OTHERWISE, RENDER SIGNUP */}
              <Route
                exact
                path="/signup"
                render={() =>
                  this.state.user ? (
                    <Redirect to="/" />
                  ) : (
                      /* pass down this.setUser as a prop */
                      <UserSignup setUser={this.setUser} />
                    )
                }
              />

            {/* IF THEY'RE LOGGED IN AND TRY TO HIT THE LOGIN PATH, GO STRAIGHT TO THE DASHBOARD. OTHERWISE HIT THE LOGIN SCREEN   */}
            <Route 
              exact path="/login"
              render={() => this.state.user ? <Redirect to="/" /> : <UserLogin />
              }  
            /> 
                        
            {/* IF THE USER IS LOGGED IN, TAKE THEM TO THE DASHBOARD. OTHERWISE, BOOT THEM TO THE LOGIN SCREEN */}
            <Route
              path="/"
              // if there is a user set in state, show the dashboard. Otherwise, redirect the user to the login screen
              render={() => this.state.user ?
                <DetailSearch
                  details={paintingDetails}
                  episodes={episodes}
                  returnedEpisodes={this.returnedEpisodes}
                />
                : <Redirect to="/login" />}
            />

            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
};

export default App;


{/* 
  <EpisodeSearchResults
    searchResults={searchResults}
    userLists={userLists}
    listSelect={this.listSelect}
  /> */}
