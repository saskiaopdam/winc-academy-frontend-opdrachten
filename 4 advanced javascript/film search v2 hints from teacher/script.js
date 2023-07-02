// tips docent: forEach ipv for loop, arrow functions
const radiobuttons = document.querySelectorAll("input[type='radio']");
const searchField = document.getElementById("searchField");
const moviesDisplayArea = document.getElementById("moviesDisplayArea");

const addMoviesToDom = function (moviesToDisplay) {
  moviesToDisplay.forEach((movieToDisplay) => {
    const moviesDisplayArea = document.getElementById("moviesDisplayArea");
    const newLi = document.createElement("li");
    // newLi.innerHTML = movies[i].Title;
    const imdbID = movieToDisplay.imdbID;
    // console.log(imdbID);

    const addImageWithLink = (imdbID) => {
      const newA = document.createElement("a");
      newA.href = "https://www.imdb.com/title/" + imdbID + "/";
      newA.target = "_blank";
      const newImg = document.createElement("img");
      newImg.src = movieToDisplay.Poster;
      moviesDisplayArea.appendChild(newLi);
      newLi.appendChild(newA);
      newA.appendChild(newImg);
    };

    addImageWithLink(imdbID);
  });
};

addMoviesToDom(movies);
console.log(movies);

const filterLatestMovies = () => {
  const filteredLatestMovies = movies.filter((movie) => {
    return movie.Year >= 2014;
  });
  console.log(filteredLatestMovies);
  moviesDisplayArea.innerHTML = "";
  addMoviesToDom(filteredLatestMovies);
};

const filterMovies = (wordInMovieTitle) => {
  const filteredMovies = movies.filter((movie) => {
    // return movie.Title.includes(wordInMovieTitle);
    return movie.Title.indexOf(wordInMovieTitle) !== -1;
    // .includes schijnt niet te werken in IE, .indexOf wel
    // .includes vervangen door .indexOf in 2 functies: filterMovies en filterMoviesOnTitle
  });
  console.log(filteredMovies); // netjes: gefilterde films verschijnen in console
  moviesDisplayArea.innerHTML = "";
  addMoviesToDom(filteredMovies);
};

// return movie.Title.toLowerCase().includes(searchedTitle.toLowerCase());

const filterSearchedMovies = (searchedTitle) => {
  const filteredSearchedMovies = movies.filter((movie) => {
    // return movie.Title.match(/searchedTitle/i);
    return (
      movie.Title.toLowerCase().indexOf(searchedTitle.toLowerCase()) !== -1
    );
    // De formatter voegt () toe achter return, waarom hier wel en bij de functie filterMovies niet ?
  });
  console.log(filteredSearchedMovies); // netjes: gefilterde films verschijnen in console
  moviesDisplayArea.innerHTML = "";
  addMoviesToDom(filteredSearchedMovies);
};

searchField.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    console.log("Enter is pressed in searchfield"); // correct
    // functie uitbouwen:
    // 1. invoerwaarde selecteren
    console.log(searchField.value); // correct
    // 2. array filteren op invoerwaarde
    // 3. gefilterd array tonen
    filterSearchedMovies(searchField.value);
  }
});

const addEventListeners = (radiobuttons) => {
  radiobuttons.forEach((radiobutton) => {
    const handleOnChangeEvent = (e) => {
      // switch statement
      const filter = e.target.value;
      // console.log(filter);
      switch (filter) {
        case "recent":
          // console.log("hey ik ben een recente film");
          filterLatestMovies();
          break;
        case "avenger":
          // console.log("hey ik ben een avenger film");
          filterMovies("Avengers");
          break;
        case "x-men":
          // console.log("hey ik ben een x-men film");
          filterMovies("X-Men");
          break;
        case "princess":
          // console.log("hey ik ben een princess film");
          filterMovies("Princess");
          break;
        case "batman":
          // console.log("hey ik ben een batman film");
          filterMovies("Batman");
          break;
        default:
          alert("please add a new case to the switch statement");
      }
    };
    radiobutton.addEventListener("change", handleOnChangeEvent);
  });
};

addEventListeners(radiobuttons);
