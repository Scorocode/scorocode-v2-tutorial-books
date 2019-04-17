import React from 'react';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { AuthContainer } from './styled';
import sc from 'sc';

export default class Logout extends React.Component {
  componentDidMount() {
    return sc.app().auth().signOut()
  }

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <AuthContainer>
          <Spin size="large" />
        </AuthContainer>
      );
    } else {
      return <Redirect to={'/login'} />
    }

  }
}
