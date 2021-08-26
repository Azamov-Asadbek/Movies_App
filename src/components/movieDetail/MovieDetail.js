import React, { useEffect, useState } from 'react';
import {
  fetchCasts,
  fetchMovieDetail,
  fetchMovieVideos,
  fetchSimilarMovie,
} from '../../service';
import ReactPlayer from 'react-player';
import { AiFillPlayCircle } from 'react-icons/ai';
import { FaTelegram, FaYoutube } from 'react-icons/fa';
import { RiNetflixFill } from 'react-icons/ri';
import { Modal } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

import Aos from 'aos';
import 'aos/dist/aos.css';

export const MovieDetail = ({ match }) => {
  let params = match.params;
  let genres = [];
  const [detail, setDetail] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    const fetchApi = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
    };
    fetchApi();
  }, [params.id]);
  genres = detail.genres;
  const MoviePlayerModal = (props) => {
    const youtubeUrl = 'https://www.youtube.com/watch?v=';
    return (
      <Modal
        data-aos="zoom-in"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closedButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: '#000', fontWeight: 'bolder' }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: '#000' }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((e, i) => (
      <li data-aos="zoom-in-down" key={i} className="list-inline-item">
        <button type="button" className="btn btn-outline-warning">
          {e.name}
        </button>
      </li>
    ));
  }

  const castList = casts.slice(0, 4).map((e, i) => {
    return (
      <div data-aos="zoom-in-up" className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={e.img}
          alt={e.name}
        />
        <p className="font-weight-bold text-center">Trending for {e.name}</p>
        <p
          className="font-weight-bold text-center"
          style={{ color: '#5a606b' }}
        >
          {e.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((e, i) => (
    <div data-aos="zoom-in-up" className="col-md-3 col-sm-6">
      <div className="card">
        <Link to={`/movie/${e.id}`}>
          <img className="img-fluid" src={e.poster} alt={e.title} />
        </Link>
      </div>
      <div className="mt-3">
        <p style={{ fontWeight: 'bolder' }}>{e.title}</p>
        <p>Rated: {e.raiting}</p>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row mt-2">
        <MoviePlayerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePlayerModal>
        <div
          data-aos="fade-up"
          className="col text-center"
          style={{ width: '100%' }}
        >
          <img
            className="img-fluid"
            src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          />

          <div className="carousel-center">
            <AiFillPlayCircle
              style={{ color: 'orange', fontSize: 90, cursor: 'pointer' }}
              onClick={() => setIsOpen(true)}
            />
          </div>
          <div
            className="carousel-caption"
            style={{ textAlign: 'center', fontSize: '35px' }}
          >
            {detail.title}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>Genres</p>
        </div>
      </div>

      <div className="row mt-3">
        <div data-aos="fade-down" className="col">
          <ul className="list-inline">{genresList}</ul>
        </div>
      </div>

      <div data-aos="fade-down" className="row mt-2 ">
        <div className="col">
          <div className="text-center">
            <ReactStars
              count={detail.vote_average}
              size={20}
              color1="#f4c10f"
            ></ReactStars>
            <div className="mt-3">
              <p
                style={{
                  color: '#5a606b',
                  fontWeight: 'bolder',
                  textAlign: 'left',
                }}
              >
                Overview
              </p>
              {detail.overview}
            </div>
          </div>
        </div>

        <div data-aos="fade-right" className="row mt-3">
          <div className="col-md-3">
            <p
              style={{
                color: '#5a606b',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              Release Data
            </p>
            <p
              style={{
                color: 'orange',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              {detail.release_date}
            </p>
          </div>

          <div data-aos="fade-right" className="col-md-3">
            <p
              style={{
                color: '#5a606b',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              Run Time
            </p>
            <p
              style={{
                color: 'orange',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              {detail.runtime}
            </p>
          </div>

          <div data-aos="fade-left" className="col-md-3">
            <p
              style={{
                color: '#5a606b',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              Budget
            </p>
            <p
              style={{
                color: 'orange',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              {detail.budget}
            </p>
          </div>

          <div className="col-md-3">
            <p
              style={{
                color: '#5a606b',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              HomePage
            </p>
            <p
              style={{
                color: 'orange',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              {detail.homepage}
            </p>
          </div>
        </div>

        <div data-aos="fade-left" className="row mt-3">
          <div className="col">
            <p
              style={{
                color: '#5a606b',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              Casts
            </p>
          </div>
        </div>

        <div className="row mt-3">{castList}</div>

        <div data-aos="fade-up-right" className="row mt-3">
          <div className="col">
            <p
              style={{
                color: '#5a606b',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              Similar Movies
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-3">{similarMovieList}</div>

      <div data-aos="fade-up-left" className="row">
        <hr className="mt-5" style={{ color: '#17212b' }} />
        <div className="col-md-9 col-6">
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
          <img src="../img/A_logo_compress.png" alt="Azamov logo" />
        </div>
      </div>
    </div>
  );
};
