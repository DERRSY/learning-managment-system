const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const Course = require('../models/course'); 
const Section = require('../models/section'); 
const Lesson = require('../models/lesson'); 
const Quiz = require('../models/quiz'); 
const {addCourse,getCourses,getIdCourses,deleteCourse,editCourse} = require('../controllers/courseController') 
const {addQuiz,getIdQuiz,getQuiz,deleteQuiz,editQuiz} = require('../controllers/quizController') 
const {addLesson,addSection,editLesson,editSection,deleteLesson,deleteSection,getIdLesson,getIdSection,getLesson,getSection} = require('../controllers/lesson_sectionController') 
 
router.post('/courses', addCourse) 
router.get('/courses', getCourses) 
router.get('/courses/:courseId', getIdCourses) 
router.delete('/courses/:courseId', deleteCourse) 
router.put('/courses/:courseId', editCourse) 
 
router.post('/courses/:courseId/sections', addSection) 
router.get('/courses/:courseId/sections', getSection) 
router.get('/courses/:courseId/sections:sectionId', getIdSection) 
router.delete('/courses/:courseId/sections/:sectionId', deleteSection) 
router.put('/courses/:courseId/sections/:sectionId', editSection) 
 
router.post('/courses/:courseId/sections/:sectionId/lessons', addLesson) 
router.get('/courses/:courseId/sections/:sectionId/lessons', getLesson) 
router.get('/courses/:courseId/sections/:sectionId/lessons/:lessonId', getIdLesson) 
router.put('/courses/:courseId/sections/:sectionId/lessons/:lessonId', editLesson) 
router.delete('/courses/:courseId/sections/:sectionId/lessons/:lessonId', deleteLesson) 
 
 
router.post('/courses/:courseId/sections/:sectionId/quiz', addQuiz) 
router.get('/courses/:courseId/sections/:sectionId/quiz', getQuiz) 
router.get('/courses/:courseId/sections/:sectionId/quiz/:quizId', getIdQuiz) 
router.put('/courses/:courseId/sections/:sectionId/quiz/:quizId', editQuiz) 
router.put('/courses/:courseId/sections/:sectionId/quiz/:quizId', deleteQuiz) 
 
 
 
 
 
module.exports = router;