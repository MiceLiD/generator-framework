import React, { Component } from 'react'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentWillMount() {
    f_Request('/getusername', {})
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