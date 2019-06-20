import React, { Component } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import api from "./services/api";
import cookies from "js-cookie";
import { Container, Card } from "./Style";

import GlobalStyle from "./global";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  state = {
    loggedIn: false,
    nowPlaying: { name: "", albumArt: "" },
    lyrics: ""
  };

  componentDidMount = async () => {
    var access_token = await cookies.get("cookieAccessToken");
    var refresh_token = await cookies.get("cookieRefreshToken");

    this.setState({ loggedIn: access_token ? true : false });

    if (this.state.loggedIn) {
      spotifyApi.setAccessToken(access_token);
      this.getNowPlaying();
    }
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
        document.getElementById("content").innerText = el
          .querySelector(".lyrics")
          .innerText.substring(5);
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
        <GlobalStyle />
        {!this.state.loggedIn && (
          <div className="unlogged">
            <a href="http://localhost:8888/login"> Login to Spotify </a>
          </div>
        )}

        {this.state.loggedIn && (
          <div>
            <Card>
              <div className="music">
                <img
                  src={this.state.nowPlaying.albumArt}
                  alt={this.state.nowPlaying.artist}
                  width="150px"
                />
                {this.state.nowPlaying.artist && (
                  <div className="info">
                    <span>{this.state.nowPlaying.artist}</span>
                    <span id="title">{this.state.nowPlaying.name}</span>
                    <button onClick={() => this.getNowPlaying()}>
                      REFRESH
                    </button>
                  </div>
                )}
              </div>
            </Card>
            <Container>
              <div id="lyrics">
                <h2>{this.state.nowPlaying.name}</h2>
                <div id="content" />
              </div>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default App;
