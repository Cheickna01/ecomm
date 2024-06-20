import Title from "./TitleComponents";
import React, { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4002/login", {
        email,
        mot_de_passe: password,
      });
      setToken(response.data.token);
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <div>
      <Title name={"Connectez"} title={"Vous"} />
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            className="block m-auto w-[400px] rounded h-[35px]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            className="block m-auto w-[400px] rounded h-[35px]"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
