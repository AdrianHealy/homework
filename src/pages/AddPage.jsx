import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/MainProvider";

const AddPage = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  //Чтобы перенапралять пользователя изпользуем хук useNavigate)
  const navigate = useNavigate();

  // Получаем данные из контекста
  const value = React.useContext(MainContext);
  //

  const handleSubmit = (event) => {
    event.preventDefault();

    let newContact = {
      name,
      lastname,
      phone,
      image,
      id: Date.now(),
    };

    value.addContact(newContact);
    setName("");
    setLastname("");
    setPhone("");
    setImage("");
    //Перенаправляем пользователя
    // - 1 назад на одну страницу
    // (1) вперед на одну страницу
    navigate("/");
    //
  };

  return (
    <div className="container edite-add-page">
      <h2>ADD PAGE</h2>
      <form onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="enter name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <FormControl
          type="text"
          placeholder="enter lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          value={lastname}
        />
        <FormControl
          type="number"
          placeholder="enter phone-number"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          value={phone}
        />
        <FormControl
          type="text"
          placeholder="enter image"
          onChange={(e) => {
            setImage(e.target.value);
          }}
          value={image}
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddPage;

/*
Создаем состояния с помощью хука useState
Связываем их с инпутами 
Создаем функцию handleSubmit которая убирает дефолтные настройки, в ней создаем новый обьект 
Вешаем событие onSubmit на тег Form
В файле MainProvider создаем функцию которая делает запрос на севрер 
(Создаем контекс,
  
  <MainContext.Provider value={{ addContact }}>
      {props.children}
    </MainContext.Provider>

    Получаем данные :
     const value = React.useContext(MainContext);
  
В папке helpers создаем API


  )




*/
