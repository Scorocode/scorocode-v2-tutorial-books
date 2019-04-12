import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import Auth from 'containers/Auth';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  min-height: 400px;
  min-width: 900px;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <GlobalStyle />

        <Router>
          <Auth />
        </Router>
      </Wrapper>
    );
  }
}

export default App;
