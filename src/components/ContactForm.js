import React, { useState, useEffect } from "react";

const ContactForm = ({ saveValue, selectObj }) => {
  const [values, setValues] = useState({});
  const initialFieldValue = {
    name: "",
    city: "",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveValue(values);
    setValues(initialFieldValue);
  };
  useEffect(() => {
    if (selectObj === "") setValues(initialFieldValue);
    else setValues({ name: selectObj.name, city: selectObj.city });
  }, [selectObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          type="text"
          placeholder="Full Name"
          value={values.name}
          name="name"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-address-card"></i>
          </div>
        </div>
        <input
          type="text"
          placeholder="City"
          value={values.city}
          name="city"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value={selectObj == "" ? "Add Contact" : "Update Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
