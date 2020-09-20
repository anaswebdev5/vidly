import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    title: "New Movie",
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  async componentDidMount() {
    try {
      const { data: genres } = await getGenres();
      this.setState({ genres });
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      if (!movie) {
        throw Error("Movie not found");
      }
      this.setState({ data: this.mapToViewModel(movie), title: "Edit Movie" });
    } catch (ex) {
      console.log(ex);
      return this.props.history.replace("/notFound");
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    try {
      const movie = this.state.data;
      const { error } = await saveMovie(movie);
      if (error) {
        throw Error(error);
      }
      this.props.history.push("/movies");
      toast.success("Movie saved successfuly.");
    } catch (ex) {
      console.log(ex);
      toast.error("Movie wasn't saved.");
    }
  };
  mapToModelView = (movie, genre) => {
    return {
      _id: movie._id,
      title: movie.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      liked: movie.liked,
    };
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
