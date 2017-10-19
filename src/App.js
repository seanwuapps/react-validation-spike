import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Validator } from './validator'

class App extends Component {
  state = {
    data : {
      name : ''
    },
    errors: {}
  }

  validator = new Validator(this)

  updateForm = (e) => {
    let key = e.target.name
    let value = e.target.value
    let newData = {
      ...this.state.data
    }
    newData[key] = value
    this.setState({
      data : newData
    })
  }
  validate = () => {
    this.validator.require('name')
    return this.validator.isValid()
  }

  submit = () =>{
    if( this.validate() ) {
      this.setState({message: 'Validated!'})
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <form onChange={this.updateForm} method="post">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" />
            { this.state.errors.name && this.validator.getError('name')}
            <button type="button" onClick={this.submit}>Submit</button>
          </form>
          {
            this.state.message
          }
        </p>
      </div>
    );
  }
}

export default App;
