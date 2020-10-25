import React from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import List from "../components/List";
import Footer from "./../layouts/Footer";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      banners: [],
      highlights: [],
      lists: [],
    };
  }

  async componentDidMount() {
    const token = "";

    //Banner
    axios
      .get(
        "https://api.noice.id/banner?location=podcast&type=featured&page=1&limit=9999 ",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        const data = res.data.data.list;
        this.setState({
          banners: data,
        });
      });

    //Hightlights
    axios
      .get(
        "https://api.noice.id/banner?location=podcast&type=highlight&page=1&limit=9999",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        const data = res.data.data.list;
        this.setState({
          highlights: data,
        });
      });

    //LIST
    axios
      .get(
        "https://api.noice.id/list?location=podcast&type=&page=1&limit=9999",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        const data = res.data.data.list;
        this.setState({
          loading: false,
          lists: data,
        });
      });
  }

  render() {
    const settingsBanner = {
      dots: true,
      arrows: false,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const settingsHighlights = {
      dots: false,
      arrows: false,
      autoplay: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      // slidesToShow: 1,
      // variableWidth: true,
    };

    return (
      <div className="container-podcast-abu text-white mb-5 pb-4">
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
        <div id="slider-home">
          <Slider {...settingsBanner}>
            {this.state.banners.map((banner) => (
              <div key={banner.id}>
                <Link to={"/artist/" + banner.data.detail.id}>
                  <img src={banner.media} alt={banner.title} />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12 mt-3">
              <h3 className="category mt-5">HIGHLIGHTS</h3>
            </div>
          </div>
          <div id="slider-highlights" className="mt-4 mb-5">
            <Slider {...settingsHighlights}>
              {this.state.highlights.map((highlight) => (
                <Link
                  key={highlight.data.detail.id}
                  to={
                    "/" +
                    highlight.data.entity_type +
                    "/" +
                    highlight.data.detail.id
                  }
                >
                  <div className="highlight">
                    <img src={highlight.media} alt={highlight.title} />
                  </div>
                </Link>
              ))}
            </Slider>
          </div>

          {this.state.lists.map((list, i) => {
            if (list.type !== "audio") {
              return (
                <div key={i}>
                  <div className="row text-center">
                    <div className="col-md-12">
                      <h3 className="category mb-4">
                        {list.title.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                  <div id="slider-list" className="mt-4">
                    {list.data.map((listdata) => {
                      return (
                        <List
                          key={listdata.id}
                          id={listdata.id}
                          type={list.type}
                          image={
                            listdata.image !== null
                              ? listdata.image
                              : listdata.catalog.image
                          }
                          name={
                            list.type === "artist"
                              ? listdata.name
                              : listdata.title
                          }
                          descriptions={
                            list.type === "audio"
                              ? ""
                              : listdata.descriptions.substring(0, 30) + "..."
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <Footer />
      </div>
    );
  }
}
