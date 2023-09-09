
const mongoose = require("mongoose");
require("../config/db.config");

const Room = require('../models/room.model');

mongoose.connection
  .dropDatabase()
  .then(() => {
    Room.create([
      {
        name: "1",
        type: "doble",
        price: "12345678",
        description: "habitacion para dos",
        availabilty: true,
        image: "",
        checkIn: "",
        checkOut: ""
    
      },
      {
        name: "2",
        type: "triple",
        price: "12345678",
        description: "habitacion para tres personas",
        availabilty: false,
        image: "",
        checkIn: "2023-09-01",
        checkOut: "2023-09-03",
      },
      {
        name: "3",
        type: "suite",
        price: "12345678",
        description: "habitacion para cuatro",
        availabilty: true,
        image: "",
        checkIn: "",
        checkOut: ""
      },
    ])
  .then(() => {
      console.log("cuartos creados");
  })
  .catch(console.error); });