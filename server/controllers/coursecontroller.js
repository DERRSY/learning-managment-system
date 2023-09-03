const Course = require('../model/course')
const mongoose=require('mongoose')
// Create a new courserouter.post('/courses', async (req, res) => {
    try {    const course = new Course(req.body);
        const savedCourse = await course.save();    res.json(savedCourse);
      } catch (error) {    res.status(400).json({ error: error.message });
      };
    // Get a list of all courses
    router.get('/courses', async (req, res) => {  try {
        const courses = await Course.find();    res.json(courses);
      } catch (error) {    res.status(500).json({ error: error.message });
      }});
    // Get a single course by ID
    router.get('/courses/:id', async (req, res) => {  try {
        const course = await Course.findById(req.params.id);    if (!course) {
          return res.status(404).json({ message: 'Course not found' });    }
        res.json(course);  } catch (error) {
        res.status(500).json({ error: error.message });  }
    });
    // Update a course by IDrouter.put('/courses/:id', async (req, res) => {
      try {    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
          new: true,    });
        if (!course) {      return res.status(404).json({ message: 'Course not found' });
        }    res.json(course);
      } catch (error) {    res.status(500).json({ error: error.message });
      };
    // Delete a course by ID
    router.delete('/courses/:id', async (req, res) => {  try {
        const course = await Course.findByIdAndDelete(req.params.id);    if (!course) {
          return res.status(404).json({ message: 'Course not found' });    }
        res.json({ message: 'Course deleted' });  } catch (error) {
        res.status(500).json({ error: error.message });  }
    });

