import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Button = ({ setUpdateUI, token }) => {
  const handleChange = (e) => {
    e.preventDefault();
    const decodedToken = jwtDecode(token);
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    formData.append("userId", decodedToken.userId);

    axios
      .post("http://localhost:5000/api/save", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header with 'Bearer' and your token
        },
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data.message);
          alert("Invalid File Type");
        }
        console.log(res.data);
        setUpdateUI(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <label className="button" htmlFor="file_picker">
      <AiFillPlusCircle />
      <input
        type="file"
        name="file_picker"
        id="file_picker"
        hidden
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};

export default Button;
