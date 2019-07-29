import React, { Component } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import api from "../../services/api";
import cookies from "js-cookie";
import { Container, Card } from "./styles";

const spotifyApi = new SpotifyWebApi();

export default class Main extends Component {
  state = {
    loading: false,
    access_token: false,
    nowPlaying: { name: "", albumArt: "" }
  };

  componentDidMount = async () => {
    var access_token = await cookies.get("cookieAccessToken");
    //var refresh_token = await cookies.get("cookieRefreshToken");
    //this.setState({ loggedIn: access_token ? true : false });

    if (access_token) {
      spotifyApi.setAccessToken(access_token);
      this.getNowPlaying();
    }
  };

  getLyrics = async () => {
    try {
      if (this.state.nowPlaying.name) {
        try {
          var { data: music } = await api.get(
            "/search?q=" +
              this.state.nowPlaying.name +
              " " +
              this.state.nowPlaying.artist
          );
        } catch (e) {}
      }

      if (!music.response.hits[0]) {
        this.setState({ loading: false });
        document.getElementById("content").innerText = "Lyrics not found :(";
      }

      var URL =
        "https://cors-anywhere.herokuapp.com/https://genius.com" +
        music.response.hits[0].result.api_path;

      const response = await axios.get(URL);
      var el = document.createElement("html");

      this.setState({ loading: false });
      if (response.data) {
        el.innerHTML = response.data;
        const content = document.getElementById("content");
        const lyrics = el.querySelector(".lyrics");
        content.innerText = lyrics.innerText.substring(1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async getNowPlaying() {
    this.setState({ loading: true });
    try {
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
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <>
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
                <button onClick={() => this.getNowPlaying()}>REFRESH</button>
              </div>
            )}
          </div>
        </Card>
        <Container>
          <div id="lyrics">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-spin" />
            ) : (
              <div>
                <h2>{this.state.nowPlaying.name}</h2>
                <div id="content" />
              </div>
            )}
          </div>
        </Container>
      </>
    );
  }
}
