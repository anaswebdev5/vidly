import React, { Component } from "react";
import { deleteMovie, getMovies, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import SearchBox from "./common/SearchBox";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    let { data: genres } = await getGenres();
    genres = [{ _id: "", name: "All Genres" }, ...genres];
    this.setState({
      movies,
      genres,
      selectedGenre: this.state.selectedGenre ? null : genres[0],
    });
  }

  handleDelete = async (movie) => {
    const oldMovies = [...this.state.movies]; //old State
    try {
      const movies = this.state.movies.filter((m) => m._id !== movie._id);
      this.setState({ movies });
      const { error } = await deleteMovie(movie._id);
      if (error) {
        throw Error(error);
      }
      toast.success("Movie deleted successfuly");
    } catch (ex) {
      this.setState({ movies: oldMovies });
      toast.error("Movie is already deleted!");
      console.log(ex);
    }
  };

  handleLike = async (movie) => {
    const oldMovies = [...this.state.movies];
    try {
      const movies = [...this.state.movies];
      const index = movies.indexOf(movie);
      movies[index] = { ...movies[index] };
      movies[index].liked = !movies[index].liked;
      this.setState({ movies });
      const { error } = await saveMovie(movie);
      if (error) {
        throw Error(error);
      }
    } catch (ex) {
      toast.error("Movie not found.");
      this.setState({ movies: oldMovies });
      console.log(ex);
    }
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
  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: this.state.genres[0],
      currentPage: 1,
    });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { user } = this.props;
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    if (count === 0) return <b>There is no movies in database</b>;
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-sm-3 col-md-6 col-lg-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          ></ListGroup>
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20, float: "right" }}
            >
              New Movie
            </Link>
          )}
          <span>Showing {totalCount} movies from database.</span>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
