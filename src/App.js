import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import NavFooter from './views/Navbar_Footer'
import Header from './components/Header'
import Home from './views/Home'
import ErrorPage from './views/ErrorPage'
import AddPost from './views/Add_Post'
import Forum from './views/Forum';
import Post from './views/Post'
import UserInfo from './views/ChangeUserInfo'
import Section from './views/Section'
import Tutorials from './views/Tutorials';
import Profile from './components/Profile'
import ContactUs from './views/ContactUs';
import ScrollToTop from './components/ScrollToTop';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //"https://developer-source-forum.herokuapp.com"
      url: "https://developer-source-forum.herokuapp.com",
    }

  }
  render() {
    return (
      <Router>
        <ScrollToTop/>
        <Switch>
          <Route exact strict path="/" >
            <NavFooter api={this.state.url}>
              <Header />
              <Home api={this.state.url} />
            </NavFooter>
          </Route>

          <Route exact path="/Login" strict >
            <Login api={this.state.url} />
          </Route>

          <Route exact path="/SignUp" strict >
            <Register api={this.state.url} />
          </Route>

          <Route
            path="/Forum/:Name" strict exact
            render={(props) =>
              <NavFooter api={this.state.url}>
                <Forum api={this.state.url} {...props} />
              </NavFooter>} />
              <Route
            path="/ContactUs" strict exact
            render={(props) =>
              <NavFooter api={this.state.url}>
                <ContactUs api={this.state.url} {...props} />
              </NavFooter>} />

          <Route
            path="/Add/:Name/:Section/:id" strict exact
            render={(props) =>
              <NavFooter api={this.state.url}>
                <AddPost api={this.state.url} {...props} />
              </NavFooter>} />

          <Route
            path="/Posts/:PL/:Section/:id/:Title" strict exact
            render={(props) =>
              <NavFooter api={this.state.url}>
                <Post api={this.state.url} {...props} />
              </NavFooter>} />

          <Route
            path="/Page/:Name/:PLid/:Section" strict exact
            render={(props) =>
              <NavFooter api={this.state.url}>
                <Section api={this.state.url} {...props} />
              </NavFooter>} />
          <Route
            path="/Learn/:Name/:PLid" strict exact
            render={(props) =>
              <NavFooter api={this.state.url}>
                <Tutorials api={this.state.url} {...props} />
              </NavFooter>} />

          <Route path="/User/Settings" strict exact>
            <UserInfo api={this.state.url} />
          </Route>
          <Route
            path="/UserInfo/:UserId/:Name" strict exact
            render={(props) =>
              <NavFooter api={this.state.url}>
              <Profile api={this.state.url} {...props} />
              </NavFooter>
            } />
          <Route path="*" render={(props) => <ErrorPage {...props} />} />

        </Switch>
      </Router >
    )
  }
}

export default App;
