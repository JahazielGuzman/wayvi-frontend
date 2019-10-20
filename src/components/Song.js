import React from 'react'

class Song extends React.Component {

  state = {

  }

  render() {

    return (
      <div className="song-container">
        <div className="song" style={{background: `url(${this.props.songInfo.image})`}}>
          <button className={this.props.isCurrent ? "paused" : "play"} onClick={
              (e) => {
                if (this.props.isCurrent) {
                  this.props.pauseSong();
                }
                else
                  this.props.playSong(this.props.songInfo, this.props.songIndex);

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
