import React from "react";

function formatNumber(angka, prefix) {
  var separator = "",
    number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return prefix === undefined ? rupiah : rupiah ? "" + rupiah : "";
}

const BannerArtist = (props) => {
  return (
    <div className="artist">
      <div
        className="background-artist"
        style={{
          backgroundImage: `url(` + props.images + `)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="row">
        <div className="col-md-12 text-center">
          <h1>{props.nameArtist}</h1>
          <p>{formatNumber(String(props.follower), ".")} followerss</p>
          <p className="mt-3">{props.descriptions}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerArtist;
