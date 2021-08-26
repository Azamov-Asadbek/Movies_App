import React, { useEffect, useState } from 'react';
import {
  fetchGenre,
  fetchMovieByGenre,
  fetchMovies,
  fetchTopRatedMovie,
} from '../../service';
import RBCarousel from 'react-bootstrap-carousel';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { AiFillPlayCircle } from 'react-icons/ai';
import { FaTelegram, FaYoutube } from 'react-icons/fa';
import { RiNetflixFill } from 'react-icons/ri';
import { IoArrowForwardCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const fetchApi = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre());
      setTopRated(await fetchTopRatedMovie());
    };
    fetchApi();
  }, []);

  const handleGenreClick = async (genre_id, genre) => {
    setMovieByGenre(await fetchMovieByGenre(genre_id));
    document.querySelectorAll('.lists-item').forEach((list) => {
      list.classList.remove('active_item');
      if (list.textContent === genre) {
        list.classList.add('active_item');
      }
    });
  };

  const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <div style={{ width: '100%', height: 500 }} key={index}>
        <div className="carousel-center">
          <img
            style={{
              height: 600,
            }}
            src={item.backPoster}
            alt={item.title}
          />
        </div>
        <div className="carousel-center">
          <Link to={`/movie/${item.id}`}>
            <AiFillPlayCircle
              style={{ color: 'orange', fontSize: 90, cursor: 'pointer' }}
            />
          </Link>
        </div>
        <div
          className="carousel-caption"
          style={{ textAlign: 'center', fontSize: '35px' }}
        >
          {item.title}
        </div>
      </div>
    );
  });

  const genreList = genres.map((i, index) => {
    return (
      <li
        key={index}
        className="lists-item"
        onClick={() => {
          handleGenreClick(i.id, i.genre);
        }}
      >
        {i.genre}
      </li>
    );
  });

  const cardMovi = movieByGenre.slice(0, 6).map((i, index) => {
    return (
      <div data-aos="fade-up" key={index} className="col-md-3 pb-2 col-6">
        <div className="rounded">
          <div className="card">
            <Link to={`/movie/${i.id}`}>
              <img src={i.poster} className="card-img-top" alt={i.title} />
            </Link>
          </div>
          <div className="card-bottom-text mt-2 p-2">
            <h5 className="card-name">{i.title}</h5>
            <p className="card-rate">
              Rated: <span>{i.raiting}</span>
            </p>
            <ReactStars
              count={i.raiting}
              size={20}
              color1={'#f4c10f'}
            ></ReactStars>
          </div>
        </div>
      </div>
    );
  });

  const topRatedList = topRated.slice(0, 4).map((i, index) => {
    return (
      <div data-aos="fade-up" key={index} className="col-md-3 col-6 pb-2">
        <div className=" rounded">
          <div className="card">
            <Link to={`/movie/${i.id}`}>
              <img src={i.poster} className="card-img-top" alt={i.title} />
            </Link>
          </div>
          <div className="card-bottom-text mt-2 p-2">
            <h5 className="card-name">{i.title}</h5>
            <p className="card-rate">
              Rated: <span>{i.raiting}</span>
            </p>
            <ReactStars
              count={i.raiting}
              size={20}
              color={'#f4c10f'}
            ></ReactStars>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row  mt-3">
        <div data-aos="fade-down" className="col">
          <RBCarousel
            autoplay={true}
            pauseOnVisibility={true}
            slideshowSpeed={2000}
            version={4}
          >
            {movies}
          </RBCarousel>
        </div>
      </div>

      <div className="row mt-3">
        <div data-aos="fade-right" className="col-md-2 col-4">
          <ul className="lists">{genreList}</ul>
        </div>

        <div data-aos="fade-left" className="col-md-10 col-8 px-md-5">
          <div className="row my-2">
            <div className="col">
              <div className="float-end">
                <IoArrowForwardCircle className="next-icon" />
              </div>
            </div>
          </div>

          <div className="row">{cardMovi}</div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold h4">Top Films</p>
        </div>
      </div>

      <div className="row my-2">
        <div className="col">
          <div className="float-end">
            <IoArrowForwardCircle className="next-icon" />
          </div>
        </div>
      </div>
      <div data-aos="fade-right" className="row  mt-3">
        {topRatedList}
      </div>

      <div className="row ">
        <hr className="mt-5" style={{ color: '#17212b' }} />
        <div data-aos="fade-left" className="col-md-9 col-6">
          <p className="h3">ABOUT ME</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatem, illum?
          </p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">
                <FaTelegram />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <FaYoutube />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <RiNetflixFill />
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-3 col-6">
          <img src="./img/A_logo_compress.png" alt="Azamov logo" />
        </div>
      </div>
      {/* ---------------------- */}
    </div>
  );
};

export default Home;
