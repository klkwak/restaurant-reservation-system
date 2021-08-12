import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

function NewTable() {
  const history = useHistory();

  const initialFormState = { table_name: "", capacity: "" };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    createTable(formData)
      .then(() => history.push("/dashboard"))
      .catch((err) => console.error(err));
  };

  const handleCancelButton = () => {
    history.goBack();
  };

  return (
    <div className="container-fluid py-4">
      <h1>Make a new table</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="table_name">
            Table Name
            <input
              name="table_name"
              type="text"
              id="table_name"
              value={formData.table_name}
              onChange={handleChange}
              placeholder="Table Name"
              minLength="2"
              required
              className="form-control"
            ></input>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="capacity">
            Table Capacity
            <input
              name="capacity"
              type="number"
              id="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Capacity"
              min="1"
              required
              className="form-control"
            ></input>
          </label>
        </div>
        <div className="controls">
          <button className="btn btn-info mr-2" type="submit">
            Submit
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTable;
