const { Router } = require("express");
const uploadMiddleware = require("../middlewares/multerMiddleware");
const uploadModel = require("../models/uploadModel");
const router = Router();

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

module.exports = router;
