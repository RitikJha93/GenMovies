import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Hero.css";
export default function Hero({ func, medtype }) {
  const [poster, setPoster] = useState([]);

  const fetchData = async () => {
    let mainUrl =
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc`;
    const data = await fetch(mainUrl);
    const response = await data.json();
    const { results } = response;
    setPoster(results);
  };
  let imgUrl = "https://image.tmdb.org/t/p/w500";
  let img1Url = "https://image.tmdb.org/t/p/w1280";
  useEffect(() => {
    fetchData();
  }, []);

  const click = (id, type) => {
    func(id);
    medtype(type);
  };

  return (
    <div className="slider">
      <div className="slider-track">
        {poster.map((items, index) => {
          if (index === 0 || index === 2 || index === 8) {
            return (
              <div key={index} className="figure">
                <img
                  className="background"
                  src={img1Url + items.backdrop_path}
                  alt="what"
                />
                <div className="desc">
                  <div className="text">
                    <h3>{items.overview.slice(0, 120)}...</h3>
                    <button>
                      {" "}
                      <Link
                        className="bt"
                        to="/cast"
                        onClick={() => {
                          click(items.id, "movie");
                        }}
                      >
                        {" "}
                        View More{" "}
                      </Link>
                    </button>
                  </div>
                  <div className="poster">
                    <img src={imgUrl + items.poster_path} alt="what" />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      {/* } */}
    </div>
  );
}
