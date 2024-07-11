import React, { useEffect } from "react";
import Button from "../../components/Button";
import MovieForm from "./MovieForm"; // Import MovieForm correctly
import moment from "moment";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { GetAllMovies, DeleteMovie } from "../../services/movies";
function MovieList() {
  const [movies, setMovies] = React.useState([]);
  const [showMoviesFormModel, setShowMovieFormModel] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formType, setFormType] = React.useState("add");
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteMovie({
        movieId,
      });

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return <img src={record.poster} alt="poster" style={{ width: 60 }} />;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Release Data",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dateIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            <button
              className="bg-primary p-1 text-grey cursor-pointer"
              onClick={() => {
                setSelectedMovie(record);
                setFormType("edit");
                setShowMovieFormModel(true);
              }}
            >
              Edit
            </button>
            <button
              className="bg-secondary p-1 text-grey cursor-pointer"
              onClick={() => {
                handleDelete(record._id);
              }}
            >
              delete
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          title="Add Movie"
          variant="outlined"
          onClick={() => {
            setShowMovieFormModel(true);
            setFormType("add");
          }}
        />
      </div>

      <Table columns={columns} dataSource={movies} />
      {showMoviesFormModel && (
        <MovieForm
          showMoviesFormModel={showMoviesFormModel}
          setShowMovieFormModel={setShowMovieFormModel}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MovieList;
