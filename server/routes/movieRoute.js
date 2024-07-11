const router = require("express").Router();
const Movie = require("../models/movieModel");
const authMiddleware = require("../middlewares/authMiddleware");

//add a new  movie

router.post("/add-movie", authMiddleware, async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "Movie added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all movies route

router.get("/get-all-movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send({
      success: true,
      message: "movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//update movie

router.post("/update-movie", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
      success: true,
      message: "Movie updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;

//delete movie

router.post("/delete-movie", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    res.send({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get movie by id

router.get("/get-all-movie-by-id/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      message: "Movie fetched successfully",
      data: movie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
