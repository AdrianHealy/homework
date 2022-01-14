import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import Navibar from "./components/Navibar";
import MainProvider from "./context/MainProvider";

const MyRoutes = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edite/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
};

export default MyRoutes;
