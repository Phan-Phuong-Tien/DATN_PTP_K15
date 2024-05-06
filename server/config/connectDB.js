const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    process.env.MONGO_URL,
    () => {
      console.log("Database connected");
    }
  )
  .catch((err) => {
    console.log("Database connect error: ", err);
  });

// mongodb://localhost:27017/FreshConnect-project

module.exports = mongoose;
