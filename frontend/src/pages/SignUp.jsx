import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: name,
        email: email,
        password: password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      if (res.status === 201) {
        console.log(res.data.message);
        navigate("/signin");
      } else if (res.status === 202) {
        alert("User Allready Exists");
      } else {
        console.log(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter your full name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

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

export default SignUp;
