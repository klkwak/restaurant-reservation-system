import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  listReservations,
  listTables,
  deleteTableAssignment,
  updateReservationStatus,
} from "../utils/api";
import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationItem from "./ReservationItem";
import TableItem from "./TableItem";
import ErrorAlert from "../layout/ErrorAlert";
import "./Dashboard.css";

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
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [reservation_date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: reservation_date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }

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

  const handleFinishButton = (table) => {
    const abortController = new AbortController();
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      deleteTableAssignment(table.table_id, abortController.signal)
        .then(() => listTables(abortController.signal))
        .then(setTables)
        .then(() =>
          listReservations({ date: reservation_date }, abortController.signal)
        )
        .then(setReservations)
        .catch(setReservationsError);
    }
    return () => abortController.abort();
  };

  const handleCancelButton = (reservation) => {
    const abortController = new AbortController();
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const reservationStatus = {
        status: "cancelled",
      };

      updateReservationStatus(
        reservation.reservation_id,
        reservationStatus,
        abortController.signal
      )
        .then(() =>
          listReservations({ date: reservation_date }, abortController.signal)
        )
        .then(setReservations)
        .catch(setReservationsError);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <div className="d-flex flex-column justify-content-around py-4">
        <h1 className="text-center">Dashboard</h1>
        <div className="date-div pt-1">
          <h2 className="text-center">{reservation_date}</h2>
        </div>
        <div className="reservations-tables-div d-flex row justify-content-between px-5 py-5">
          <div className="col">
            <div className="d-md-flex justify-content-center mb-3">
              <h3 className="mb-0">Reservations</h3>
            </div>
            <ErrorAlert error={reservationsError} />
            <ul className="list-group my-2">
              {reservations.map((reservation) => (
                <ReservationItem
                  key={reservation.reservation_id}
                  reservation={reservation}
                  handleCancelButton={handleCancelButton}
                />
              ))}
            </ul>
          </div>
          <div className="col">
            <div className="d-md-flex justify-content-center mb-3">
              <h3 className="mb-0">Tables</h3>
            </div>
            <ul className="list-group my-2">
              {tables.map((table) => (
                <TableItem
                  key={table.table_id}
                  table={table}
                  handleFinishButton={handleFinishButton}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={handlePreviousButton}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={handleTodayButton}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={handleNextButton}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
