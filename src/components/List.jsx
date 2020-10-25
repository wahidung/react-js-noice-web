import React from "react";
import { Link } from "react-router-dom";

let list;
const List = (props) => {
  list = (
    <div key={props.id} className={props.type}>
      <div className="image">
        <img src={props.image} alt={props.name} />
      </div>
      <div className="content">
        <p className="title">
          {props.name.length > 40
            ? props.name.substring(0, 39) + "..."
            : props.name}
        </p>
        <p className="description">{props.descriptions}</p>
      </div>
    </div>
  );

  if (props.type === "artist") {
    return <Link to={"/artist/" + props.id}>{list}</Link>;
  } else if (props.type === "playlist" || props.type === "catalog") {
    return <Link to={"/" + props.type + "/" + props.id}>{list}</Link>;
  } else {
    return "";
  }
};

export default List;
