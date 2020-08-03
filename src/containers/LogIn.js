import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  let history = useHistory();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/logIn`,
      {
        email: email,
        password: password,
      }
    );
    setData(response.data);

    if (data.token) {
      Cookies.set("userToken", data.token);
      Cookies.set("username", data.username);
      history.push("/characters");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Hello LogIn</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={handleChangeEmail}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={handleChangePassword}
        ></input>
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
};
export default LogIn;
