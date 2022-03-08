import { React, useState, useEffect } from "react";
import Loader from "../../Loader";
import Credits from "../Credits/Credits";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./Details.css";
export default function Details({ id, type }) {
  const [num, setNUm] = useState(id);
  const [show, setShow] = useState(type);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [key, setKey] = useState("");
  window.onload = () => {
    window.scroll(0, 0);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      let mainUrl = `https://api.themoviedb.org/3/${show}/${num}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
      let videoUrl = `https://api.themoviedb.org/3/${show}/${num}/videos?api_key=${process.env.REACT_APP_API_KEY}`;

      const data = await fetch(mainUrl);
      const response = await data.json();

      const videoData = await fetch(videoUrl);
      const vidresponse = await videoData.json();
      const { results } = vidresponse;

      const funcCheck = () =>{
        for (let i = 0; i < results.length; i++) {
            if (results[i].type === "Teaser") {
              setKey(results[i].key);
              console.log("w")
              break;
            }
          }
      }
      for (let i = 0; i < results.length; i++) {
        if (results[i].type === "Trailer") {
          setKey(results[i].key);
          console.log("y")
          break;
        }
        else{
          console.log("z")
          funcCheck()
        }
      }
      const {
        poster_path,
        overview,
        original_title,
        release_date,
        original_name,
        first_air_date
      } = response;

      const obj = {
        poster_path,
        overview,
        original_title,
        release_date,
        original_name,
        first_air_date
      };
      setDetails(obj);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  let imgUrl = "https://image.tmdb.org/t/p/w500";
  let vidUrl = "https://www.youtube.com/watch?v=";

  useEffect(() => {
    fetchData();
    window.onload();
  }, []);

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <div className="all">
          <div className="image">
            <img src={imgUrl + details.poster_path} alt="" />
          </div>

          <div className="details-content">
            <h1>{details.original_title || details.original_name}</h1>
            <p className="view">OVERVIEW : {details.overview}</p>
            {show === "movie" ? (
              <p className="view">
                RELEASE DATE : {details.release_date || details.first_air_date}
              </p>
            ) : (
              <p className="view">
                FIRST AIR DATE :{" "}
                {details.release_date || details.first_air_date}
              </p>
            )}
            <div className="subtitle">
              <p className="strong">
                <strong>CAST</strong>
              </p>
              <Link className="lis" to="/credits">
                <p className="li">View All</p>
              </Link>
            </div>
            <Credits id={num} show={show} />
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              color="secondary"
              href={vidUrl + key}
              target="_blank"
            >
              Watch Trailer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
