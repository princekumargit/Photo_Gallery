import React, { useEffect, useState } from "react";
import Navbar from "./componenets/Navbar";
import Button from "./componenets/Button";
import Grid from "./componenets/Grid";
import axios from "axios";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get")
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);
  return (
    <div className="body">
      <Navbar />
      <Grid photos={photos} setUpdateUI = {setUpdateUI} />
      <Button setUpdateUI={setUpdateUI} />
    </div>
  );
};

export default App;
