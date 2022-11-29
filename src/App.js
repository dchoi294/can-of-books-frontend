import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import About from './About';
import Content from './Content'
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
          </Routes>
          <h1>new</h1>
          {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}

          {this.props.auth0.isAuthenticated ? <Content /> : <h2>Please Log in</h2>}
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
