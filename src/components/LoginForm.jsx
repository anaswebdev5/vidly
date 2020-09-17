import React from "react";
import Joi from "joi-browser";
import "./login.css";
import Form from "./common/Form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  doSubmit = () => {
    console.log("Submitted", this.state);
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
