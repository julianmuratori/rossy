import React, { Component } from 'react'
import SingleUserList from './SingleUserList'
import List from 'material-ui/List'

class MyLists extends Component {

    render() {

        const { userLists, episodes, removeFromList } = this.props

        return (
            <List>
                {   userLists.length > 0 ? (
                    Object.keys(userLists)
                        .map((userList, i) => {
                            return <SingleUserList
                                    key={i}
                                    title={userList}
                                    episodes={episodes}
                                    list={userLists[userList].listEpisodes}
                                    removeFromList={removeFromList}
                            />
                        })
                ) : (
                    <h1>You don't have any lists yet!</h1>
                )
                }        
            </List>
        )
    }
}


export default MyLists;