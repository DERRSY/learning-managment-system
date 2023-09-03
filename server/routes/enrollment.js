const express = require('express'); 
const router = express.Router(); 
const Enrollment = require('../model/enrollment');
const Course = require('../model/course')
const {enrollCourses,getEnrollCourses,UnenrollCourses} = require('../controllers/enrollController') 
 
const {getEnrollment, setEnrollment} = require('../controllers/courseController') 
 
router.get('/',  getEnrollCourses) 
router.post('/', enrollCourses) 
router.delete('/:id',  UnenrollCourses) 
 
 
 
module.exports = router;