const { Router } = require("express");
const uploadMiddleware = require("../middlewares/multerMiddleware");
const uploadModel = require("../models/uploadModel");
const router = Router();
const path = require("path");
const fs = require("fs");

router.get("/api/get", async (req, res) => {
  const allphotos = await uploadModel.find().sort({ createdAt: "descending" });
  res.send(allphotos);
});

router.post("/api/save", uploadMiddleware.single("photo"), (req, res) => {
  const photo = req.file.filename;
  console.log(photo);

  uploadModel
    .create({ photo })
    .then((data) => {
      console.log("uploaded successfully.");
      console.log(data);
      res.send(data);
    })
    .catch((error) => console.console.log(error));
});

router.delete("/api/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPhoto = await uploadModel.findByIdAndDelete(id);
    if (!deletedPhoto) {
      return res.status(404).send("Photo not found");
    }

    const photoPath = path.join(__dirname,"..","public", "uploads", deletedPhoto.photo);
    fs.unlinkSync(photoPath); // Delete the image file

    res.send("Photo deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
