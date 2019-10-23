import React from 'react'
import Song from './Song'

class SongCollection extends React.Component {

  setToPlay(song, playlist) {
    let isCurrentSong = (this.props.currentSong == song);
    // let isCurrentPlaylist = (this.props.currentPlaylist == playlist);
    return isCurrentSong;
  }

  render() {

    const allSongs = this.props.allSongs.map((song, index) => {
      return (
        <Song 
          key={song.id} 
          songIndex={index} 
          songInfo={song} 
          playNewSong={this.props.playNewSong}
          playOrPauseCurrentSong={this.props.playOrPauseCurrentSong}
          isCurrent={this.setToPlay(song, this.props.allSongs)}
          isPlaying={this.props.isPlaying}
        />
      )
    })

    const playlistSongs = this.props.songList.map((song, index) => {
      return (
        <Song
          key={song.song_id}
          songIndex={index}
          songInfo={song}
          playNewSong={this.props.playNewSong}
          playOrPauseCurrentSong={this.props.playOrPauseCurrentSong}
          removeSongFromPlaylist={this.props.removeSongFromPlaylist}
          isCurrent={this.setToPlay(song, this.props.playlistSongs)}
          isPlaying={this.props.isPlaying}
        />
      )
    })

    const recommendedSongs = this.props.recommendedSongs.map((song,index) => {
      return (
        <Song
          key={song.id}
          songIndex={index}
          songInfo={song}
          playNewSong={this.props.playNewSong}
          playOrPauseCurrentSong={this.props.playOrPauseCurrentSong}
          showPlaylist={this.props.showPlaylist}
          addSongToPlaylist={this.props.addSongToPlaylist}
          isCurrent={this.setToPlay(song, this.props.recommendedSongs)}
          isPlaying={this.props.isPlaying}
        />
      )
    })

    return (
      <div id="SongCollection">
        { (this.props.showPlaylist) ?
          (
            <div className="special-songs">
              <p>Playlist Songs</p>
              { playlistSongs }
            </div>
          ) : allSongs
        }
        { this.props.showPlaylist ?
          (
            <div className="special-songs">
              <p>Recommended Songs </p>
              { recommendedSongs }
            </div>
          ) : null
        }
      </div>
    )
  }


}

export default SongCollection;
