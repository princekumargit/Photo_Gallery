import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: email,
        password: password,
      };

      const res = await axios.post("http://localhost:5000/api/login", formData);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        console.log(res.data.message);
      } else if (res.status === 205) {
        alert("User Not Found");
      } else if (res.status === 206) {
        alert("Invalid Password");
      } else {
        console.log(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form className="signin-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="pass">Password</label>
        <input
          name="pass"
          type="password"
          placeholder="Enter new password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
