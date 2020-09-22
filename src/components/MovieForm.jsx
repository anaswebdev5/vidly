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
    await this.populateGenres();
    await this.populateMovie();
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
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
      await saveMovie(movie);
      this.props.history.push("/movies");
      toast.success("Movie saved successfuly.");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.title = ex.response.data;
        this.setState({ errors });
        console.log(ex);
        toast.error("Movie wasn't saved.");
      }
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
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
