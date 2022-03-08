import { React, useState, useEffect } from "react";
import Loader from "../../Loader";

import "./Credits.css";
export default function Credits({ id, show }) {
  const [num, setNUm] = useState(id);
  const [med, setMed] = useState(show);
  const [loading, setLoading] = useState(false);

  console.log(num);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let mainUrl = `https://api.themoviedb.org/3/${med}/${num}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
      const data = await fetch(mainUrl);
      const response = await data.json();
      const { cast, crew } = response;
      setCast(cast);
      setCrew(crew);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  let imgUrl = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="cast">

      {cast.map((items, index) => {
        if (index < 8) {
          return (
            <div className="carousel">
              <img
                className="img"
                src={
                  items.profile_path
                    ? imgUrl + items.profile_path
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
                }
                alt=""
              />
              <p>{items.original_name}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
