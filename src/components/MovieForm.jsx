import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovie } from "../services/fakeMovieService";

export default class MovieForm extends Component {
  state = {
    movie: {
      _id: "",
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      liked: "",
    },
  };
  componentDidMount() {
    const movieId = this.props.match.params.id;
    const movie = getMovie(movieId);
    if (!movie) {
      return this.props.history.push("/notFound");
    }
    this.setState({ movie });
  }

  render() {
    return (
      <div>
        <h1>{`Movie Form: ${this.state.movie.title}`}</h1>
        <Link className="btn btn-primary" to="/">
          Save
        </Link>
      </div>
    );
  }
}
