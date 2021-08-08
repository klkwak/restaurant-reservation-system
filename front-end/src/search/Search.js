import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationItem from "../dashboard/ReservationItem";

function Search() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservations, setReservations] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("finding", phoneNumber);

    const abortController = new AbortController();
    // display No reservations found if there are no records found after clicking the Find button.
    listReservations(
      { mobile_phone: phoneNumber },
      abortController.signal
    ).then(setReservations);
    return () => abortController.abort();
  };

  const handleChange = ({ target }) => {
    setPhoneNumber(target.value);
  };

  return (
    <div>
      <div>
        <h1>Search reservations by phone number</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="mobile_number">
            <input
              name="mobile_number"
              type="tel"
              id="mobile_number"
              placeholder="Enter a customer's phone number"
              value={phoneNumber}
              onChange={handleChange}
              required
            ></input>
          </label>
          <button type="submit">Find</button>
        </form>
      </div>
      <div>
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
          <h2>No reservations found</h2>
        )}
      </div>
    </div>
  );
}

export default Search;
