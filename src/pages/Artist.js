import React from "react";
import axios from "axios";
import BannerArtist from "./../components/BannerArtist";
import Album from "./../components/Album";
import Footer from "./../layouts/Footer";
import { Link } from "react-router-dom";

export default class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bannerImages: "",
      bannerNameArtist: "",
      bannerDescriptions: "",
      bannerFollower: 0,
      albumNewRelase: [],
      albumByName: [],
    };
  }

  async componentDidMount() {
    const token = "";

    //Detail Artist
    axios
      .get("https://api.noice.id/artist/GELe3wne69", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const data = res.data.data;
        this.setState({
          bannerImages: data.detail.image,
          bannerNameArtist: data.detail.name,
          bannerDescriptions: data.detail.descriptions,
          bannerFollower: "128K",
        });
      });

    //Follower
    axios
      .get("https://api.noice.id/artist/GELe3wne69/follower?page=1&limit=1", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const data = res.data.data;
        this.setState({
          bannerFollower: data.pagination.total_rows,
        });
      });

    //List Album Baru Release
    axios
      .get(
        "https://api.noice.id/search?q=&artist_id=GELe3wne69&sort=release_date%3Adesc&page=1&type=catalog%2Ccatalog_podcast&limit=3",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        this.setState({
          albumNewRelase: data.list.catalogPodcast,
        });
      });

    //List Album Berdasarkan Nama
    axios
      .get(
        "https://api.noice.id/search?q=&artist_id=GELe3wne69&sort=title%3Aasc&page=1&type=catalog%2Ccatalog_podcast&limit=3",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        this.setState({
          loading: false,
          albumByName: data.list.catalogPodcast,
        });
      });
  }

  render() {
    return (
      <div className="container-podcast text-white" id="page-artist">
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
        <BannerArtist
          follower={this.state.bannerFollower}
          images={this.state.bannerImages}
          nameArtist={this.state.bannerNameArtist}
          descriptions={this.state.bannerDescriptions}
        />
        <div className="row text-center">
          <div className="col-md-12">
            <h3 className="category mt-5">BARU RELEASE</h3>
          </div>
        </div>
        <div className="list-album">
          {this.state.albumNewRelase.map((album) => (
            <Link to={"/album/" + album.id}>
              <Album
                images={album.image}
                title={album.title}
                descriptions={album.descriptions}
              />
            </Link>
          ))}
        </div>

        <div className="row text-center">
          <div className="col-md-12">
            <h3 className="category mt-5">ALBUM</h3>
          </div>
        </div>
        <div className="list-album">
          {this.state.albumByName.map((album) => (
            <Link to={"/album/" + album.id}>
              <Album
                images={album.image}
                title={album.title}
                descriptions={album.descriptions}
              />
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
