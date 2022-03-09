import { React, useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Search({ name, type, func, medtype }) {
  // setting results
  const [pic, setPic] = useState([]);
  const [loading, setLoading] = useState(false);
  //setting the name of the movie searched
  const [num, setNUm] = useState(name);
  //setting the the media type whether it's a movie or a tv show show 
  const [show, setShow] = useState(type);
  //setting page
  const [pg, setPage] = useState(0);
  //setting the total pages
  const [totalPages, settotalPages] = useState(0);

  const fetchData = async () => {
    let mainUrl = `https://api.themoviedb.org/3/search/${show}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${num}&include_adult=false`;
    setLoading(true);
    const data = await fetch(mainUrl);
    const response = await data.json();
    //getting the results of the movie searche, the page and the total results available for a particular movie
    const { results, page, total_results } = response;
    setPic(results);
    setLoading(false);
    setPage(page);
    settotalPages(total_results);
  };

  const fetchMoreData = async () => {
    let x = pg;
    setPage(x + 1);
    console.log(pg);
    let mainUrl = `https://api.themoviedb.org/3/search/${show}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${num}&page=${
      pg + 1
    }&include_adult=false`;
    const data = await fetch(mainUrl);
    const response = await data.json();
    const { results, page } = response;

    setTimeout(() => {
      setPic(pic.concat(results));
      setPage(page);
    }, 1000);
  };

  let imgUrl = "https://image.tmdb.org/t/p/w300";
  let backUp =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";
  let lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor";
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (id, type) => {
    func(id);
    medtype(type);
  };
  return (
    <div className="trending">
      {typeof pic !== "undefined" ? (
        <InfiniteScroll
          dataLength={pic.length}
          next={fetchMoreData}
          hasMore={pic.length !== totalPages}
          loader={<Loader />}
        >
          <div className="box-main1">
            {pic.map((items, index) => {
              return (
                <div className="box">
                  <Badge
                    badgeContent={items.vote_average}
                    color={items.vote_average > 7 ? "primary" : "secondary"}
                  />
                  <Link to="/cast" className="li">
                    <div
                      className="box1"
                      onClick={() => {
                        handleClick(
                          items.id,
                          items.original_title ? "movie" : "tv"
                        );
                      }}
                    >
                      <img
                        className="img"
                        src={
                          items.poster_path
                            ? imgUrl + items.poster_path
                            : backUp
                        }
                        alt=""
                      />
                      <div className="content">
                        <h3>{items.original_title || items.original_name}</h3>
                        <p className="short">
                          {items.overview === ""
                            ? lorem.slice(0, 60)
                            : items.overview.slice(0, 60)}
                          ...
                        </p>
                        <div className="subtitle">
                          <p>{items.release_date || items.first_air_date}</p>
                          <p>{show.toUpperCase()}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      ) : (
        <div style={{ color: "white", fontSize: "2rem" }}>
          Please go back and search again
        </div>
      )}
    </div>
  );
}
