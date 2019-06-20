import React, { Component } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import api from "./services/api";
import cookies from "js-cookie";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  state = {
    loggedIn: "",
    nowPlaying: { name: "", albumArt: "" },
    lyrics: ""
  };

  componentDidMount = () => {
    var access_token = cookies.get("cookieAccessToken");
    var refresh_token = cookies.get("cookieRefreshToken");

    this.setState({ loggedIn: access_token ? true : false });

    spotifyApi.setAccessToken(access_token);
  };

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

      var URL =
        "https://cors-anywhere.herokuapp.com/https://genius.com" +
        music.response.hits[0].result.api_path;

      await axios.get(URL).then(response => {
        var el = document.createElement("html");
        el.innerHTML = response.data;
        document.getElementById("lyrics").innerText = el.querySelector(
          ".lyrics"
        ).textContent;
      });
    } catch (e) {}
  };

  async getNowPlaying() {
    await spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          artist: response.item.artists[0].name,
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
    await this.getLyrics();
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && (
          <div className="unlogged">
            <a href="http://localhost:8888/login"> Login to Spotify </a>
          </div>
        )}

        {this.state.loggedIn && (
          <div className="logged">
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
            <img src={this.state.nowPlaying.albumArt} width="150px" />
            <div>{this.state.nowPlaying.artist}</div>
            <div>{this.state.nowPlaying.name}</div>
          </div>
        )}

        <div id="lyrics" />
      </div>
    );
  }
}

export default App;
