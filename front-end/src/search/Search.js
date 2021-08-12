import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationItem from "../dashboard/ReservationItem";
import "./Search.css";

function Search() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservations, setReservations] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    listReservations(
      { mobile_number: phoneNumber },
      abortController.signal
    ).then(setReservations);
    return () => abortController.abort();
  };

  const handleChange = ({ target }) => {
    setPhoneNumber(target.value);
  };

  return (
    <div className="container-fluid py-4">
      <div>
        <h1 className="py-2">Search reservations by phone number</h1>
        <form className="py-2 d-flex" onSubmit={handleFormSubmit}>
          <div>
            <label className="mobile_number_label" htmlFor="mobile_number">
              <input
                name="mobile_number"
                type="tel"
                id="mobile_number_search"
                placeholder="Enter a customer's phone number"
                value={phoneNumber}
                onChange={handleChange}
                required
                className="form-control"
              ></input>
            </label>
          </div>
          <button className="btn btn-secondary mx-2 px-4" type="submit">
            Find
          </button>
        </form>
      </div>
      <div className="py-2">
        {reservations.length > 0 ? (
          <ul className="list-group my-2">
            {reservations.map((reservation) => (
              <ReservationItem
                key={reservation.reservation_id}
                reservation={reservation}
              />
            ))}
          </ul>
        ) : (
          <div className="alert alert-secondary w-50" role="alert">
            No reservations found
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
