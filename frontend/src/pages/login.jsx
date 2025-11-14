import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const AUTH_STATES = {
    LOGIN: "login",
    SIGNUP: "signup",
  };

  const [mode, setMode] = useState(AUTH_STATES.SIGNUP);

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const endpoint =
      mode === AUTH_STATES.SIGNUP
        ? "/api/user/register"
        : "/api/user/login";

    const payload =
      mode === AUTH_STATES.SIGNUP
        ? { name, email, password }
        : { email, password };

    try {
      const response = await axios.post(backendUrl + endpoint, payload);
      const data = response.data;

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Request failed";
      toast.error(msg);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-[400px] min-w-[300px]">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 gap-4 text-gray-800 bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-2">
          <p className="prata-regular text-3xl">
            {mode === AUTH_STATES.LOGIN ? "Login" : "Sign Up"}
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {/* Name only for sign up */}
        {mode === AUTH_STATES.SIGNUP && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />

        {/* Footer links */}
        <div className="w-full flex justify-between text-sm mt-[-8px]">

          {mode === AUTH_STATES.LOGIN ? (
            <p
              onClick={() => setMode(AUTH_STATES.SIGNUP)}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setMode(AUTH_STATES.LOGIN)}
              className="cursor-pointer"
            >
              Already have an account?
            </p>
          )}
        </div>

        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {mode === AUTH_STATES.LOGIN ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
