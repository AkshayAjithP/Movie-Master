import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Table, Row, Col, message } from "antd";
import { useSelector } from "react-redux";
import { GetBookingOfUser } from "../../../services/bookings";
import moment from "moment";
function Booking() {
  const navigate = useNavigate();
  const [bookings = [], setBookings] = useState([]);
  const getData = async () => {
    try {
      const response = await GetBookingOfUser();
      if (response.success) {
        setBookings(response.data);
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
      <Row gutter={[16, 16]}>
        {bookings.map((booking) => (
          <Col span={12}>
            <div className="card p-2 flex justify-between">
              <div>
                <h1 className="text-xl">
                  {booking.show.movie.title}({booking.show.movie.language})
                </h1>

                <h1 className="text-sm">
                  {booking.show.theatre.name}({booking.show.theatre.address})
                </h1>
                <h1 className="text-sm">
                  Date&Time:{moment(booking.show.date).format("MM Do YYYY")}-
                  {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                </h1>
                <h1 className="text-sm">
                  {booking.show.ticketPrice * booking.seats.length} rupees
                </h1>
                <h1 className="text-sm">Booking ID: {booking._id}</h1>
              </div>
              <div>
                <img
                  src={booking.show.movie.poster}
                  alt=""
                  height={152}
                  className="br-1"
                />
                <h1 className="text-sm">Seats: {booking.seats.join(",")}</h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Booking;
