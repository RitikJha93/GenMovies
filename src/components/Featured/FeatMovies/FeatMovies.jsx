import React, { useEffect, useState } from "react";
import "./FeatMovies.css";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

export default function FeatMovies({ media, func, medtype }) {
  const [pic, setPic] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    let mainUrl = "";
    if (media === "movies") {
      mainUrl =
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc`;
    } else if (media === "tvshows") {
      mainUrl =
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc`;
    }
    setLoading(true);
    const data = await fetch(mainUrl);
    const response = await data.json();
    const { results } = response;
    setPic(results);
    setLoading(false);
  };
  let imgUrl = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    fetchData();
  }, []);

  const click = (id, type) => {
    func(id);
    medtype(type);
  };
  return (
    <>
    <div className="container">
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="textbox">
            {media === "latestrelease" ? (
              <h2>{media}</h2>
            ) : (
              <h2>Featured {media}</h2>
            )}
            <Link className="link" to={"/feat" + media}>
              View All
            </Link>
          </div>
          <div className="img-box">
            {pic.map((items, index) => {
              if (index < 8) {
                return (
                  <Link to="/cast">
                    <div
                      key={items.id}
                      className="img-slider"
                      onClick={() => {
                        if (items.original_title) {
                          click(items.id, "movie");
                        } else {
                          click(items.id, "tv");
                        }
                      }}
                    >
                      <img
                        className="imgs"
                        src={imgUrl + items.poster_path}
                        alt=""
                      />
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        </>
      )}
      </div>
    </>
  );
}
