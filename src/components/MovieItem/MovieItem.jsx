import { Component } from "react";
import Badge from "@mui/material/Badge";
import "./MovieItem.css";
import { Link } from "react-router-dom";

export default class MovieItem extends Component {
  render() {
    let {
      title,
      date,
      imageUrl,
      media,
      vote,
      overview,
      id,
      show1,
      fun1
    } = this.props;
    let lorem =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor";

    const click = (id, type) => {
      show1(type);
      fun1(id);
    };
    return (
      <div className="box-main">
        <div className="box">
          <Badge
            badgeContent={vote}
            color={vote > 7 ? "primary" : "secondary"}
          />

          <Link
            className="li"
            to="/cast"
            onClick={() => {
              click(id, media);
            }}
          >
            <div className="box1">
              <img className="img" src={imageUrl} alt="" />
              <div className="content">
                <h3>{title}</h3>
                <p className="short">
                  {overview === "" ? lorem.slice(0, 60) : overview.slice(0, 60)}
                  ...
                </p>
                <div className="subtitle">
                  <p>{date}</p>
                  <p>{media.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
