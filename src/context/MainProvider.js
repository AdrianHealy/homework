import axios from "axios";
import React, { useReducer } from "react";
import { toast } from "react-toastify";
import { API } from "../helpers/const";

export const MainContext = React.createContext();

//!
const INIT_STATE = {
  contactToEdite: null,
  contacts: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "GET_PRODUCT_TO_EDITE":
      return { ...state, contactToEdite: action.payload };
    default:
      return state;
  }
};
//!

const MainProvider = (props) => {
  // Создаем общее состояние
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //

  // Отправка данных на сервер
  //!
  const addContact = async (newContact) => {
    try {
      await axios.post(API, newContact);
      getContact();
      toast.success("Успешно добавлено!");
    } catch (error) {
      console.log(error);
    }
  };
  // Функция получения данных с сервера
  const getContact = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_CONTACTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  //! Удаления данных
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      //Чтобы получить обновленые данные
      getContact();
      toast.success("Успешно удалено!");
      //
    } catch (error) {
      console.log(error);
      toast.error("Нет доступа!");
    }
  };

  //! Функционал Edite
  // Первая часть, чтобы стянуть данные и подставить в интпуты!

  const getProductToEdite = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_PRODUCT_TO_EDITE",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  //! Второая часть функционала Edite

  const saveEditedContact = async (editedContact) => {
    try {
      await axios.patch(`${API}/${editedContact.id}`, editedContact);
    } catch (error) {
      console.log(error);
    }
    getContact();
  };

  //!

  return (
    <MainContext.Provider
      value={{
        addContact,
        getContact,
        deleteContact,
        getProductToEdite,
        saveEditedContact,
        contacts: state.contacts,
        contactToEdite: state.contactToEdite,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainProvider;

/*
dispatch передаем action / dispatch за собой вызывает функцию reducer и передает туда первым аргументом state а вторым action/
*/
