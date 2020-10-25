import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import Playlist from "./pages/Playlist";
import Catalog from "./pages/Catalog";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      played: false,
      playIndex: 0,
      audioPlay: [],
    };
  }

  handlePlay = (newValue) => {
    this.setState(newValue);
  };
  render() {
    if (this.state.played) {
      document.title =
        this.state.audioPlay[this.state.playIndex].name + " - Noice Web";
    }

    return (
      <div>
        <Router basename="/demo/noice">
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/artist/:id" component={Artist}></Route>
          <Route
            path="/playlist/:id"
            render={(props) => (
              <Playlist
                dataProps={props}
                onPlayed={(value) => this.handlePlay(value)}
              />
            )}
          ></Route>
          <Route
            path="/catalog/:id"
            render={(props) => (
              <Catalog
                dataProps={props}
                onPlayed={(value) => this.handlePlay(value)}
              />
            )}
          ></Route>
          <Route
            path="/album/:id"
            render={(props) => (
              <Album
                dataProps={props}
                onPlayed={(value) => this.handlePlay(value)}
              />
            )}
          ></Route>
        </Router>
        {this.state.played ? (
          <ReactJkMusicPlayer
            audioLists={this.state.audioPlay}
            mode="full"
            autoPlay={true}
            showDownload={false}
            showReload={false}
            // toggleMode={false}
            showThemeSwitch={false}
            remove={false}
            glassBg={true}
            playIndex={this.state.playIndex}
            clearPriorAudioLists={true}
            onPlayIndexChange={(playIndex) => {
              document.title =
                this.state.audioPlay[playIndex].name + " - Noice Web";
            }}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
