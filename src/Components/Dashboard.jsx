// Dependencies
import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link } from "react-router-dom"

// MaterialUI Imports
import AppBar from 'material-ui/AppBar'
import Tabs from 'material-ui/Tabs'
import Tab from 'material-ui/Tabs/Tab'

// Components
import DetailSearch from './DetailSearch'
import MyLists from './MyLists'

class Dashboard extends Component {
    render() {

        const styles = {
            appBar: {
                flexWrap: 'wrap'
            },
            tabs: {
                width: '100%'
            }
        }

        const { details, episodes, searchResults, userLists } = this.props;

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
                                userLists={userLists}
                            />}
                        />

                    <Route exact path="/newlist"
                            render={() => <DetailSearch
                                details={details}
                                episodes={episodes}
                                returnedEpisodes={this.props.returnedEpisodes}
                                searchResults={searchResults}
                                userLists={userLists}
                                addToList={this.props.addToList}
                            />}
                        />
                    
                    <Route exact path="/logout"
                        render={() => <h1>logged out</h1>}
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