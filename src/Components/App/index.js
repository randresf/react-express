import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import UserInput from '../UserInput'
import './style.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.setInputValue = this.setInputValue.bind(this)
    this.link = ''
    this.state = {
      users: {}
    }
  }

  validateData(){
    if(this.state.users.user1 && this.state.users.user2){
      this.link = `/results/${this.formatUserParams(this.state.users)}`
    }
  }

  setInputValue(user) {
    this.setState({
      users: {
        ...this.state.users,
        [user.name]: user.value
      }
    })
  }

  formatUserParams(users) {
    return Object.values(users).join('-')
  }

  render() {
    const { className } = this.props
    this.validateData()
    return (
      <div className={classnames('App', className)}>
          <h2>Insert Twitter Usernames</h2>
          <UserInput name='user1' returnValue={this.setInputValue}/>
          <UserInput name='user2' returnValue={this.setInputValue} />
          <Link to={this.link}>Search</Link>
      </div>
    )
  }
}

export default App
