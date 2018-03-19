import React, { Component } from "react";
import axios from "axios";
import { Container, Box } from 'bloomer';

// COMPONENTS
import UserLogin from "./Components/UserLogin";
import DetailSearch from './Components/DetailSearch';

// import Episodes from './Components/Episodes';


class App extends Component {
  state = {
    episodes: [],
    paintingDetails: []
  };
  

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
        this.setState({ paintingDetails: data.payload[0].details })
      }
    })
  }

  componentDidMount() {
      this.refresh();
      }
  
  render() {
    return (
      <Container className="App">
        {/* <UserLogin /> */}
        <DetailSearch details={this.state.paintingDetails}/>
      </Container>
    )
  }
};

export default App;
