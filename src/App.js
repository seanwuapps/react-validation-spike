import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Validator } from './validator'

class App extends Component {
  state = {
    data : {
      email : ''
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
    this.validator.isEmail('email')
    this.validator.require('email')
    return this.validator.isValid()
  }

  submit = () =>{
    if( this.validate() ) {
      this.setState({message: 'Validated!'})
    }else {
      this.setState({message: ''})
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
            <label htmlFor="email">email</label>
            <input id="email" name="email" />
            { this.state.errors.email && this.validator.getError('email')}
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
