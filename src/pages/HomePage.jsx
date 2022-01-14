import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MainContext } from "../context/MainProvider";
import DeleteIcon from "../images/delete.png";

const HomePage = () => {
  // Получаем данные из контекста
  const value = React.useContext(MainContext);
  useEffect(() => {
    value.getContact();
  }, []);
  console.log(value);

  if (!value.contacts) {
    return <h2>Loading</h2>;
  }
  return (
    <div className="container">
      <h2>HOME PAGE</h2>
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>LastName</th>
            <th>Phone number</th>
            <th>Image</th>
            <th>#</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {value.contacts.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.lastname}</td>
              <td>{item.phone}</td>
              <td>
                <img style={{ width: "50px" }} src={item.image} alt="photo" />
              </td>
              <td>
                <Button
                  variant="inherit"
                  onClick={() => value.deleteContact(item.id)}
                >
                  <img src={DeleteIcon} alt="#" />
                </Button>
              </td>
              <td>
                <Button variant="warning">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/edite/${item.id}`}
                  >
                    EDITE
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
