// const service = require("../../../back-end/src/reservations/reservations.service");
// const asyncErrorBoundary

import React, { useState } from "react";
import { today } from "../utils/date-time";
import axios from "axios";
import { useHistory } from "react-router-dom";

function NewReservation() {
  const history = useHistory();

  const initialFormState = {
    first_name: "test_f_name",
    last_name: "test_l_name",
    mobile_number: "000-000-0000",
    reservation_date: today(),
    reservation_time: "00:00",
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    formData.people = Number(formData.people);
    const url = "http://localhost:5000/reservations";
    const data = {
      data: formData,
    };

    axios
      .post(url, data)
      .then((response) => console.log(response))
      .catch((err) => {
        console.error(err);
      });

    history.push(`/dashboard/?date=${formData.reservation_date}`);
  };

  const handleCancelButton = () => {
    history.goBack();
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="first_name">
          <input
            name="first_name"
            type="text"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
          ></input>
        </label>
        <label htmlFor="last_name">
          <input
            name="last_name"
            type="text"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
          ></input>
        </label>
        <label htmlFor="mobile_number">
          <input
            name="mobile_number"
            type="tel"
            id="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          ></input>
        </label>
        <label htmlFor="reservation_date">
          <input
            name="reservation_date"
            type="date"
            id="reservation_date"
            value={formData.reservation_date}
            onChange={handleChange}
            placeholder="Reservation Date"
            required
          ></input>
        </label>
        <label htmlFor="reservation_time">
          <input
            name="reservation_time"
            type="time"
            id="reservation_time"
            value={formData.reservation_time}
            onChange={handleChange}
            placeholder="Reservation Time"
            required
          ></input>
        </label>
        <label htmlFor="people">
          <input
            name="people"
            type="number"
            id="people"
            value={formData.people}
            onChange={handleChange}
            placeholder="People"
            required
          ></input>
        </label>
        <div className="controls">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancelButton}>
            Cancel
          </button>
        </div>
        <div className="errors"></div>
      </form>
    </div>
  );
}

export default NewReservation;
