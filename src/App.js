import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./style.css";
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

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
    console.log(newValue);
    this.setState(newValue);
  };

  render() {
    return (
      <div>
        <Router basename="/demo/noice">
          <Route exact path="/" component={Artist}></Route>
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
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
