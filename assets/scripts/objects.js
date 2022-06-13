const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter ?
      movies
      : movies.filter(movie => movie.info.title.includes(filter) );
  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    //pulling properties names to pull it out
    const { info, ...otherProps } = movie;
    console.log(otherProps);
    let { getFormattedTitle } = movie;
    getFormattedTitle = getFormattedTitle.bind(movie);
    console.log(getFormattedTitle)
    // const {title: movieTitle} = info;
  // let text = movieTitle + ' - ';
  let text = getFormattedTitle.apply(movie,[]) + ' - ';

    for (const textKey in info) {
      if (textKey !== 'title' && textKey !== '_title'){
        text = text + `${textKey}: ${info[textKey]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      // title,
      get title() {
        return this._title.toUpperCase();
      },
      set title(val) {
        if (val.trim() === ''){
          this._title = 'DEFAULT';
          return;
        }
        this._title = val;
      },
      [extraName]: extraValue
    },
    id: Math.random().toString(),
    getFormattedTitle(){
      return this.info.title.toUpperCase();
    }
  };

  newMovie.info.title = title;
  console.log(newMovie.info.title)

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);

}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
