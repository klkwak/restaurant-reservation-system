import React, { useState } from "react";
import { today } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();

  const initialFormState = {
    first_name: "test_f_name",
    last_name: "test_l_name",
    mobile_number: "000-000-0000",
    reservation_date: today(),
    reservation_time: "00:00",
    people: 1,
    status: "booked",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const [errorMessages, setErrorMessages] = useState([]);

  // format the reservation date
  const formatAsDateTimeInstance = () => {
    let dateParts = formData.reservation_date.split("-");

    dateParts = dateParts.map((part) => parseInt(part));

    let timeParts = formData.reservation_time.split(":");

    timeParts = timeParts.map((part) => parseInt(part, 10));

    return new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2],
      timeParts[0],
      timeParts[1],
      0,
      0
    );
  };

  // VALIDATION

  const reservationDuringValidHours = () => {
    const time = formData.reservation_time;

    const hrs = parseInt(time.split(":")[0], 10);
    const mins = parseInt(time.split(":")[1], 10);

    // must be greater than 10:30
    // must be less than 21:30

    if (
      hrs < 10 ||
      (hrs === 10 && mins < 30) ||
      hrs > 21 ||
      (hrs === 21 && mins > 30)
    ) {
      return false;
    }

    return true;
  };

  const reservationDateNotTuesday = () => {
    const date = formatAsDateTimeInstance();

    if (date.getDay() === 2) return false;

    return true;
  };

  const reservationDateNotInPast = () => {
    const date = formatAsDateTimeInstance().getTime();

    const today = new Date().getTime();

    if (date < today) return false;

    return true;
  };

  const validateForm = () => {
    const errorArr = [];

    if (!reservationDateNotTuesday()) {
      errorArr.push({
        message:
          "The restaurant is closed on Tuesdays, please choose another date!",
      });
    }
    if (!reservationDateNotInPast()) {
      errorArr.push({
        message:
          "Cannot choose a reservation date in the past. Only future reservations are allowed.",
      });
    }

    if (!reservationDuringValidHours()) {
      errorArr.push({
        message: "Must make reservation between 10:30 AM and 9:30 PM.",
      });
    }

    return errorArr;
  };

  // EVENT HANDLERS
  const handleChange = ({ target }) => {
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm();

    setErrorMessages(errors);

    if (errors.length === 0) {
      createReservation(formData)
        .then(() =>
          history.push(`/dashboard/?date=${formData.reservation_date}`)
        )
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleCancelButton = () => {
    history.goBack();
  };

  return (
    <div className="container">
      {errorMessages.map((error, index) => (
        <ErrorAlert key={index} error={error} />
      ))}
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
      </form>
    </div>
  );
}

export default NewReservation;
