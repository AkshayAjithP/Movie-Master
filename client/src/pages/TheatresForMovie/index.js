import React, { useEffect } from "react";
import Button from "../../components/Button";
import moment from "moment";
import { Col, Row, Table, message } from "antd";
import { GetAllMovies, GetMovieById } from "../../services/movies";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllTheatresByMovie } from "../../services/theatres";

function TheatresForMovie() {
  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );
  const [movie, setMovie] = React.useState({});
  const [theatres, setTheatres] = React.useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const getData = async () => {
    try {
      const response = await GetMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const GetTheatres = async () => {
    try {
      const response = await GetAllTheatresByMovie({ date, movie: params.id });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    GetTheatres();
  }, [date]);

  return (
    movie && (
      <div>
        {/* Movie Information */}
        <div className="flex justify-between p-1">
          <div>
            <h1 className="text-xl">
              {movie.title} ({movie.language})
            </h1>
            <h1 className="text-md">Duration: {movie.duration} mins</h1>
            <h1 className="text-md">
              Release Date: {moment(movie.releaseDate).format("MMMM DD YYYY")}
            </h1>
            <h1 className="text-md">Genre: {movie.genre}</h1>
          </div>
          <div className="text-right">
            <h1 className="text-md">Select Date:</h1>
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            />
          </div>
        </div>
        <hr />
        {/* Movie theatres */}
        <div className="flex justify-between p-1">
          <h1 className="text-xl ">Theatres</h1>
        </div>
        <div className="mt-1 flex flex-col-1">
          {theatres.map((theatre) => (
            <div key={theatre._id} className="card p-1">
              <h1 className="text-md">{theatre.name}</h1>
              <h1 className="text-md">{theatre.address}</h1>
              <div className="flex gap-2">
                {theatre.shows.map((show) => (
                  <div
                    key={show._id}
                    className="card bg-primary cursor-pointer"
                    onClick={() => {
                      navigate(`/book-show/${show._id}`);
                    }}
                  >
                    <h1 className="text-sm">{show.time}</h1>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default TheatresForMovie;
