import React, { useState, useEffect } from "react";
import axios from "axios";

const Grid = ({ photos, setUpdateUI }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);
  const handleDelete = async (id) => {
    console.log(token);
    try {
      console.log(id);
      const res = await axios.delete(`http://localhost:5000/api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header with 'Bearer' and your token
        },
      });
      setUpdateUI((prev) => !prev); // Trigger UI update
    } catch (error) {
      console.error(error, "gggggg");
    }
  };

  return (
    <>
      <h1>My Gallery</h1>
      <div className="grid">
        {photos.map(({ photo, _id }) => (
          <div key={_id} className="grid__item">
            <img
              src={`http://localhost:5000/uploads/${photo}`}
              alt="grid_image"
            />
            <button onClick={() => handleDelete(_id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
