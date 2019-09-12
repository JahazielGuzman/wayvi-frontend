import React, { Component } from 'react';
import './App.css';
import Musicplayer from './components/Musicplayer'
import SongCollection from './components/SongCollection'
import Sidebar from './components/Sidebar';
const URL = 'http://localhost:3000/songs';

class App extends Component {

  state = {
    allSongs: [],
    user: null,
    currentSong: {},
    currentSongIndex: -1,
    playlists: [],
    songList: [],
    currentPlaylist: 0,
    showPlaylist: false,
    recommendedSongs: [],
  }

  componentDidMount() {
    fetch(URL)
    .then(res => res.json())
    .then(songData => {
      this.setState({ allSongs: songData, recommendedSongs: songData , songList: songData})
    })

    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(usersData => {
        this.setState({ allUsers: usersData })
      })

    fetch("http://localhost:3000/playlists")
      .then(res => res.json())
      .then(playlistData => {
        this.setState({ playlists: playlistData })
      })
  }

  playSong = (song, songIndex) => {
    this.setState({ currentSong: song , currentSongIndex: songIndex})
  }

  login = (username, password) => {
    const foundUser = this.state.allUsers.find(user => {
      return (user.username === username && user.password_digest === password)
    })
    this.setState({ user: foundUser })
  }

  playPrev = () => {
    const songIndex = this.state.currentSongIndex;
    if (songIndex > 0)
      this.setState({currentSong: this.state.songList[songIndex - 1], currentSongIndex: songIndex - 1})
  }

  playNext = () => {
    const songIndex = this.state.currentSongIndex;
    if (songIndex !== this.state.songList.length - 1)
      this.setState({currentSong: this.state.songList[songIndex + 1], currentSongIndex: songIndex + 1})
  }

  showPlaylist = (playlist) => {
    fetch(`http://localhost:3000/playlists/${playlist.id}`)
      .then(res => res.json())
      .then(songListData => {
        const recommendedSongs = this.state.allSongs.filter((song) => {
          if (!songListData.some(songObject => songObject.id === song.id)) {
            return song
          }
         });
        this.setState({ songList: songListData, recommendedSongs: recommendedSongs, currentPlaylist: playlist, showPlaylist: true })
      })
  }

  addPlaylist = (newPlaylistName) => {
    const newPlaylist = {
      name: newPlaylistName,
      user_id: this.state.user.id
    }

    fetch("http://localhost:3000/playlists", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newPlaylist)
    }).then(res => res.json())
      .then(newPlaylist => {
        this.setState({ playlists: [...this.state.playlists, newPlaylist], songList: [] })
      })
  }

  addSongToPlaylist = (song) => {
    const newSongList = {
      playlist_id: this.state.currentPlaylist.id,
      song_id: song.id
    }

    fetch("http://localhost:3000/song_lists", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newSongList)
    }).then(res => res.json())
      .then(newSongData => {
        this.setState({ songList: [...this.state.songList, newSongData.song] })
      })
  }

  removeSongFromPlaylist = () => {
    console.log("removeSongFromPlaylist")
  }

  render() {

    const userPlaylists = this.state.playlists.filter(playlist => {
      if (this.state.user) {
        return playlist.user_id === this.state.user.id
      } else {
        return playlist
      }
    })

    return (
      <React.Fragment>
        <div className="App">
          <div id="sidebar" className="tile is-ancestor">
            <Sidebar
              user={this.state.user}
              login={this.login}
              playlists={userPlaylists}
              showPlaylist={this.showPlaylist}
              addPlaylist={this.addPlaylist} />
          </div>
          <div>
            <h1 id="title"> ~ ~ Wayvi ~ ~ </h1><br/>
            <SongCollection
              allSongs={this.state.allSongs}
              recommendedSongs={this.state.recommendedSongs}
              playSong={this.playSong}
              songList={this.state.songList}
              showPlaylist={this.state.showPlaylist}
              addSongToPlaylist={this.addSongToPlaylist}
              removeSongFromPlaylist={this.removeSongFromPlaylist}
            />
            <Musicplayer playPrev={this.playPrev} playNext={this.playNext} currentSong={this.state.currentSong} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
