import React, { Component } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import api from "./services/api";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();

    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "", albumArt: "" },
      lyrics: ""
    };
  }

  getLyrics = async () => {
    try {
      if (this.state.nowPlaying.name) {
        var { data: music } = await api.get(
          "/search?q=" +
            this.state.nowPlaying.name +
            " " +
            this.state.nowPlaying.artist
        );
      }

      var URL = "https://genius.com" + music.response.hits[0].result.api_path;

      await axios.get(URL).then(response => {
        var el = document.createElement("html");
        el.innerHTML = response.data;
        document.getElementById("lyrics").innerText = el.querySelector(
          ".lyrics"
        ).textContent;
      });
    } catch (e) {}
  };

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          artist: response.item.artists[0].name,
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && (
          <div className="unlogged">
            <a href="http://localhost:8888/"> Login to Spotify </a>
            <div>{this.state.nowPlaying.name}</div>
            <div>{this.state.nowPlaying.name}</div>
          </div>
        )}

        {this.state.loggedIn && (
          <div className="logged">
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
            <button onClick={() => this.getLyrics()}>Check Lyrics</button>
          </div>
        )}

        <div id="lyrics" />
      </div>
    );
  }
}

export default App;
