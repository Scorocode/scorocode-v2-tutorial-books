import React from 'react';
import * as PropTypes from 'prop-types';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Divider, Icon } from 'antd';
import styled from 'styled-components';

import BookList from 'containers/BookList';
import BookDetail from 'containers/BookDetail';

const NavContainer = styled.div`
  height: 60px;
  line-height: 60px;
  padding: 0 15px;
  background-color: #fefefe;
  border-bottom: 1px solid #cecece;
`;

const ContentContainer = styled.div`
  padding: 15px;
`;

const NavName = styled.div`
  font-size: 18px;
  font-weight: bold;
  float: left;
`;

const NavUser = styled.div`
  float: right;
`;

export default class Personal extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return <Redirect to="/" />
    } else {
      return (
        <React.Fragment>
          <NavContainer>
            <NavName>
              Мои книги
            </NavName>

            <NavUser>
              {user.email}

              <Divider type="vertical" />

              <Link to="/logout">
                <Icon type="logout" /> Выйти
              </Link>
            </NavUser>
          </NavContainer>

          <ContentContainer>
            <Switch>
              <Route exact path="/p" render={(props) => <BookList {...props} user={user} />} />
              <Route path="/p/book/:id" render={(props) => <BookDetail {...props} user={user} />} />
              <Route path="/p/book" render={(props) => <BookDetail {...props} user={user} />} />
            </Switch>

          </ContentContainer>
        </React.Fragment>
      );
    }
  }
}
