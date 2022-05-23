const { User } = require("../model/model");
const bcrypt = require("bcrypt");
const auth = require("../controllers/auth");

const SALT_ROUNDS = 10;

//Function to hash a password
hashPassword = async (password) => {
  const newPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return newPassword;
};

//Add a new user to the database
addUser = (res, name, email, password) => {
  console.log("This guy was called");
  //No user exists so create the new user and generate a token
  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  user
    .save()
    .then((result) => {
      const token = auth.generateToken(result.toJSON());

      res.status(200).json({
        status: true,
        user: {
          name: name,
          email: email,
          token: token,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        error: error,
      });
    });
};

//Verify user password
verifyUserPassword = (res, user, plainTextPassword, hashedPassword) => {
  bcrypt.compare(plainTextPassword, hashedPassword).then((result) => {
    if (result) {
      //Password is a match
      console.log("In here");
      const token = auth.generateToken(user.toJSON());

      res.status(200).json({
        status: true,
        user: {
          name: user.name,
          email: user.email,
          token: token,
        },
      });
    } else {
      //Password is invalid so notify the user
      res.status(200).json({
        status: false,
        error: "Invalid password",
      });
    }
  });
};

//Sign a user up
signUp = async (req, res) => {
  //Extract the variables to use
  let { name, email, password } = req.body;

  //Hash the password
  const hashedPassword = await hashPassword(password);

  //Check if no current user exists with that email
  User.findOne({ email: email }).then((result) => {
    if (result != null || result != undefined) {
      //This email already exists
      console.log("A user already exists");
      res.status(200).json({
        status: false,
        error: "Email already exists",
      });
    } else {
      addUser(res, name, email, hashedPassword);
    }
  });
};

//Sign a user in
signIn = (req, res) => {
  //Extract the variables to use
  let { email, password } = req.body;

  //Find the user with this email in the database
  User.findOne({ email: email }).then((result) => {
    console.log(result);
    //First check if email is blank
    if (result == null || result == undefined) {
      //Email doesn't exist
      res.status(200).json({
        status: false,
        error: "Email doesn't exist",
      });
    } else {
      verifyUserPassword(res, result, password, result.password);
    }
  });
};

module.exports = {
  signIn,
  signUp,
};
