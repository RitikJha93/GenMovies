import { Component } from "react";
import MovieItem from "../../MovieItem/MovieItem";
import InfiniteScroll from "react-infinite-scroll-component";

import Loader from "../../Loader";

import "../Movie/Movie.css";
export default class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      page: 0,
      loading: false,
      show: this.props.medtype,
      fun: this.props.func,
      totalPages: 0
    };
  }

  async componentDidMount() {
    let mainUrl =
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`;
    this.setState({ loading: true });
    const data = await fetch(mainUrl);
    const response = await data.json();
    const { page, results } = response;
    console.log(response);
    this.setState({ res: results, page: page, loading: false });
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let mainUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${this.state.page}`;
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
    const first = (data) => {
      this.state.show(data);
    };
    const second = (id) => {
      this.state.fun(id);
    };

    return (
      <div className="trending">
        {this.state.loading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.res.length}
          next={this.fetchMoreData}
          hasMore={this.state.res.length !== this.state.totalPages}
          loader={<Loader />}
        >
          <div className="main">
            {this.state.res.map((element) => {
              let img = url + element.poster_path;
              return (
                <MovieItem
                  key={element.id}
                  title={element.original_title || element.original_name}
                  date={element.release_date || element.first_air_date}
                  media={element.media_type}
                  overview={element.overview}
                  imageUrl={img}
                  vote={element.vote_average}
                  show1={first}
                  fun1={second}
                  id={element.id}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
