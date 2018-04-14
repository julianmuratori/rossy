import React, { Component } from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import axios from "axios"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { getToken } from './Services/tokenService'

// COMPONENTS
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Signup from './Components/Signup'
import Logout from './Components/Logout'



class App extends Component {
  state = {
    user: null,
    episodes: [],
    paintingDetails: [],
    searchResults: []    
  };

  constructor() {
    super();
    this.returnedEpisodes = this.returnedEpisodes.bind(this);
    this.removeFromList = this.removeFromList.bind(this)
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

 

  // REMOVE AN EPISODE FROM A LIST
  removeFromList = (event) => {
    console.log('removed')
  }

  componentDidMount() {
    this.getCurrentUser();
    this.refresh();
  }

  setUser = user => {
    this.setState({ user })
  }

  // checks if current user has token in localStorage
  // this function is called in componentDidMount
  getCurrentUser = () => {
    // 1. Try and retrieve the user's token
    const token = getToken();
    // 2. If they have a token, make a request to /user/current for their user details
    if (token) {
      axios
        .get("/user/current", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.status === 200) {
            const user = res.data.payload;
            this.setState({ user });
          }
        });
    }
  }

  render() {
    const { paintingDetails, episodes, searchResults } = this.state;

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
                    <Login getCurrentUser={this.getCurrentUser}/>
                }
              />
              <Route
                exact
                path="/signup"
                render={() =>
                  this.state.user ? 
                    <Redirect to="/mylists" /> : 
                    <Signup setUser={this.setUser}/>
                }
              />
              <Route
                path="/"
                render={() =>
                  this.state.user ? 
                    <Dashboard 
                      setUser={this.setUser}
                      details={paintingDetails}
                      episodes={episodes}
                      returnedEpisodes={this.returnedEpisodes}
                      searchResults={searchResults}
                      // userLists={userLists}
                      // addToList={this.addToList}
                      removeFromList={this.removeFromList}
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
