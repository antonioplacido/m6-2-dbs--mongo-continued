const { MongoClient } = require("mongodb");
const assert = require("assert");
const router = require("express").Router();
const { getSeats, bookSeats } = require("./handlers");

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

router.get("/api/seat-availability", getSeats);

const getRowName = (rowIndex) => {
  return String.fromCharCode(65 + rowIndex);
};
const randomlyBookSeats = (num) => {
  const bookedSeats = {};
  while (num > 0) {
    const row = Math.floor(Math.random() * NUM_OF_ROWS);
    const seat = Math.floor(Math.random() * SEATS_PER_ROW);
    const seatId = `${getRowName(row)}-${seat + 1}`;
    bookedSeats[seatId] = true;
    num--;
  }
  return bookedSeats;
};
let state;

router.post("/api/book-seat", bookSeats);

module.exports = router;
