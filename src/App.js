import React, { Component } from "react";
import axios from "axios";

// COMPONENTS
import UserLogin from "./Components/UserLogin";

// import Episodes from './Components/Episodes';


class App extends Component {
  state = {
    episodes: [],
    paintingDetails: []
  };
  
  refresh = () => {
    axios.get("/episodes").then(res => {
      const data = res.data;

      if (data.payload) {
        this.setState({ episodes: data.payload });
      }
    });
  };

  componentDidMount() {
      this.refresh();
      }
  
  render() {
    return (
      <div className="App">
        <UserLogin />
      </div>
    )
  }
}

export default App;
