import React from "react";
import { Link } from "react-router-dom";

const Banner = (props) => {
  return (
    <div
      className="background-podcast"
      style={{
        backgroundImage: `url(` + props.images + `)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="back">
            <Link to={"/artist/" + props.idArtist}>
              <div>{"<"} Back</div>
            </Link>
          </div>
          <h1>{props.namePodcast}</h1>
          <p>Oleh {props.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
