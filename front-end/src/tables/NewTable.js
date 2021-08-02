import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// TO DO:
// submit button will save the new table and display /dashboard page

function NewTable() {
  const history = useHistory();

  // Do I need this?
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

    const url = "http://localhost:5000/tables";
    const data = {
      data: formData,
    };

    axios
      .post(url, data)
      .then(() => history.push("/dashboard"))
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancelButton = () => {
    history.goBack();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="table_name">
          <input
            name="table_name"
            type="text"
            id="table_name"
            value={formData.table_name}
            onChange={handleChange}
            placeholder="Table Name"
            minLength="2"
            required
          ></input>
        </label>
        <label htmlFor="capacity">
          <input
            name="capacity"
            type="number"
            id="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            min="1"
            required
          ></input>
        </label>
        <div className="controls">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTable;
