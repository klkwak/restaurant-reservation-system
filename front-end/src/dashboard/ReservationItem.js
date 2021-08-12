import React from "react";

function ReservationItem({ reservation, handleCancelButton }) {
  if (reservation.status === "finished") return <></>;

  return (
    <li className="list-group-item">
      <div className="d-flex pt-2">
        <div className="px-3 border-right">
          <h3>{reservation.reservation_time}</h3>
        </div>
        <div className="px-3">
          <h4>
            <span className="badge badge-pill badge-info mr-2">
              {reservation.people}
            </span>
            {reservation.first_name} {reservation.last_name}
          </h4>
          <h5>
            <i className="bi bi-telephone-fill text-secondary pr-1"></i>
            {reservation.mobile_number}
          </h5>
        </div>
      </div>
      <p
        className="text-center pt-3 pb-2"
        data-reservation-id-status={reservation.reservation_id}
      >
        Status: <strong>{reservation.status}</strong>
      </p>
      <div className="d-flex justify-content-center my-2">
        <button
          type="button"
          className="btn btn-outline-danger mx-1"
          data-reservation-id-cancel={reservation.reservation_id}
          onClick={() => handleCancelButton(reservation)}
        >
          Cancel
        </button>
        <a
          href={`/reservations/${reservation.reservation_id}/edit`}
          className="btn btn-outline-primary mx-1"
          role="button"
        >
          Edit
        </a>
        {reservation.status === "booked" && (
          <a
            href={`/reservations/${reservation.reservation_id}/seat`}
            className="btn btn-outline-success mx-1"
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
