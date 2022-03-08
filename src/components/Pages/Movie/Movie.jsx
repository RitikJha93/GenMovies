import { Component } from "react";
import MovieItem from "../../MovieItem//MovieItem";
import InfiniteScroll from "react-infinite-scroll-component";

import SearchIcon from "@mui/icons-material/Search";
import Loader from '../../Loader';
import { Link } from "react-router-dom";
import "./Movie.css";
export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      page: 0,
      loading: false,
      type: this.props.mediatype,
      show: this.props.medtype,
      fun: this.props.func,
      istv: false,
      mediatype: this.props.media,
      val: "",
      search: this.props.name,
      totalPages: 0
    };
  }

  // fetching the data from api
  async componentDidMount() {
    let mainUrl = "";
    if (this.state.type === "featmovies") {
      this.setState({ istv: false });
      mainUrl =
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc`;
    } else if (this.state.type === "feattvshows") {
      this.setState({ istv: true });
      mainUrl =
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc`;
    } else {
      this.setState({ istv: false });
      mainUrl =
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc`;
    }
    this.setState({ loading: true });
    const data = await fetch(mainUrl);
    const response = await data.json();
    const { page, results, total_results } = response;
    this.setState({
      res: results,
      page: page,
      loading: false,
      totalPages: total_results
    });
    window.onload();
  }

  //fetching the data for infinite scrolling
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let mainUrl = "";
    if (this.state.type === "featmovies") {
      this.setState({ istv: false });
      mainUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc&page=${this.state.page}`;
    } else if (this.state.type === "feattvshows") {
      this.setState({ istv: true });
      mainUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_count.desc&page=${this.state.page}`;
    } else {
      this.setState({ istv: false });
      mainUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${this.state.page}`;
    }
    const data = await fetch(mainUrl);
    const response = await data.json();
    const { page, results } = response;
    setTimeout(() => {
      this.setState({
        res: this.state.res.concat(results),
        page: page
      });
    }, 1000);
  };
  render() {
    let url = "https://image.tmdb.org/t/p/w300";

    window.onload = () => {
      window.scroll(0, 0);
    };
    // passing the mediatype to the parent component as props
    const first = (data) => {
      this.state.show(data);
      this.setState({ mediatype: data });
    };
    // passing the movie id to the parent component as props
    const second = (id) => {
      this.state.fun(id);
    };


    const handleChange = (e) => {
      let val = e.target.value;
      this.setState({ val: val });
    };

    const handleClick = () => {
      this.state.show(this.state.istv ? "tv" : "movie");
      this.state.search(this.state.val);
    };

    return (
      <div className="trending">
        {this.state.loading && <Loader />}
        <div className="main">
          <div className="searchbox">
            <div className="search">
              <input
                type="text"
                name="search"
                id="search"
                placeholder={
                  this.state.istv ? "Search Tvshows" : "Search Movies"
                }
                onChange={handleChange}
              />
            </div>
            <Link to="/search">
              <div className="searchicon" onClick={handleClick}>
                <SearchIcon className="ico" />
              </div>
            </Link>
          </div>
          <InfiniteScroll
            dataLength={this.state.res.length}
            next={this.fetchMoreData}
            hasMore={this.state.res.length !== this.state.totalPages}
            loader={<Loader />}
          >
            <div className="box-main1">
              {this.state.res.map((element) => {
                let img = url + element.poster_path;
                return (
                  <MovieItem
                    key={element.id}
                    title={element.original_title || element.original_name}
                    date={element.release_date || element.first_air_date}
                    media={this.state.istv ? "tv" : "movie"}
                    imageUrl={img}
                    vote={element.vote_average}
                    overview={element.overview}
                    show1={first}
                    fun1={second}
                    id={element.id}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}
