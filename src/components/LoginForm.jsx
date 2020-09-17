import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/Input";
import "./login.css";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("Submitted", this.state);
  };

  validateProperty = ({ value, name }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        {" "}
        <h1 className="mb-3 vidly">
          <i className="fa fa-video-camera fa-5" aria-hidden="true"></i> Vidly
        </h1>
        <Input
          id={"username"}
          name={"username"}
          label={"Username"}
          value={account.username}
          onChange={this.handleChange}
          autoFocus
          errors={errors.username}
        />
        <Input
          id={"password"}
          name={"password"}
          label={"Password"}
          value={account.password}
          type="password"
          onChange={this.handleChange}
          errors={errors.password}
        />
        <button
          className="btn btn-lg btn-dark btn-block"
          disabled={this.validate()}
        >
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
