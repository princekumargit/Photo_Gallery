const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    uploadedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("upload", uploadSchema);
