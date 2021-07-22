import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const query = useQuery();
  let date = query.get("date");

  if (!date) {
    date = today();
  }

  const history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [reservation_date, setReservationDate] = useState(date);

  useEffect(loadDashboard, [reservation_date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: reservation_date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const mapped = reservations.map((reservation) => (
    <div key={reservation.reservation_id}>
      <h2>
        {reservation.first_name} {reservation.last_name}
      </h2>
      <h4>Phone Number: {reservation.mobile_number}</h4>
      <h4>Reservation Time: {reservation.reservation_time}</h4>
      <h4>Number of people: {reservation.people}</h4>
    </div>
  ));

  const handleNextButton = () => {
    setReservationDate(next(reservation_date));
    history.push(`/dashboard/?date=${next(reservation_date)}`);
  };

  const handlePreviousButton = () => {
    setReservationDate(previous(reservation_date));
    history.push(`/dashboard/?date=${previous(reservation_date)}`);
  };

  const handleTodayButton = () => {
    setReservationDate(today());
    history.push(`/dashboard`);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
      {mapped}
      <div className="controls">
        <button type="button" onClick={handleNextButton}>
          Next
        </button>
        <button type="button" onClick={handlePreviousButton}>
          Previous
        </button>
        <button type="button" onClick={handleTodayButton}>
          Today
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
