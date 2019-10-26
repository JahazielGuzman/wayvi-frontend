import React, { Component } from 'react';
import Playlist from './Playlist'

class UserInfo extends Component {

  state = {
    newPlaylistName: "",
  }

  handleChange = (event) => {
    this.setState({ newPlaylistName: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addPlaylist(this.state.newPlaylistName)
  }

  render() {

    const playlists = this.props.playlists.map(playlist => {
      return <Playlist key={playlist.id} playlist={playlist} showPlaylist={this.props.showPlaylist} />
    })

    return (
      <div className="content has-text-grey-light">
        <div className="columns is-gapless">
        <div class="user-panel">
            <div class="user-name">
              <img src="https://bulma.io/images/placeholders/32x32.png" alt="user" />
              <span id="user">{this.props.user.name}</span>
            </div>
            {this.props.user ? 
            <div>
              <a className="log-out" onClick={this.props.logout}>log out</a>
            </div>:
            ""
            }
          </div>
        </div>
        <div id="playlist">
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} placeholder="Playlist Name" />
          <input type="submit" className="submit" value="Create Playlist" />
        </form>
        <br/>
        <b>Playlists</b>
        {playlists}
        </div>
      </div>
    );
  }
}

export default UserInfo;
