import { React, useState } from "react";
import "./styles.css";
import Navbar from "./components/Nav/Navbar/Navbar";
import Movie from "./components/Pages/Movie/Movie";
import TvShows from "./components/Pages/TvShows/TvShows";
import Trending from "./components/Pages/Trending/Trending";
import FeatMovies from "./components/Featured/FeatMovies/FeatMovies";
import Hero from "./components/Nav/Hero.js/Hero";
import Details from "./components/Crew/Details/Details";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";
import Cast from "./components/Crew/Cast/Cast";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default function App() {
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  //Getting the name of movie or tv show searched
  const getname = (data) => {
    setName(data);
  };
  //Getting the id of the movie or tv show being clicked
  const funcky = (data) => {
    setId(data);
  };
  //Getting the media type of the movie or tv show  being clicked
  const media = (med) => {
    setType(med);
  };

  return (
    <div className="app">
      
      <Router>
        {/* rendering navbar component */}
        <Navbar />
        <Switch>
          {/* rendering home page */}
          <Route exact path="/">
            <Hero func={funcky} medtype={media} />
            <FeatMovies func={funcky} medtype={media} media={"movies"} />
            <FeatMovies func={funcky} medtype={media} media={"tvshows"} />
            <Footer />
          </Route>
          {/* rendering movies page */}
          <Route exact path="/movies">
            <Movie
              func={funcky}
              medtype={media}
              name={getname}
              media={"movies"}
            />
          </Route>
          {/* rendering tv shows page */}
          <Route exact path="/tvshows">
            <TvShows func={funcky} medtype={media} name={getname} />
          </Route>
          {/* rendering cast of the movie or tv show requested */}
          <Route exact path="/cast">
            <Details id={id} type={type} />
          </Route>
          {/* rendering featured movies page */}
          <Route exact path="/featmovies">
            <Movie
              func={funcky}
              medtype={media}
              name={getname}
              key="featmovies"
              mediatype={"featmovies"}
            />
          </Route>
          {/* rendering featured tvshows page */}
          <Route exact path="/feattvshows">
            <Movie
              func={funcky}
              medtype={media}
              name={getname}
              key="feattvshows"
              mediatype={"feattvshows"}
            />
          </Route>
          {/* rendering trending page */}
          <Route exact path="/trending">
            <Trending func={funcky} medtype={media} />
          </Route>
          {/* rendering the all cast page */}
          <Route exact path="/credits">
            <Cast id={id} type={type} />
          </Route>
          {/* rendering search page for the movie or tv show being searched */}
          <Route exact path="/search">
            <Search name={name} type={type} func={funcky} medtype={media} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
