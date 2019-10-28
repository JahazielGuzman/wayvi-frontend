import React from 'react'

class Musicplayer extends React.Component {

  componentDidUpdate() {
    // If we updared the isPlaying state variable to true
    // that is, we want to start playing audio...
    if (this.props.isPlaying) {
    
    // If we want to start playing audio and we previously paused a song
    //      
    if (this.props.pausedSong != this.props.currentSong) {
      this.refs.player.load();
    }
      this.refs.player.play();
    }
    else {
      this.refs.player.pause();
    }
  }

  // onClickPlay will fire when the audio element is set to play a song.
  // If the button is pressed when audio is paused, playOrPauseCurrentSong()
  // will set the isPlaying state variable to true
  onClickPlay() {
    if (!this.props.isPlaying)
      this.props.playOrPauseCurrentSong();
  }

  // onClickPause will fire when the audio element is set to pause a song.
  // If the button is pressed when audio is playing, playOrPauseCurrentSong()
  // will set the isPlaying state variable to false
  onClickPause() {
    if (this.props.isPlaying)
      this.props.playOrPauseCurrentSong();
  }

  render() {
    return (
      <div id="musicplayer">
        {this.props.currentSong ? <img className="song-art" src={this.props.currentSong.image} /> : ""}
        <div id="songInfo">
          <span className="songTitle">{this.props.currentSong ? this.props.currentSong.name : ""}</span> <br/>
          <span className="songArtist">{this.props.currentSong ? this.props.currentSong.artist_name : ""}</span>
        </div>
        <button id="previous" className="player-btn" onClick={this.props.playPrev}>&larr;</button>
        <button id="next" className="player-btn" onClick={this.props.playNext}>&rarr;</button>
        <audio 
          controls 
          ref="player"
          onEnded={() => this.onClickPause()}
          onPlay={() => this.onClickPlay()}
          onPause={() => this.onClickPause()}
        >
          <source src={this.props.currentSong ? this.props.currentSong.path : ""} type="audio/mp3"/>
        </audio>
      </div>
    )
  }
}

export default Musicplayer;
