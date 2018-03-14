import React, { Component } from "react";
import axios from "axios";
import Episodes from './Components/Episodes';

class App extends Component {
  state = {
    episodes: []
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
        {this.state.episodes.map(episode => <Episodes {...episode} />)}
      </div>
    )
  }
}

export default App;
