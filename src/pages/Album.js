import React from "react";
import axios from "axios";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import Banner from "./../components/Banner";
import Podcast from "./../components/Podcast";
import Footer from "./../layouts/Footer";

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      loading: true,
      bannerImages: "",
      bannerNamePodcast: "",
      bannerArtist: "",
      podcasts: [],
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
        const data = res.data.data;
        let playList = [];

        this.setState({
          bannerArtist: data.detail.artist[0].name,
          bannerImages: data.detail.artist[0].image,
          bannerNamePodcast: data.detail.title,
          podcasts: data.detail.audio,
          loading: false,
        });

        this.state.podcasts.map((podcast) =>
          playList.push({
            name: podcast.title,
            singer: podcast.artist[0].name,
            cover: podcast.image,
            musicSrc: podcast.file[0].raw_key,
          })
        );

        this.setState({
          audioPlay: playList,
        });
      });
  }

  handlePlay = (props) => {
    this.setState({
      played: true,
      playIndex: props,
    });
  };

  render() {
    return (
      <div className="container-podcast text-white mb-5 pb-4">
        {this.state.loading ? (
          <div id="loading">
            <div class="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          ""
        )}
        <Banner
          artist={this.state.bannerArtist}
          images={this.state.bannerImages}
          namePodcast={this.state.bannerNamePodcast}
        />

        <div className="list-podcast pt-3">
          {this.state.podcasts.map((podcast, i) => (
            <div
              data={podcast}
              key={podcast.id}
              className="clickable"
              onClick={() => this.handlePlay(i)}
            >
              <Podcast
                images={podcast.image}
                title={podcast.title}
                descriptions={podcast.descriptions}
                date={podcast.created_at}
                file={podcast.file[0].raw_key}
                duration={podcast.file[0].duration}
              />
            </div>
          ))}
        </div>
        <Footer />
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
            // clearPriorAudioLists={true}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
