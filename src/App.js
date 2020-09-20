import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Customers from "./components/Customers";
import LoginForm from "./components/LoginForm";
import MovieForm from "./components/MovieForm";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Rentals from "./components/Rentals";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <NavBar />
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
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
