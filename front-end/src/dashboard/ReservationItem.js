import React from "react";

function ReservationItem({ reservation, handleCancelButton }) {
  if (reservation.status === "finished") return <></>;

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
        Status: {reservation.status}
      </h4>
      <div className="d-flex justify-content-center my-2">
        <a
          href={`/reservations/${reservation.reservation_id}/edit`}
          className="btn btn-info mx-1"
          role="button"
        >
          Edit
        </a>
        <button
          type="button"
          className="btn btn-danger mx-1"
          data-reservation-id-cancel={reservation.reservation_id}
          onClick={() => handleCancelButton(reservation)}
        >
          Cancel
        </button>
        {reservation.status === "booked" && (
          <a
            href={`/reservations/${reservation.reservation_id}/seat`}
            className="btn btn-success mx-1"
            role="button"
          >
            Seat
          </a>
        )}
      </div>
    </li>
  );
}

export default ReservationItem;
