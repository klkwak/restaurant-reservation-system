import React from "react";
import "./TableItem.css";

function TableItem({ table, handleFinishButton }) {
  let tableStatus = "Free";
  let button;

  if (table.reservation_id) {
    tableStatus = "Occupied";
    button = (
      <button
        className="btn btn-outline-danger finish-button my-2"
        onClick={() => handleFinishButton(table)}
        data-table-id-finish={table.table_id}
      >
        Finish
      </button>
    );
  }

  return (
    <li className="list-group-item d-flex flex-column">
      <div className="p-2">
        <h3 className="text-center">{table.table_name}</h3>
      </div>
      <p className="p-2 text-center">
        Capacity: <strong>{table.capacity}</strong>
      </p>
      <p className="p-2 text-center" data-table-id-status={table.table_id}>
        Status: <strong>{tableStatus}</strong>
      </p>
      {button}
    </li>
  );
}

export default TableItem;
