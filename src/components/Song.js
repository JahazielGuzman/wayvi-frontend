import React from 'react'

class Song extends React.Component {

  render() {

    return (
      <div className="song-container">
        <div className="song" style={{background: `url(${this.props.songInfo.image})`}}>
          <button className="play" onClick={
              (e) => {
                this.props.playSong(this.props.songInfo, this.props.songIndex);
                e.target.className = e.target.className == "paused" ? "play" : "paused";
              }
            }></button>
            { this.props.showPlaylist ? <button onClick={() => this.props.addSongToPlaylist(this.props.songInfo)}>Add</button> : null }
        </div>
          <div className="songDetail">
            <p className="songTitle">{this.props.songInfo.name}</p>
            <p className="songArtist">{this.props.songInfo.artist_name}</p>
          </div>
      </div>
    )
  }

}

export default Song;
