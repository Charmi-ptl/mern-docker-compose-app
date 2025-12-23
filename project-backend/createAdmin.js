const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ username: "admin" });
    if (existing) {
      console.log("Admin already exists");
      return process.exit();
    }

    const admin = new User({
      username: "admin",
      password: "admin123"
    });

    await admin.save();
    console.log("Admin user created successfully");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
