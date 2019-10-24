import React, { Component } from 'react';
import Login from './Login';
import Register from './Register'
import UserInfo from './UserInfo';

class Sidebar extends Component {

  render() {
    // console.log(this.props)
    return (
      <div className="tile is-2 is-parent">
        <article id="sidebar" className="tile is-child notification has-background-black">
          <h1 class="logo">Waivi</h1>
          <div className="content has-text-grey-light">
          </div>
            {
              this.props.user ?
              <UserInfo
                user={this.props.user}
                playlists={this.props.playlists}
                showPlaylist={this.props.showPlaylist}
                addPlaylist={this.props.addPlaylist} /> :
                <React.Fragment>
                  <Login login={this.props.login} />
                  <Register register={this.props.register}/>
                </React.Fragment>
            }
        </article>
      </div>
    );
  }
}

export default Sidebar;
