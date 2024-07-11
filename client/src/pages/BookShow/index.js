import { message, Modal, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetShowById } from "../../services/theatres";
import moment from "moment";
import { BookShowTickets } from "../../services/bookings";

const { Item, useForm } = Form;

function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = useState(null);
  const params = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GetShowById({
          showId: params.id,
        });
        if (response.success) {
          setShow(response.data);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    };

    getData();
  }, [params.id]);

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="seats p-2 bg-primary ">
        {Array.from(Array(rows).keys()).map((row, rowIndex) => (
          <div className="flex gap-1" key={rowIndex}>
            {Array.from(Array(columns).keys()).map((column, colIndex) => {
              const seatNumber = row * columns + column + 1;

              if (seatNumber > totalSeats) {
                return null;
              }

              let seatClass = "seat";

              if (selectedSeats.includes(seatNumber)) {
                seatClass = "selected-seat";
              } else if (show.bookedSeats.includes(seatNumber)) {
                seatClass = "booked-seat";
              }

              return (
                <div
                  className={seatClass}
                  key={colIndex}
                  onClick={() => {
                    if (selectedSeats.includes(seatNumber)) {
                      setSelectedSeats(
                        selectedSeats.filter((item) => item !== seatNumber)
                      );
                    } else {
                      setSelectedSeats([...selectedSeats, seatNumber]);
                    }
                  }}
                >
                  <h1 className="text-sm">{seatNumber}</h1>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const handleBookNow = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedSeats,
        transactionId: "MANUAL", // Assign a placeholder transaction ID or omit it
        user: user._id,
        customerName: values.name,
        customerAddress: values.address,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      {show && (
        <div className="justify-center">
          {/* Show information */}
          <div className="flex justify-between card p-1">
            <div className="p-1">
              <h1 className="text-sm">{show.theatre.name}</h1>
              <h1 className="text-sm">{show.theatre.address}</h1>
            </div>
            <div className="p-1">
              <h1 className="text-xl">
                {show.movie.title} ({show.movie.language})
              </h1>
            </div>
            <div className="p-1">
              <h1 className="text-sm">
                {moment(show.showTime).format("MMM DD yyyy")}
              </h1>
            </div>
          </div>

          {/* Display seats */}
          <center>{getSeats()}</center>

          {/* Book button */}
          <center>
            <button className="card p-1 " onClick={handleBookNow}>
              Book Now
            </button>
          </center>

          {/* Modal for booking */}
          <Modal
            title="Enter Details and Pay"
            visible={modalVisible}
            onCancel={handleModalCancel}
            footer={[
              <button
                key="back"
                className="border border-primary bg-white text-primary p-1"
                onClick={handleModalCancel}
              >
                Cancel
              </button>,
              <button
                key="submit"
                className="bg-secondary p-1 "
                type="primary"
                onClick={handleFormSubmit}
              >
                Pay Now
              </button>,
            ]}
          >
            <Form form={form} layout="vertical">
              <Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Item>
              <Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input.TextArea />
              </Item>
              <Item label="Total Price">
                <span>{`${
                  selectedSeats.length * show.ticketPrice
                } rupees`}</span>
              </Item>
            </Form>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default BookShow;
