import React, { Component, Fragment } from "react";
import { auth } from "../Utils/Fairbase";

class Authentication extends Component {
  state = {
    email: "",
    password: "",
    message: "",
  };

  onChangehandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => console.log(user))
      .catch((error) => this.setState({ message: error.code }));
  };

  onSubmitSignin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => localStorage.setItem("user", JSON.stringify(user)))
      .catch((error) => this.setState({ message: error.code }));
  };

  render() {
    return (
      <Fragment>
        {this.state.message ? (
          <p className="alert alert-danger container mt-3">
            {this.state.message}
          </p>
        ) : (
          ""
        )}

        <form
          onSubmit={this.onSubmitSignup}
          className="mt-3 container jumbotron"
        >
          <h3>Firebase Sign Up Form</h3>
          <div className="form-group">
            <label>Email address</label>
            <input
              name="email"
              onChange={this.onChangehandler}
              type="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              onChange={this.onChangehandler}
              type="password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <form
          onSubmit={this.onSubmitSignin}
          className="mt-3 container jumbotron"
        >
          <h3>Firebase Sign In Form</h3>
          <div className="form-group">
            <label>Email address</label>
            <input
              name="email"
              onChange={this.onChangehandler}
              type="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              onChange={this.onChangehandler}
              type="password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Fragment>
    );
  }
}

export default Authentication;
