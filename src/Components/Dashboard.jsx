// Dependencies
import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link } from "react-router-dom"

import axios from 'axios'
import { getToken } from '../Services/tokenService'


// MaterialUI Imports
import AppBar from 'material-ui/AppBar'
import Tabs from 'material-ui/Tabs'
import Tab from 'material-ui/Tabs/Tab'

// Components
import DetailSearch from './DetailSearch'
import MyLists from './MyLists'
import Logout from './Logout'

class Dashboard extends Component {

    constructor() {
        super()
        this.addToList = this.addToList.bind(this)
    }

    state = {
        userLists: {
            // Trees: {
            //   listId: 1,
            //   listEpisodes: ['5aa983c0da22f444aca48359', '5aa983c0da22f444aca48359']
            // },
            // Mountains: {
            //   listId: 2,
            //   listEpisodes: ['5aa9867dda22f444aca48366', '5aa983c0da22f444aca48359']
            // }
          }
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
        const token = getToken()
// 2. Send a GET request to /todo and pass the token to grab a list of ONLY this user's todos
    axios.get('/mylists', {
        Authorization: `Bearer ${token}`
    })
    .then(res => {
        if (res.status === 200) {
            const userLists = res.data.payload;
            // 3. If we get a successful response, store the todos in   state.
            this.setState({ userLists });
        }
    })
}
    

    render() {

        const styles = {
            appBar: {
                flexWrap: 'wrap'
            },
            tabs: {
                width: '100%'
            }
        }

        const { details, episodes, searchResults, removeFromList } = this.props;

        return (
            <div>
                <Router>
                <div>
                    <AppBar showMenuIconButton={false} style={styles.appBar}>
                        <Tabs style={styles.tabs}>
                            <Tab label="View Lists" containerElement={<Link to="/mylists" />}/>
                            <Tab label="Create a New List" containerElement={<Link to="/newlist" />}/>
                            <Tab label="Logout" containerElement={<Link to="/logout" />}/>
                        </Tabs>
                    </AppBar>

                    <Route exact path="/mylists"
                        render={() => <MyLists 
                                userLists={this.state.userLists}
                                episodes={episodes}
                                removeFromList={removeFromList}
                            />}
                        />

                    <Route exact path="/newlist"
                            render={() => <DetailSearch
                                details={details}
                                episodes={episodes}
                                returnedEpisodes={this.props.returnedEpisodes}
                                searchResults={searchResults}
                                userLists={this.state.userLists}
                                addToList={this.addToList}
                            />}
                        />
                    
                    <Route exact path="/logout"
                        render={() => <Logout setUser={this.props.setUser} />}
                        />

                    <Route exact path="/"
                        render={() => <h1>no path</h1>}
                        />
                </div>
                </Router>
            </div>
        )
    }
}

export default Dashboard