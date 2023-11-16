const { Router } = require("express");
const uploadMiddleware = require("../middlewares/multerMiddleware");
const uploadModel = require("../models/uploadModel");
const userModel = require("../models/userModel");
const router = Router();
const path = require("path");
const fs = require("fs");
const { handleauth } = require("../middlewares/authentication");
const jwt = require("jsonwebtoken");

router.get("/api/get", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader.substring(7);

    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    try {
      const decodedToken = jwt.verify(token, process.env.KEY);
      console.log("Token decoded:", decodedToken);

      const userId = decodedToken.userId;

      // Find the user based on userId
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find all uploads by the authenticated user
      const userUploads = await uploadModel
        .find({ uploadedby: userId })
        .sort({ createdAt: "descending" });

      res.send(userUploads);
    } catch (err) {
      console.error("Token verification failed:", err.message);
      res.status(402).json({ message: "Token not valid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/api/save",
  handleauth,
  uploadMiddleware.single("photo"),
  async (req, res) => {
    if (!req.file || !req.file.mimetype.startsWith("image/")) {
      return res.status(201).json({
        message:
          "Invalid file type. Please upload an image (jpeg, jpg, or png).",
      });
      // return res.send(`<script>alert('Invalid File Format');</script>`);
    }
    const photo = req.file.filename;
    const userId = req.body.userId;
    console.log(photo);

    uploadModel
      .create({ photo, uploadedby: userId })
      .then((data) => {
        console.log("uploaded successfully.");
        console.log(data);
        res.send(data);
      })
      .catch((error) => console.log(error));
  }
);

router.delete("/api/delete/:id", handleauth, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedPhoto = await uploadModel.findByIdAndDelete(id);
    if (!deletedPhoto) {
      return res.status(404).send("Photo not found");
    }

    const photoPath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      deletedPhoto.photo
    );
    fs.unlinkSync(photoPath); // Delete the image file

    res.send("Photo deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
