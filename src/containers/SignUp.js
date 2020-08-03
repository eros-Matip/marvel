import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const LogIn = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [data, setData] = useState({});

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/signUp`,
      {
        email: email,
        username: username,
        phone: phone,
        password: password,
        passwordConfirm: passwordConfirm,
      }
    );
    setData(response.data);
    console.log("data->", data);
    if (data.token) {
      Cookies.set("userToken", data.token);
      Cookies.set("username", data.username);
      history.push("/characters");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Hello SignUp</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={handleChangeEmail}
        ></input>
        <input
          type="text"
          placeholder="username"
          onChange={handleChangeUsername}
        ></input>
        <input
          type="number"
          placeholder="phone"
          onChange={handleChangePhone}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={handleChangePassword}
        ></input>
        <input
          type="password"
          placeholder="PasswordConfirm"
          onChange={handleChangePasswordConfirm}
        ></input>
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
};
export default LogIn;
