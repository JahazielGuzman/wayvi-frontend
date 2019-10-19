import React, { Component } from 'react';

class Login extends Component {

  state = {
    username: "",
    password: "",
  }

  handleChange = (event) => {
    (event.target.id === "username") ?
      this.setState({ username: event.target.value }) :
      this.setState({ password: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password)
  }

  render() {
    // console.log(this.props.login)
    return (
      <div className="content has-text-grey-light">
        <p>Please Login:</p>
        <form onSubmit={this.handleSubmit} >
          <input id="username" type="text" placeholder="User Name" onChange={this.handleChange} />
          <input id="password" type="password" placeholder="Password" onChange={this.handleChange} /><br/>
          <input className="submit" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
