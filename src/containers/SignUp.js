import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const SignUp = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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

    if (response.data) {
      Cookies.set("userToken", response.data.token);
      Cookies.set("username", response.data.account.username);
      history.push("/characters");
    }
  };

  return (
    <div className="box-signIn">
      <form className="form-logIn" onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <input
          className="input-signIn"
          type="email"
          placeholder="Email"
          onChange={handleChangeEmail}
        ></input>
        <input
          className="input-signIn"
          type="text"
          placeholder="username"
          onChange={handleChangeUsername}
        ></input>
        <input
          className="input-signIn"
          type="number"
          placeholder="phone"
          onChange={handleChangePhone}
        ></input>
        <div className="input-password">
          <input
            className="input-signIn"
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
          ></input>
          <input
            className="input-signIn"
            type="password"
            placeholder="PasswordConfirm"
            onChange={handleChangePasswordConfirm}
          ></input>
        </div>

        <button className="btn-signInSubmit" type="submit">
          LogIn
        </button>
      </form>
    </div>
  );
};
export default SignUp;
