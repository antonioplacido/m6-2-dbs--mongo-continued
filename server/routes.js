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

// const batchImport = async () => {
//   try {
//     const client = await MongoClient(MONGO_URI, options);

//     await client.connect();

//     const db = client.db("workshop_6");

//     const r = await db.collection("seats").insertMany(exportSeats);

//     assert.equal(1, r.insertedCount);

//     client.close();
//   } catch ({ message }) {
//     console.log(message);
//   }
// };

// batchImport();

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

let lastBookingAttemptSucceeded = false;

router.post("/api/book-seat", bookSeats);
module.exports = router;
