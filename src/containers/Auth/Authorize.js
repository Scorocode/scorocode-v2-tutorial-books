import React from 'react';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { AuthContainer } from './styled';

export default ({ user, isInitiating }) => {
  if (user) {
    return <Redirect to={'/p'} />
  } else if (isInitiating) {
    return (
      <AuthContainer>
        <Spin size="large" />
      </AuthContainer>
    );
  } else {
    return <Redirect to={'/login'} />
  }
}
