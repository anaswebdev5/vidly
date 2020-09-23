import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import Customers from "./components/Customers";
import LoginForm from "./components/LoginForm";
import MovieForm from "./components/MovieForm";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Rentals from "./components/Rentals";
import Logout from "./components/Logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/ProtectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <NavBar user={user} />
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
              user={user}
            />
            <Route path="/movies" render={(props) => <Movies {...props} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/notFound" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
