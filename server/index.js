const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const userRoutes = require("./routes/usersRoute");
const movieRoutes = require("./routes/movieRoute");
const theatresRoute = require("./routes/theatreRoute");
const bookingRoute = require("./routes/bookingsRoute");
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatresRoute);
app.use("/api/bookings", bookingRoute);
const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`node Js server is running on port ${port}`)
);
