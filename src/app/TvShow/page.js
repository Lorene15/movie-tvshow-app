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

const initialUrl = `${apiBaseUrl}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;

const defaultTvShowImg = "/default-image.jpg";

const TvShowContext = createContext();
export { TvShowContext };

function App() {
  const [tvShows, setTvShows] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(initialUrl);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function fetchData() {
      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => setTvShows(data.results))
        .catch((err) => console.error(err));
    }
    fetchData();
  }, [fetchUrl]);

  const getTvShows = (TvShowType) => {
    let newUrl = "";

    if (TvShowType === "Family") {
      newUrl = `${apiBaseUrl}/discover/tv?with_genres=10751&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (TvShowType === "Animation") {
      newUrl = `${apiBaseUrl}/discover/tv?with_genres=16&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (TvShowType === "Drama") {
      newUrl = `${apiBaseUrl}/discover/tv?with_genres=18&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (TvShowType === "Soap") {
      newUrl = `${apiBaseUrl}/discover/tv?with_genres=10766&sort_by=popularity.desc&api_key=${apiKey}`;
    }

    setFetchUrl(newUrl);
  };

  const searchTvShows = () => {
    const searchUrl = `${apiBaseUrl}/search/tv?query=${search}&api_key=${apiKey}`;
    setFetchUrl(searchUrl);
    setSearch("");
  };

  return (
    <TvShowContext.Provider
      value={{
        tvShows,
        getTvShows,
        search,
        searchTvShows,
        setSearch,
      }}
    >
      <>
        <Header
          getTvShows={getTvShows}
          search={search}
          searchTvShows={searchTvShows}
          setSearch={setSearch}
        />
        <TvShowList tvShows={tvShows} />
      </>
    </TvShowContext.Provider>
  );
}

function Header() {
  let arr = ["Family", "Animation", "Drama", "Soap"];
  const { getTvShows, search, setSearch, searchTvShows } =
    useContext(TvShowContext);

  return (
    <Grid className="header" container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={1}>
        <Button color="primary">
          <Link href="/">🔙</Link>
        </Button>
      </Grid>
      <Grid xs={7}>
        <nav className="navigation">
          {arr.map((value, position) => (
            <MuiLink
              color="primary"
              variant="solid"
              key={position}
              name={value}
              onClick={(e) => getTvShows(e.target.name)}
            >
              {value}
            </MuiLink>
          ))}
        </nav>
      </Grid>
      <Grid container xs={4} spacing={2} alignItems="center">
        <Grid xs={8}>
          <Input
            color="primary"
            size="sm"
            variant="soft"
            placeholder="Search for a tv show..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Grid>
        <Grid xs={4}>
          <Button onClick={searchTvShows} variant="solid" color="primary">
            Search TvShow
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

function TvShowList() {
  let imgUrl = "https://image.tmdb.org/t/p/w500";

  const { tvShows } = useContext(TvShowContext);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {tvShows.length == 0 ? (
        <div className="no-data-msg">
          <p>No tv shows found!</p>
        </div>
      ) : (
        tvShows.map((item) => (
          <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <Card
              color="primary"
              orientation="vertical"
              size="md"
              variant="soft"
            >
              <CardOverflow>
                <AspectRatio ratio="1">
                  <Image
                    src={
                      item.poster_path == null
                        ? defaultTvShowImg
                        : imgUrl + item.poster_path
                    }
                    srcSet={
                      item.poster_path == null
                        ? defaultTvShowImg
                        : `${imgUrl}${item.poster_path}?auto=format&fit=crop&w=318&dpr=2 2x`
                    }
                    alt={item.original_name}
                    width={318}
                    height={475}
                    priority
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{item.original_name}</Typography>
                <div className="overview">
                  {item.overview
                    ? item.overview
                    : "Tv Show overview coming soon..."}
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
                    Vote: {item.vote_count}
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    fontWeight="md"
                    textColor="text.secondary"
                  >
                    {item.first_air_date}
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
