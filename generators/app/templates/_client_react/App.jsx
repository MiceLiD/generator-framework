import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentWillMount() {
    f_Request('/getUserInfo', {})
      .then(data => {
        if (!data) return
        this.setState({
          username: data.username
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.username}, hello world!
      </div>
    )
  }
}

export default App