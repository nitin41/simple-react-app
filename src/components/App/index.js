// src/components/App/index.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import logo from './logo.svg';
import './style.css';

class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('App', className)} {...props}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/about">About</Link>
          </p>
          <p>
            <Link to="/image">Image</Link>
          </p>
        </p>
      </div>
    );
  }
}

export default App;
