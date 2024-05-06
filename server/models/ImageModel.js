const mongoose = require("../config/connectDB");

const ImageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    public_id: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
    userID: {
      type: String,
      ref: "users",
    },
    private: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ImageModel = mongoose.model("images", ImageSchema);

module.exports = ImageModel;
