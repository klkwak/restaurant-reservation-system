import React from "react";

function ReservationItem({ reservation }) {
  const {
    reservation_time,
    people,
    first_name,
    last_name,
    mobile_number,
    reservation_id,
  } = reservation;

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between pt-2">
        <div className="px-3 border-right">
          <h3>{reservation_time}</h3>
        </div>
        <div className="px-3">
          <h3>
            <span className="badge badge-pill badge-primary mr-2">
              {people}
            </span>
            {first_name} {last_name}
            {/* <span className="badge badge-pill badge-primary">
              {reservation.people}
            </span> */}
          </h3>
          {/* <h5>Party Size: {reservation.people}</h5> */}
          <h5>Phone Number: {mobile_number}</h5>
        </div>
      </div>
      <div className="d-flex justify-content-center my-2">
        <a
          href={`/reservations/${reservation_id}/seat`}
          className="btn btn-info"
          role="button"
        >
          Seat
        </a>
      </div>
    </li>
  );
}

export default ReservationItem;
