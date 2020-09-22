import React from "react";
import Joi from "joi-browser";
import "./login.css";
import Form from "./common/Form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
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
        {" "}
        <h1 className="mb-3 vidly">
          <i className="fa fa-video-camera fa-5" aria-hidden="true"></i> Vidly
        </h1>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login", "btn btn-lg btn-primary btn-block")}
      </form>
    );
  }
}

export default LoginForm;
