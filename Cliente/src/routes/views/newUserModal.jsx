/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
  // States for user information
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userLevel, setUserLevel] = useState("user");
  const [email, setEmail] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [pwd, setPassword] = useState("");

  // Submit the form and create a new user
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:3001/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName,
          fullName,
          userLevel,
          email,
          jobRole,
          pwd,
        }),
      });

      if (response.ok) {
        onClose();
        onUserCreated();
        // Clear the form by resetting the state variables
        setUserName("");
        setFullName("");
        setUserLevel("user");
        setEmail("");
        setJobRole("");
        setPassword("");
      } else {
        console.error("Failed to create user:", response.statusText);
      }
    } catch (error) {
      console.error("Error when trying to create user:", error);
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <form
        action=""
        className="criar-projeto-modal"
        onSubmit={(e) => handleModalSubmit(e)}
      >
        <label id="modalLabel">Nome de Usuário:</label>
        <input
          id="modalInput"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label id="modalLabel">Nome Completo:</label>
        <input
          id="modalInput"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label id="modalLabel">Nível de Usuário:</label>
        <select
          id="modalInput"
          value={userLevel}
          onChange={(e) => setUserLevel(e.target.value)}
        >
          <option value="user">Usuário</option>
          <option value="admin">Admin</option>
        </select>

        <label id="modalLabel">E-mail:</label>
        <input
          id="modalInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label id="modalLabel">Função no Trabalho:</label>
        <input
          id="modalInput"
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          required
        />

        <label id="modalLabel">Senha:</label>
        <input
          id="modalInput"
          type="password"
          value={pwd}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div id="modalButtons">
          <button id="modalCancelar" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button id="modalAdicionar" type="submit">
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserModal;
