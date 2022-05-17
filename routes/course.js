const express = require('express');
const auth = require('../controllers/auth');
const course = require('../controllers/courseController');

const router = express.Router();


//Get routes
router.get('/courses', course.getCourses);
router.get('/drafts', auth.verifyUser, course.getDrafts);


router.post('/add-course', auth.verifyUser, course.addCourse);
router.post('/delete-course', auth.verifyUser, course.deleteCourse);

module.exports = router;