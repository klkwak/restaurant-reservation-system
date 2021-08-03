import React from "react";

function TableItem({ table }) {
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between pt-2">
        <div className="px-3 border-right">
          <h3>{table.table_name}</h3>
        </div>
        <div className="px-3">
          {/* CHANGE THIS depending on state */}
          <h4 data-table-id-status={table.table_id}>Free / Occupied</h4>
        </div>
      </div>
    </li>
  );
}

export default TableItem;
