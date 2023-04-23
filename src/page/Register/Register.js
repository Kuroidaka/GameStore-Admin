import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "../redux/actions";
import { useHistory } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  const { displayName, email, password, passwordConfirm } = state;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return;
    }
    dispatch(registerInitiate(email, password, displayName));
    setState({ displayName: "", email: "", password: "", passwordConfirm: "" });
  };

  return (
    <div>
      <div id="register-form">
        <form className="form-signup" onSubmit={handleSubmit}>
          <h1
            className="h3 mb-3 font-weight-normal"
            style={{ textAlign: "center" }}
          >
            {" "}
            Sign up
          </h1>

          <input
            type="text"
            id="user-name"
            className="form-control"
            placeholder="Full name"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="user-email"
            className="form-control"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="user-pass"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="user-repeatpass"
            className="form-control"
            placeholder="Repeat Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary btn-block" type="submit">
            Sign Up
          </button>
           <a href="/login">Already registered? Sign in</a>
        </form>
        <br />
      </div>
    </div>
  );
};

export default Register;
