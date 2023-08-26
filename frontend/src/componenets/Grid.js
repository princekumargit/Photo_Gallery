import React from "react";
import axios from "axios";

const Grid = ({ photos, setUpdateUI }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      setUpdateUI((prev) => !prev); // Trigger UI update
    } catch (error) {
      console.error(error);
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
