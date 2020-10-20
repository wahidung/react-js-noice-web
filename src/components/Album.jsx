import React from "react";

const Album = (props) => {
  return (
    <div className="album pt-4">
      <div className="row">
        <div className="col-3">
          <img src={props.images} className="img-album" alt={props.title} />
        </div>
        <div className="col-8">
          <h3>{props.title}</h3>
          <p style={{ marginBottom: "0px" }}>{props.descriptions}</p>
        </div>
      </div>
    </div>
  );
};

export default Album;
