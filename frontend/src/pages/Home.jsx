import React, { useEffect, useState } from "react";
import Navbar from "../componenets/Navbar";
import Button from "../componenets/Button";
import Grid from "../componenets/Grid";
import axios from "axios";

const Home = () => {
  const [token, setToken] = useState("");
  const [islogin, setIslogin] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const t = localStorage.getItem("token");
      setToken(t);
      setIslogin(true);
    }
  }, []);

  // console.log(islogin);

  useEffect(() => {
    // console.log(`Bearer ${token}`);
    axios
      .get("http://localhost:5000/api/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // if (res.status === 402) {
        //   localStorage.setItem("token", "");
        //   window.location.reload();
        // }
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 402) {
          // Token is not valid or expired
          // localStorage.setItem("token", "");
          localStorage.clear();
          window.location.reload();
        }
        console.log(err);
      });
  }, [updateUI, islogin]);
  return (
    <div className="body">
      <Navbar islogin={islogin} />
      {islogin && <Grid photos={photos} setUpdateUI={setUpdateUI} />}
      {islogin && <Button setUpdateUI={setUpdateUI} token={token} />}
    </div>
  );
};

export default Home;
