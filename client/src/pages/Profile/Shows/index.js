import { Col, Form, Input, Modal, Row, Table, message } from "antd";
import React, { useEffect } from "react";
import { GetAllMovies } from "../../../services/movies";
import { AddShow, GetAllShowsByTheatre } from "../../../services/theatres";
function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
  const [view, setView] = React.useState("table");
  const [shows, setShows] = React.useState([]);
  const [movies, setMovies] = React.useState([]);

  const getData = async () => {
    try {
      const movieResponse = await GetAllMovies();

      if (movieResponse.success) {
        setMovies(movieResponse.data);
      } else {
        message.error(movieResponse.message);
      }

      const showsResponse = await GetAllShowsByTheatre({
        theatreId: theatre._id,
      });
      if (showsResponse.success) {
        setShows(showsResponse.data);
      } else {
        message.error(showsResponse.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleAddShow = async (values) => {
    try {
      const response = await AddShow({
        ...values,
        theatre: theatre._id,
      });
      if (response.success) {
        message.success(response.message);
        getData();
        setView("table");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, record) => {
        return record.movie.title;
      },
    },
    {
      title: "Ticket price",
      dataIndex: "ticketPrice",
    },
    {
      title: "Total seats",
      dataIndex: "totalSeats",
    },
    {
      title: "Available seats",
      dataIndex: "availableSeats",
      render: (text, record) => {
        return record.totalSeats - record.bookedSeats.length;
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    // },
  ];
  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      title=""
      open={openShowsModal}
      onCancel={() => setOpenShowsModal(false)}
      width={1500}
      footer={null}
    >
      <h1 className="text-primary-text-md">Theatre: {theatre.name}</h1>
      <hr />
      <div className="flex justify-between mt-1 item-center">
        <h1 className="text-md">{view === "table" ? "shows" : "add show"}</h1>
        {view === "table" && (
          <button
            className="bg-primary p-1 text-grey"
            variant="outlined"
            title="Add show"
            onClick={() => {
              setView("form");
            }}
          >
            Add show
          </button>
        )}
      </div>

      {view === "table" && <Table columns={columns} dataSource={shows} />}
      {view === "form" && (
        <Form layout="vertical" onFinish={handleAddShow}>
          <Row gutter={(16, 16)}>
            <Col span={8}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Please input show name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input show date" }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Show Time"
                name="time"
                rules={[{ required: true, message: "Please input show time" }]}
              >
                <Input type="time" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Movie"
                name="movie"
                rules={[{ required: true, message: "Please select movie" }]}
              >
                <select>
                  <option value="">Select value</option>
                  {movies.map((movie) => (
                    <option value={movie._id}>{movie.title}</option>
                  ))}
                </select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Ticket price"
                name="ticketPrice"
                rules={[
                  { required: true, message: "Please input ticket price" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total seats"
                name="totalSeats"
                rules={[
                  { required: true, message: "Please input total seats" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-1">
            <button
              className="border border-primary bg-white text-primary p-1 cursor-pointer"
              type="button"
              onClick={() => {}}
            >
              Cancel
            </button>
            <button
              className="border border-secondary bg-white text-primary p-1 cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Modal>
  );
}

export default Shows;
