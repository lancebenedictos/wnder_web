import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
type loginDetails = {
  username: String;
  password: String;
  email: String;
  firstName: String;
  lastName: String;
};

function SignUpForm() {
  const dispatch = useDispatch();
  const [state, setState] = useState<loginDetails>({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const onFieldChange = (e: React.FormEvent<HTMLInputElement>) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };
  return (
    <form
      action=""
      className="flex items-center flex-col gap-3 w-screen p-3"
      onSubmit={(e) => {
        e.preventDefault();

        axios
          .post(
            "http://localhost:8080/users/signup",
            {
              ...state,
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
            dispatch(setUser(res.data.data));
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    >
      <h1 className="text-2xl font-bold">Welcome back to wnder</h1>
      <label htmlFor="username" className=" self-start">
        Username
      </label>
      <input
        name="username"
        id="username"
        placeholder="username"
        className="p-2 border-2 rounded-lg  max-w-lg w-full md:w-96"
        onChange={onFieldChange}
      />

      <label htmlFor="password" className=" self-start">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="p-2 border-2 rounded-lg  max-w-lg w-full md:w-96"
        required
        onChange={onFieldChange}
      />

      <label htmlFor="email" className=" self-start">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        className="p-2 border-2 rounded-lg  max-w-lg w-full md:w-96"
        required
        onChange={onFieldChange}
      />

      <label htmlFor="firstName" className=" self-start">
        First name
      </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First name"
        className="p-2 border-2 rounded-lg  max-w-lg w-full md:w-96"
        required
        onChange={onFieldChange}
      />

      <label htmlFor="lastName" className=" self-start">
        Last name
      </label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last name"
        className="p-2 border-2 rounded-lg  max-w-lg w-full md:w-96"
        required
        onChange={onFieldChange}
      />

      <Link to="/signup" className=" underline">
        Don't have an account? Sign up.
      </Link>

      <button className=" bg-green-500 text-white rounded-full p-2 w-36">
        Login
      </button>
    </form>
  );
}

export default SignUpForm;
