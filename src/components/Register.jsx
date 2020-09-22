import Joi from "joi-browser";
import React from "react";
import Form from "./common/Form";
import * as userService from "../services/userService";
import "./login.css";
import auth from "../services/authService";

export default class Register extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };
  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location.replace("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h1 className="mb-3 vidly">
          <i className="fa fa-video-camera fa-5" aria-hidden="true"></i> Vidly
        </h1>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register", "btn btn-lg btn-primary btn-block")}
      </form>
    );
  }
}
