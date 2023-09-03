const mongoose = require('mongoose'); 
const questionSchema = new mongoose.Schema({ 
  text: { 
    type: String, 
    required: true, 
  }, 
  options: [ 
    { 
      text: String, 
      isCorrect: Boolean, 
    }, 
  ], 
}); 
const quizSchema = new mongoose.Schema({ 
  title: { 
    type: String, 
    required: true, 
  }, 
   
  questions: [questionSchema], 
}); 
const Quiz = mongoose.model('Quiz', quizSchema); 
module.exports = Quiz;