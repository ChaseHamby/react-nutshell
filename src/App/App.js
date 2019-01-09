import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import connection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/auth';
import Home from '../components/pages/Home/Home';
import Articles from '../components/pages/Articles/articles';
import Events from '../components/pages/Events/events';
import Friends from '../components/pages/Friends/friends';
import Messages from '../components/pages/Messages/messages';
import Weather from '../components/pages/Weather/weather';
import MyNavbar from '../components/MyNavbar/myNavbar';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import authRequests from '../helpers/data/authRequests';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route { ...rest } render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route { ...rest } render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, pendingUser } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
            <div className="appContainer">
            <div className="row">
              <Switch>
                <PrivateRoute path="/" exact component={Home} authed={this.state.authed} />
                <PrivateRoute path="/home" component={Home} authed={this.state.authed} />
                <PrivateRoute path="/articles" component={Articles} authed={this.state.authed} />
                <PrivateRoute path="/events" component={Events} authed={this.state.authed} />
                <PrivateRoute path="/friends" component={Friends} authed={this.state.authed} />
                <PrivateRoute path="/messages" component={Messages} authed={this.state.authed} />
                <PrivateRoute path="/weather" component={Weather} authed={this.state.authed} />
                <PublicRoute path="/auth" component={Auth} authed={this.state.authed} />
              </Switch>
            </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
