import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12 text-center pt-5">
          <small className="pt-5">
            Created by Wahidung
            <br />
            <a
              className="text-primary"
              href="https://github.com/wahidung/react-js-noice-web"
            >
              Github
            </a>
          </small>
        </div>
      </div>
    );
  }
}
