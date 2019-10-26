import React from 'react'

class Musicplayer extends React.Component {

  componentDidUpdate() {

    if (this.props.isPlaying) {
      
      if (this.props.pausedSong != this.props.currentSong) {
        this.refs.player.load();
      }

      this.refs.player.play();
    }
    else {
      this.refs.player.pause();
    }
  }

  onClickPlay() {
    if (!this.props.isPlaying)
      this.props.playOrPauseCurrentSong();
  }

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
