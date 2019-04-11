import React, { Component } from 'react';
import { Alert } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 15px;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <GlobalStyle />

        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </div>
        </Router>
      </Wrapper>
    );
  }
}

function Home() {
  return <Alert message="Home page" />
}

function About() {
  return <Alert type="warning" message="About page" />
}

export default App;
