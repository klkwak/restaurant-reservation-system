import React from "react";

function TableItem({ table, handleFinishButton }) {
  let tableStatus = "Free";
  let button;

  if (table.reservation_id) {
    tableStatus = "Occupied";
    button = (
      <button
        className="btn btn-danger"
        onClick={() => handleFinishButton(table)}
        data-table-id-finish={table.table_id}
      >
        Finish
      </button>
    );
  }

  return (
    <li className="list-group-item d-flex">
      <div className="d-flex justify-content-between pt-2">
        <div className="px-3 border-right">
          <h3>{table.table_name}</h3>
        </div>
        <div className="px-3">
          <h4 data-table-id-status={table.table_id}>{tableStatus}</h4>
        </div>
      </div>
      {button}
    </li>
  );
}

export default TableItem;
