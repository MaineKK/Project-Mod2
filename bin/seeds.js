
const mongoose = require("mongoose");
require("../config/db.config");

const Room = require('../models/room.model');

mongoose.connection
  .dropDatabase()
  .then(() => {
    Room.create([
      {
        name: "Estandar",
        type: "doble",
        price: "70€",
        description: "habitacion para dos personas ",
        availabilty: true,
        image: "",
        checkIn: "",
        checkOut: ""
    
      },
      {
        name: "Familiar",
        type: "Triple",
        price: "120",
        description: "habitacion para tres personas",
        availabilty: true,
        image: "",
        checkIn: "",
        checkOut: "",
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