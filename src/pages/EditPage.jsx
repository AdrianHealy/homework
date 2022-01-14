import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../context/MainProvider";

const EditPage = () => {
  //Получили данные из контекста
  const value = React.useContext(MainContext);
  //
  // Диструктуризуем данные
  const { contactToEdite } = value;
  //
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  // С помощью этого хука получаем ID
  const params = useParams();
  //

  //
  useEffect(() => {
    value.getProductToEdite(params.id);
  }, []);

  useEffect(() => {
    if (contactToEdite) {
      setName(contactToEdite.name);
      setLastname(contactToEdite.lastname);
      setPhone(contactToEdite.phone);
      setImage(contactToEdite.image);
    }
  }, [contactToEdite]);

  // Формируем обьект для отрпавки на сервер

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    let editedContact = {
      name,
      lastname,
      phone,
      image,
      id: contactToEdite.id,
    };
    value.saveEditedContact(editedContact);
    navigate("/");
  };

  //Проверка
  if (!contactToEdite) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="container edite-add-page">
      <h2>EDITE PAGE</h2>
      <form onSubmit={handleSubmit}>
        <FormControl
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          value={name}
        />
        <FormControl
          onChange={(e) => setLastname(e.target.value)}
          type="text"
          placeholder="Lastname"
          value={lastname}
        />
        <FormControl
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          placeholder="Phone"
          value={phone}
        />
        <FormControl
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Image"
          value={image}
        />
        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
};

export default EditPage;

/*
Последний шаг 
Нужно сформировать новый обьект и отправить его на сервер
*/
