import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Purchases from "./components/Purchases";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import Edit from "./components/Edit";
import EditForm from "./components/EditForm";

const App = () => {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/" && location.pathname !== "/welcome";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {shouldShowNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<ProtectedRoute> <Welcome /> </ProtectedRoute>} />
          <Route path="/view" element={<ProtectedRoute> <Purchases /> </ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute> <Add /> </ProtectedRoute>} />
          <Route path="/edit" element={<ProtectedRoute> <Edit /> </ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute> <EditForm /> </ProtectedRoute>} />
        </Routes>

    </>
  );
}

export default App;