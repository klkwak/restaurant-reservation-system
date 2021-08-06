import React, { useState } from "react";
import { updateReservationStatus } from "../utils/api";

function ReservationItem({ reservation }) {
  // let {
  //   reservation_time,
  //   people,
  //   first_name,
  //   last_name,
  //   mobile_number,
  //   reservation_id,
  //   status,
  // } = reservation;

  // const [status, setStatus] = useState(reservation.status);

  let { status } = reservation;

  const handleSeatButton = () => {
    const abortController = new AbortController();

    const data = { status: "seated" };

    updateReservationStatus(
      reservation.reservation_id,
      data,
      abortController.signal
    );

    return () => abortController.abort();
  };

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between pt-2">
        <div className="px-3 border-right">
          <h3>{reservation.reservation_time}</h3>
        </div>
        <div className="px-3">
          <h3>
            <span className="badge badge-pill badge-primary mr-2">
              {reservation.people}
            </span>
            {reservation.first_name} {reservation.last_name}
          </h3>
          <h5>Phone Number: {reservation.mobile_number}</h5>
        </div>
      </div>
      <h4
        className="d-flex justify-content-center my-4 border rounded"
        data-reservation-id-status={reservation.reservation_id}
      >
        Status: {status}
      </h4>
      {status === "booked" && (
        <div className="d-flex justify-content-center my-2">
          <a
            href={`/reservations/${reservation.reservation_id}/seat`}
            className="btn btn-info"
            role="button"
            onClick={handleSeatButton}
          >
            Seat
          </a>
        </div>
      )}
    </li>
  );
}

export default ReservationItem;
