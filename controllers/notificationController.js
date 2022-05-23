const { Notification } = require("../model/model");
const auth = require("../controllers/auth");

//Get notifications for a particular user
getNotifications = (req, res) => {
  const email = req.email;

  //Fetch all notifications
  Notification.find({ readBy: { $nin: [email] } })
    .then((result) => {
      res.status(200).json({
        status: true,
        content: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        error: error,
      });
    });
};

//update a notification
updateNotification = (req, res) => {
  const email = req.email;
  const id = req.body.id;

  Notification.findOneAndUpdate({ _id: id }, { $push: { readBy: email } })
    .then((result) => {
      res.status(200).json({
        status: true,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: true,
        error: error,
      });
    });
};

//Add a notification
addNotification = (req, res) => {
  let { name, course } = req.body;

  //Add the notification to the database;
  const notification = new Notification({
    name: name,
    course: course,
    readBy: [],
  });

  notification
    .save()
    .then((result) => {
      res.status(200).json({
        status: true,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        error: error,
      });
    });
};

//Delete a notification
deleteNotification = (req, res) => {
  let { id } = req.body;

  //Delete the notification
  Notification.deleteOne({ id: id })
    .then((result) => {
      //Deletion was successful
      res.status(200).json({
        status: true,
      });
    })
    .catch((error) => {
      //Deletion was unsuccessful
      res.status(500).json({
        status: true,
        error: error,
      });
    });
};

module.exports = {
  deleteNotification,
  addNotification,
  getNotifications,
  updateNotification,
};
