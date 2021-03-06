import React, { Component } from 'react';
import './App.css';
import Musicplayer from './components/Musicplayer'
import SongCollection from './components/SongCollection'
import Sidebar from './components/Sidebar';
const URL = process.env.REACT_APP_BACKEND

class App extends Component {

  state = {
    allSongs: [],
    user: null,
    pausedSong: null,
    currentSong: null,
    currentSongIndex: -1,
    playlists: [],
    isPlaying: 0,
    songList: [],
    currentPlaylist: 0,
    showPlaylist: false,
    recommendedSongs: [],
  }

  componentDidMount() {

    if (localStorage.getItem('auth_token')) {
      fetch(`${URL}/establish_session`, {
        headers: {
          "Accept": "application/json",
          "Authorization": localStorage.getItem('auth_token')
        }
      })
      .then(res => res.json())
      .then(result => {
          this.setState({user: result.user});
       });
    }

    fetch(`${URL}/songs`)
    .then(res => res.json())
    .then(songData => {
      this.setState({ allSongs: songData, recommendedSongs: songData , songList: songData})
    })

    fetch(`${URL}/users`)
      .then(res => res.json())
      .then(usersData => {
        this.setState({ allUsers: usersData })
      })

    fetch(`${URL}/playlists`)
      .then(res => res.json())
      .then(playlistData => {
        this.setState({ playlists: playlistData })
      })
  }

  login = (username, password) => {
    fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(res => res.json())
    .then(result => {
      if (result.token == "")
        alert("you're username or password are incorrect");
      else {
        const token = result.token;
        localStorage.setItem('auth_token', token);
        this.setState({user: result.user})
      }
    })
  }

  logout = () => {
    localStorage.removeItem('auth_token');
    this.setState({user: null, showPlaylist: 0});
  }

  register = (username, name, password) => {
    fetch(`${URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({username: username, name: name, password: password})
    })
    .then(res => res.json())
    .then(result => {
      const token = result.token;
      localStorage.setItem('auth_token', token);
      this.setState({user: result.user})
    });
  }


  // fire this callback when we click play button on the song component. It will receive 
  // a song object and the index of that song in the current playlist. We will set the pausedSong
  // to null because we don't need the previously paused song anymore. PausedSong is used to 
  // reload the music player when we change a song. Since we are pressing the play button, we will
  // set the isPlaying value to true to initiate the play procedure on the MusicPlayer component.
  playNewSong = (song, songIndex) => {
    this.setState({pausedSong: null, currentSong: song , currentSongIndex: songIndex, isPlaying: 1})
  }

  // This callback fires when we press play or pause on the musicplayer or press pause on the
  // song component. This method sets the pauseSong so that we can resume from either play button
  // on song component or the musicplayer. We flip the isPlaying variable to the opposite boolean value
  playOrPauseCurrentSong = () => {

      this.setState({ pausedSong: !this.state.isPlaying ? this.state.pausedSong : this.state.currentSong, isPlaying: !this.state.isPlaying })
  }

  playPrev = () => {
    const songIndex = this.state.currentSongIndex;
    if (songIndex > 0)
      this.setState({currentSong: this.state.songList[songIndex - 1], currentSongIndex: songIndex - 1, pausedSong: null})
  }

  playNext = () => {
    const songIndex = this.state.currentSongIndex;
    if (songIndex !== this.state.songList.length - 1)
      this.setState({currentSong: this.state.songList[songIndex + 1], currentSongIndex: songIndex + 1, pausedSong: null})
  }

  showPlaylist = (playlist) => {
    fetch(`${URL}/playlists/${playlist.id}`)
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

    fetch(`${URL}/playlists`, {
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

    fetch(`${URL}/song_lists`, {
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
              logout={this.logout}
              register={this.register}
              playlists={userPlaylists}
              showPlaylist={this.showPlaylist}
              addPlaylist={this.addPlaylist} />
          </div>
          <div>
            <SongCollection
              allSongs={this.state.allSongs}
              recommendedSongs={this.state.recommendedSongs}
              currentSong={this.state.currentSong}
              currentSongIndex={this.state.currentSongIndex}
              currentPlaylist={this.state.currentPlaylist}
              playNewSong={this.playNewSong}
              songList={this.state.songList}
              showPlaylist={this.state.showPlaylist}
              addSongToPlaylist={this.addSongToPlaylist}
              removeSongFromPlaylist={this.removeSongFromPlaylist}
              playOrPauseCurrentSong={this.playOrPauseCurrentSong}
              isPlaying={this.state.isPlaying}
            />
            <Musicplayer 
              playPrev={this.playPrev}
              playNext={this.playNext}
              currentSong={this.state.currentSong}
              pausedSong={this.state.pausedSong}
              isPlaying={this.state.isPlaying}
              playOrPauseCurrentSong={this.playOrPauseCurrentSong}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
