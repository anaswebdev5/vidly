import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies,
      genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;
    let filtered = allMovies;

    if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (count === 0) return <b>There is no movies in database</b>;
    const { totalCount, data: movies } = this.getPagedData();
    console.log(movies);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          ></ListGroup>
        </div>
        <div className="col">
          <b>Showing {totalCount} movies from database.</b>
          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
