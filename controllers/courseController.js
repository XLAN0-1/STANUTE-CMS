const auth = require("../controllers/auth");
const { Course } = require("../model/model");
const parseCourse = require("../controllers/parseCourse");

//Get all courses from the database
getCourses = (req, res) => {
  Course.find({ published: true })
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

//Get all drafts from the database
getDrafts = (req, res) => {
  //User is valid so get all the drafts
  Course.find({ published: false })
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

//Edit a course
editCourse = (req, res) => {
  let { id, img, content, highlights, objectives, title, published } = req.body;

  //Parse the course into sections
  const sections = parseCourse(content);

  //Update the course in the database
  Course.findOneAndUpdate(
    { _id: id },
    {
      title: title,
      image: img,
      highlights: highlights,
      objectives: objectives,
      published: published,
      sections: sections,
    }
  ).then(result => {
      res.status(200).json({
          status: true
      })
  }).catch(error => {
      res.status(500).json({
          status: false,
          error: error
      })
  });
};

//Add a new course to the database
addCourse = (req, res) => {
  let { img, content, highlights, objectives, title, published } = req.body;

  //Parse the course into sections
  const sections = parseCourse(content);


  //Create a new course
  const course = new Course({
    title: title,
    image: img,
    highlights: highlights,
    objectives: objectives,
    published: published,
    sections: sections,
    created_on: new Date(),
  });

  //Save the course to the database
  course
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

//Delete a course
deleteCourse = (req, res) => {
  let { id } = req.body;

  //Delete the course
  Course.deleteOne({ id: id })
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

module.exports = {
  deleteCourse,
  getCourses,
  getDrafts,
  addCourse,
};
