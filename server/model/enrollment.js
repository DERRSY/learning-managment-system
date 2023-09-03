const mongoose = require('mongoose');
const enrollmentSchema = new mongoose.Schema({  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,  },
  enrollment_date: { 
     type: Date,
    default: Date.now, 
 },
 
});
module.exports = mongoose.model('Enrollment', enrollmentSchema);