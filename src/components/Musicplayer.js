import React from 'react'

class Musicplayer extends React.Component {

  componentDidUpdate() {
    if (this.props.playOrPause) {
      
      this.refs.player.load();
      this.refs.player.play();
    }
    else {
      this.refs.player.pause();
    }
  }

  render() {
    return (
      <div id="musicplayer">
        <div id="songInfo">
          <span className="songTitle">{this.props.currentSong.name}</span> <br/>
          <span className="songArtist">{this.props.currentSong.artist_name}</span>
        </div>
        <button id="previous" className="player-btn" onClick={this.props.playPrev}>&larr;</button>
        <button id="next" className="player-btn" onClick={this.props.playNext}>&rarr;</button>
        <audio controls ref="player">
          <source src={this.props.currentSong.path} type="audio/mp3"/>
        </audio>
      </div>
    )
  }
}

export default Musicplayer;
