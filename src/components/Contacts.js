import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { db } from "../firebase";

const Contacts = () => {
  const [contactObj, setContactObj] = useState([]);
  const [selectObj, setSelectObj] = useState("");
  useEffect(() => {
    const unsub = db.collection("cafes").onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setContactObj(documents);
    });
    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, []);

  const saveValue = (obj) => {
    if (selectObj === "") addValue(obj);
    else updateValue(selectObj.id, obj);
  };

  const addValue = (obj) => {
    db.collection("cafes")
      .add(obj)
      .then(() => {
        console.log("Data successfully added!");
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
      });
  };
  const updateValue = (id, obj) => {
    db.collection("cafes").doc(id).update(obj);
  };
  const deleteValue = (id) => {
    db.collection("cafes").doc(id).delete();
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-3 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForm {...{ saveValue, selectObj }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless">
            <thead className="thead-light">
              <tr>
                <th>Name of Cafe</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contactObj.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.city}</td>
                  <td>
                    <a className="btn">
                      <i
                        className="fas fa-pencil-alt"
                        onClick={() => setSelectObj(contact)}
                      ></i>
                    </a>
                    <a className="btn">
                      <i
                        className="text-danger far fa-trash-alt"
                        onClick={() => deleteValue(contact.id)}
                      ></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
