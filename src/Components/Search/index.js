import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {GetUserInfo, GetUserFollowers, GetUserFriends} from '../../Services'
import Profile from '../Profile'
import Compare from '../Compare'
import './style.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.users = this.props.match.params
    this.state = {
      users: {},
      friends:{},
      followers:{}
    }
  }

  componentWillMount() {
    Object.keys(this.users).forEach((user) => {
      const currentUser = this.users[user]
      Promise.all([GetUserInfo(currentUser),GetUserFollowers(currentUser), GetUserFriends(currentUser)])
      .then((data) => {
        let newState = {
          users: {
            ...this.state.users,
            [currentUser]: data[0]
          },
          friends: {
            ...this.state.friends,
            [currentUser]: data[1]
          },
          followers: {
            ...this.state.followers,
            [currentUser]: data[2]
          }
        }
        this.setState(newState)
      })
    })
  }
  render() {
    const hasUsers = Object.keys(this.state.users).length > 1
    const hasFollowers = Object.keys(this.state.followers).length > 1
    const hasFriends = Object.keys(this.state.friends).length > 1
    return (
      <div className="Search">
        <div className="users">
          { hasUsers ?
            Object.keys(this.state.users).map((elem, i) => (
              <Profile key={i} userData={this.state.users[elem]} />
          )):<h2>getting data...</h2>}
        </div>
        <div className="compare">
          {
            hasFollowers ?
              <Compare title="Followers" data={this.state.followers} />
            : <h2>getting data...</h2>
          }
          {
            hasFriends ?
              <Compare title="Friends" data={this.state.friends} />
            : <h2>getting data...</h2>
          }
        </div>
      </div>
    )
  }
}

export default Search
