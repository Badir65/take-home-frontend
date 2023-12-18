import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { showToastMessage } from "../util";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./login.css";
import Loading from "../loading/Loading";
const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repPasswordRef = useRef(null);
  const loginNameRef = useRef(null);
  const loginPassRef = useRef(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const toSignIn = () => {
    containerRef.current?.classList.remove("right-panel-active");
  };

  const toSignUp = () => {
    containerRef.current?.classList.add("right-panel-active");
  };

  const register = async () => {
    await axios
      .post(
        apiUrl + "/register",
        {
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          password_confirmation: repPasswordRef.current?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (res) => {
          showToastMessage("success", res.data.message);
        },
        (err) => {
          showToastMessage("error", err.response.data.message);
        }
      );
  };

  const login = async (e) => {
    setLoading(true);
    e.preventDefault();

    axios
      .post(apiUrl + "/login", {
        name: loginNameRef.current?.value,
        password: loginPassRef.current?.value,
      })
      .then(
        (res) => {
          localStorage.setItem("token", "Bearer " + res.data?.token);
          navigate("/news");
          setLoading(false);
        },
        (err) => {
          showToastMessage("error", "The login process failed");
          setLoading(false);
        }
      );
  };

  return (
    <div ref={containerRef} className="containerLogin" id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>

          <span>or use your email for registration</span>
          <input type="text" ref={nameRef} placeholder="Name" />
          <input type="email" ref={emailRef} placeholder="Email" />
          <input type="password" ref={passwordRef} placeholder="Password" />
          <input
            type="password"
            ref={repPasswordRef}
            placeholder="Repeat password"
          />
          <button onClick={register}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={login}>
          <h1>Sign in</h1>

          <span>or use your account</span>
          <input type="text" ref={loginNameRef} placeholder="Name" />
          <input type="password" ref={loginPassRef} placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button onClick={toSignIn} className="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start reading the latest news</p>
            <button onClick={toSignUp} className="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
      {loading && <Loading />}
    </div>
  );
};

export default Login;
