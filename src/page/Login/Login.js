import React, { useState, useEffect } from "react";
import {
  fbSignInInitiate,
  googleSignInInitiate,
  loginInitiate,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "./Login.css";
import { FaFacebook } from 'react-icons/fa';
import { FaGooglePlusG } from 'react-icons/fa';
import { FaSignInAlt } from 'react-icons/fa';


const Login = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginInitiate(email, password));
    setState({ email: "", password: "" });
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
  };

  const handleFBSignIn = () => {
    dispatch(fbSignInInitiate());
  };
  return (
    <div>
      <div id="logreg-forms">
        <form className="form-signin" onSubmit={handleSubmit}>
          <h1
            className="h3 mb-3 font-weight-normal"
            style={{ textAlign: "center" }}
          >
            {" "}
            Sign in
          </h1>
          <div className="social-login">
            <button
              className="btn google-btn social-btn"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <span>
                <FaGooglePlusG/> Sign in with Google+
              </span>{" "}
            </button>
            <button
              className="btn facebook-btn social-btn"
              type="button"
              onClick={handleFBSignIn}
            >
              <span>
                <FaFacebook/> Sign in with Facebook
              </span>{" "}
            </button>
          </div>
          <p style={{ textAlign: "center" }}> OR </p>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={email}
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />

          <button className="btn btn-secondary btn-block" type="submit">
            <FaSignInAlt/> Sign in
          </button>
          <hr />
          <p>Don't have an account!</p>
          <Link to="/register">
            <button
              className="btn btn-primary btn-block"
              type="button"
              id="btn-signup"
            >
              Sign up New Account
            </button>
          </Link>
        </form>

        <br />
      </div>
    </div>
  );
};

export default Login;
