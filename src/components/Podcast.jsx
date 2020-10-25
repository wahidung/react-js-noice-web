import React from "react";

function formatDate(nowDate) {
  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return (
    nowDate.getDate() +
    " " +
    month[nowDate.getMonth()] +
    " " +
    nowDate.getFullYear()
  );
}

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

const Podcast = (props) => {
  return (
    <div className="podcast  pt-4">
      <div className="row">
        <div className="col-3">
          <img src={props.images} className="img-podcast" alt={props.title} />
        </div>
        <div className="col-8">
          <h3>{props.title}</h3>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <p style={{ marginBottom: "0px" }}>{props.descriptions}</p>
          <p style={{ marginBottom: "0px" }} className="border-podcast pb-3">
            {formatDate(new Date(props.date * 1000))} -{" "}
            {formatDuration(props.duration)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
