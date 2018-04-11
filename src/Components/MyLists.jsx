import React, { Component } from 'react'
import SingleUserList from './SingleUserList'
import List from 'material-ui/List'

class MyLists extends Component {

    render() {

        const { userLists, episodes } = this.props

        return (
            <List>
                {
                    Object.keys(userLists)
                        .map((userList, i) => {
                            return <SingleUserList
                                    key={i}
                                    title={userList}
                                    episodes={episodes}
                                    list={userLists[userList].listEpisodes}
                            />
                        })
                }        
            </List>
        )
    }
}


export default MyLists;