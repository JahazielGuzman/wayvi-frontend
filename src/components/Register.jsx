import React, { Component } from 'react';

class Register extends Component {

  state = {
    username: "",
    name: "",
    password: "",
  }

  handleChange = (event) => {

    switch (event.target.id) {
      case "username":
        this.setState({ username: event.target.value });
        break;
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.register(this.state.username, this.state.name, this.state.password)
  }

  render() {
    // console.log(this.props.login)
    return (
      <div className="content has-text-grey-light">
        <p>Or Register:</p>
        <form onSubmit={this.handleSubmit} >
          <input id="username" type="text" placeholder="User Name" onChange={this.handleChange} />
          <input id="name" type="text" placeholder="Name" onChange={this.handleChange} />
          <input id="password" type="password" placeholder="Password" onChange={this.handleChange} /><br/>
          <input className="submit" type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Register;
