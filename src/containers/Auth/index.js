import React from 'react';
import { Switch, Route } from 'react-router-dom';
import sc from 'sc';
// components
import Authorize from './Authorize';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Personal from './Personal';

export default class Auth extends React.Component {
  state = {
    isInitiating: true,
    user: null,
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  componentDidMount() {
    const auth = sc.app().auth();

    this.subscription = auth.onSessionChanged((session) => {
      if (session) {
        this.setState({
          user: session.user,
          isInitiating: false,
        })
      } else {
        this.setState({
          user: null,
          isInitiating: false,
        });
      }
    });

    auth.authorize().catch(() => {})
  }

  render() {
    const { user, isInitiating } = this.state;

    return (
      <Switch>
        <Route
          exact path="/"
          render={() => <Authorize user={user} isInitiating={isInitiating} />}
        />
        <Route path="/logout" render={() => <Logout user={user} />} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/p" render={() => <Personal user={user} />} />
        <Route render={() => <h2 style={{ padding: 15 }}>Страница не найдена</h2>} />
      </Switch>
    );
  }
}
