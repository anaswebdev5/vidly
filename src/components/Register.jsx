import Joi from "joi-browser";
import React from "react";
import Form from "./common/Form";
import "./login.css";
export default class Register extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };
  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  };
  doSubmit = () => {
    console.log("Submitted", this.state);
  };
  render() {
    return (
      <form className="form-signin">
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
