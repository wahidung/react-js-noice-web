import React from "react";

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
    return h + ":" + m + ":" + s;
  } else {
    return m + ":" + s;
  }
}

const PodcastPlaylist = (props) => {
  return (
    <div className="row mb-3">
      <div className="col-10">
        <p className="title">{props.title}</p>
        <p className="album">{props.album}</p>
      </div>
      <div className="col-2 text-right align-self-center">
        <p className="m-0 time">{formatDuration(props.duration)}</p>
      </div>
    </div>
  );
};

export default PodcastPlaylist;
