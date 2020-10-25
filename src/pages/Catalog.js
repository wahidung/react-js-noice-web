import React from "react";
import PodcastPlaylist from "../components/PodcastPlaylist";
import axios from "axios";
import Footer from "./../layouts/Footer";
import { Link } from "react-router-dom";

function formatDuration(duration) {
  const h = Math.floor(duration / (60 * 60))
      .toString()
      .padStart(2, "0"),
    m = Math.floor((duration % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");

  if (h !== "00") {
    return h + "h " + m + "m " + s + "d";
  } else {
    return m + "m " + s + "d";
  }
}

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.dataProps.match.params.id;
    this.state = {
      loading: true,
      data: [],
      duration: "",
      podcast: [],
      played: false,
      audioPlay: [],
      playIndex: 0,
    };
  }

  async componentDidMount() {
    const token = "";

    axios
      .get("https://api.noice.id/catalog/" + this.id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const data = res.data.data.detail;
        let totalDuration = 0;
        let playList = [];

        data.audio.map(function (podcast) {
          playList.push({
            name: podcast.title,
            singer: podcast.artist[0].name,
            cover: data.image,
            musicSrc: podcast.file[0].raw_key,
          });
          totalDuration += podcast.file[0].duration;
        });

        this.setState({
          loading: false,
          data: data,
          podcast: data.audio,
          duration: formatDuration(totalDuration),
          audioPlay: playList,
        });
      });
  }

  handlePlay = (props) => {
    this.props.onPlayed({
      played: true,
      playIndex: props,
      audioPlay: this.state.audioPlay,
    });
  };

  render() {
    return (
      <div className="container-podcast text-white mb-5 pb-4">
        {this.state.loading ? (
          <div id="loading">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="container" id="page-playlist">
          <div className="row" id="top">
            <div className="col-md-12">
              <div className="back">
                <Link to="/">
                  <div>{"<"} Back</div>
                </Link>
              </div>
            </div>
            <div className="col-12 text-center">
              <img
                className="mt-2"
                src={this.state.data.image}
                alt={this.state.data.title}
              />
            </div>
            <div className="col-12 text-center mt-4 mb-3">
              <h3>{this.state.data.title}</h3>
              <p className="m-0">
                <b>{this.state.data.saved_counter}</b> penyimpanan | Oleh Noice
              </p>
              <p className="m-0">
                Durasi <b>{this.state.duration}</b>
              </p>
              <p className="m-0">{this.state.data.descriptions}</p>
            </div>
            <div className="col-6 pr-2">
              <button
                className="btn btn-block btn-noice-outline"
                onClick={() => alert("Coming Soon .. :)")}
              >
                SIMPAN
              </button>
            </div>
            <div className="col-6 pl-2">
              <button
                className="btn btn-block btn-noice-outline"
                onClick={() => alert("Coming Soon .. :)")}
              >
                PUTAR ACAK
              </button>
            </div>
          </div>
          <div className="mt-4" id="content">
            {this.state.podcast.map((podcast, i) => (
              <div
                data={podcast}
                key={podcast.id}
                className="clickable"
                onClick={() => this.handlePlay(i)}
              >
                <PodcastPlaylist
                  title={podcast.title}
                  album={podcast.artist[0].name}
                  duration={podcast.file[0].duration}
                  file={podcast.file[0].raw_key}
                />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
