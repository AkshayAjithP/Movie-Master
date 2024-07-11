import React from "react";
import { Button, Col, Form, Modal, Row, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { AddMovie, UpdateMovie } from "../../services/movies";
import moment from "moment";
function MovieForm({
  showMoviesFormModel,
  setShowMovieFormModel,
  selectedMovie,
  setSelectedMovie,
  formType,
  getData,
}) {
  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;

      if (formType === "add") {
        response = await AddMovie(values);
      } else {
        response = await UpdateMovie({
          ...values,
          movieId: selectedMovie._id,
        });
      }
      if (response.success) {
        getData();
        message.success(response.message);
        setShowMovieFormModel(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.messageS);
    }
  };
  return (
    <Modal
      title={formType === "add" ? "Add Movie" : "Edit Movie"}
      open={showMoviesFormModel}
      onCancel={() => {
        setShowMovieFormModel(false);
        setSelectedMovie(null);
      }}
      footer={null}
      width="800px"
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedMovie}>
        <Row gutter="16">
          <Col span={24}>
            <Form.Item label="Movie Name" name="title">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Movie description" name="description">
              <textarea type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Movie duration" name="duration">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Language" name="language">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Movie release date" name="releaseDate">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Genre" name="genre">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Poster" name="poster">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end gap-1">
          <button
            className="border border-primary bg-white text-primary p-1"
            type="button"
            onClick={() => {
              setShowMovieFormModel(false);
              setSelectedMovie(null);
            }}
          >
            Cancel
          </button>
          <button className="bg-primary p-1 text-grey" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default MovieForm;
