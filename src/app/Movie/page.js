"use client";

import {
  Grid,
  Input,
  Card,
  CardOverflow,
  AspectRatio,
  CardContent,
  Divider,
  Typography,
  Button,
} from "@mui/joy";
import React from "react";

import { Link as MuiLink } from "@mui/joy";

import Link from "next/link";

import Image from "next/image";

import { useEffect, useState, createContext, useContext } from "react";

const apiKey = "86d96600e546966f6a12bb2224240ea4";
const apiBaseUrl = "https://api.themoviedb.org/3";

const initialUrl = `${apiBaseUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

const defaultMovieImg = "/default-image.jpg";

const MoviesContext = createContext();
export { MoviesContext };

function App() {
  const [movies, setMovies] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(initialUrl);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function fetchData() {
      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => setMovies(data.results))
        .catch((error) => console.error(error));
    }
    fetchData();
  }, [fetchUrl]);

  const getMovies = (movieType) => {
    let newUrl = "";

    if (movieType === "Popular") {
      newUrl = `${apiBaseUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (movieType === "Drama") {
      newUrl = `${apiBaseUrl}/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (movieType === "Kids") {
      newUrl = `${apiBaseUrl}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (movieType === "Thriller") {
      newUrl = `${apiBaseUrl}/discover/movie?with_genres=53&sort_by=popularity.desc&api_key=${apiKey}`;
    }

    setFetchUrl(newUrl);
  };

  const searchMovies = () => {
    const searchUrl = `${apiBaseUrl}/search/movie?query=${search}&api_key=${apiKey}`;
    setFetchUrl(searchUrl);
    setSearch("");
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        getMovies,
        search,
        searchMovies,
        setSearch,
      }}
    >
      <>
        <Header
          getMovies={getMovies}
          search={search}
          searchMovies={searchMovies}
          setSearch={setSearch}
        />
        <MovieList movies={movies} />
      </>
    </MoviesContext.Provider>
  );
}

function Header() {
  let arr = ["Popular", "Kids", "Drama", "Thriller"];
  const { getMovies, search, setSearch, searchMovies } =
    useContext(MoviesContext);

  return (
    <Grid className="header" container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={1}>
        <Button color="primary">
          <Link href="/">↩</Link>
        </Button>
      </Grid>
      <Grid xs={7}>
        <nav className="navigation">
          {arr.map((value, position) => (
            <MuiLink
              color="warning"
              variant="solid"
              key={position}
              name={value}
              onClick={(e) => getMovies(e.target.name)}
            >
              {value}
            </MuiLink>
          ))}
        </nav>
      </Grid>
      <Grid container xs={4} spacing={2} alignItems="center">
        <Grid xs={8}>
          <Input
            color="warning"
            size="sm"
            variant="soft"
            placeholder="Search a movie..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Grid>
        <Grid xs={4}>
          <Button onClick={searchMovies} variant="solid" color="warning">
            Search Movie
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

function MovieList() {
  let imgUrl = "https://image.tmdb.org/t/p/w500";

  const { movies } = useContext(MoviesContext);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {movies.length == 0 ? (
        <div className="no-data-msg">
          <p>No movies found!</p>
        </div>
      ) : (
        movies.map((item) => (
          <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <Card
              color="warning"
              orientation="vertical"
              size="md"
              variant="soft"
            >
              <CardOverflow>
                <AspectRatio ratio="1">
                  <Image
                    src={
                      item.poster_path == null
                        ? defaultMovieImg
                        : imgUrl + item.poster_path
                    }
                    srcSet={
                      item.poster_path == null
                        ? defaultMovieImg
                        : `${imgUrl}${item.poster_path}?auto=format&fit=crop&w=318&dpr=2 2x`
                    }
                    loading="lazy"
                    alt={item.title}
                    width={318}
                    height={475}
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{item.title}</Typography>
                <div className="overview">
                  {item.overview
                    ? item.overview
                    : "Movie overview coming soon..."}
                </div>
              </CardContent>
              <CardOverflow
                variant="soft"
                sx={{ bgcolor: "background.level1" }}
              >
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography
                    level="body-xs"
                    fontWeight="md"
                    textColor="text.secondary"
                  >
                    Total votes: {item.vote_count}
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    fontWeight="md"
                    textColor="text.secondary"
                  >
                    {item.release_date}
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    fontWeight="md"
                    textColor="text.secondary"
                  >
                    {item.original_language.toUpperCase()}
                  </Typography>
                </CardContent>
              </CardOverflow>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default App;
