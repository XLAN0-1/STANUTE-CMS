///Import modules
const mongoose = require("mongoose");

//Schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const courseSchema = mongoose.Schema({
  title: String,
  sections: Array,
  published: Boolean,
  image: String,
  objectives: String,
  highlights: String,
  created_on: Date,
});

const notificationSchema = mongoose.Schema({
  name: String,
  course: String,
  readBy: Array,
});

//Model
const User = mongoose.model("user", userSchema);
const Course = mongoose.model("course", courseSchema);
const Notification = mongoose.model("notification", notificationSchema);

module.exports = {
  User,
  Course,
  Notification,
};
