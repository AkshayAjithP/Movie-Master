import React, { useEffect } from "react";
import Button from "../../components/Button";
import moment from "moment";
import { Col, Row, Table, message } from "antd";
import { GetAllMovies } from "../../services/movies";
import { useNavigate } from "react-router-dom";
function Home() {
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
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
  return (
    <div>
      <input type="text" placeholder="search for movies" />
      <Row gutter={[16, 16]} className="mt-1">
        {movies.map((movie) => (
          <Col span={4} key={movie._id}>
            <div
              className="p-2 card cursor-pointer"
              onClick={() =>
                navigate(
                  `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                )
              }
            >
              <center>
                {" "}
                <img src={movie.poster} alt={movie.title} height={200} />
              </center>

              <div className="p-2">
                <center>
                  {" "}
                  <h1 className="text-md uppercase ">{movie.title}</h1>
                </center>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default Home;
