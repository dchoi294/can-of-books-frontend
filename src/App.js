import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import About from './About';
import Content from './Content';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <>
        <Router>
          <Header />
          <h1>new</h1>
          {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}

          {this.props.auth0.isAuthenticated ?
            <Routes>
              <Route
                exact path="/"
                element={<BestBooks />}
              >
              </Route>

              <Route
                exact path="/about"
                element={<About />}
              >
              </Route>

              <Route
                exact path="/profile"
                element={<Profile />}
              >
              </Route>
            </Routes>
            : <Content />}


          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
