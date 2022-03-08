import { React, useState, useEffect } from "react";

import "./Cast.css";
export default function Credits({ id, type }) {
  const [num, setNUm] = useState(id);
  const [med, setMed] = useState(type);

  console.log(num);
  const [cast, setCast] = useState([]);

  const fetchData = async () => {
    try {
      let mainUrl = `https://api.themoviedb.org/3/${med}/${num}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
      const data = await fetch(mainUrl);
      const response = await data.json();
      const { cast } = response;
      setCast(cast);
    } catch (err) {
      console.log(err);
    }
  };

  let imgUrl = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="crew">
      {typeof cast !== "undefined"?
      cast.map((items, index) => {
        return (
          <div className="carousel-img">
            <img
              className="castimg"
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
      })
      :
      <div style={{ color: "white", fontSize: "2rem" }}>Please go back</div>}
    </div>
  );
}
