const express = require('express'); 
const router = express.Router();
const Section =require('../model/course');
router.get('/:id//search/courses:id',getSearch)=require('../model/course')

// GET /api/search/courses (Search for courses by title, category, or level) 
module.exports = router;