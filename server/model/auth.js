const mongoose = require('mongoose'); 
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt') 
const validator = require('validator')

const userSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: true, 
    
  }, 
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate(value) { 
        if (!validator.isEmail(value)) { 
          throw new Error('Email is invalid') 
          alert('invalid email')
        } 
      }
  
  }, 
  password: { 
    type: String, 
    required: true, 
  }, 
  role: { 
    type: String, 
    enum: ['teacher', 'student', 'admin'], 
    required: true, 
    default: 'student' 
  }, 
  contact:{
    type : String,
    validate: { 
        validator: function (v) { 
          return /\d{3}-\d{3}-\d{4}/.test(v) 
        }, 
        message: (props) =>` ${props.value} is not a valid phone number! `
      }

  },
  image:{
    type:String,
    default:'https://www.w3schools.com/howto/img_avatar.png'
  
},

  enrolledCourses: [ 
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course', 
    }, 
  ], 
  quizResults: [ 
    { 
      quiz: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Quiz', 
      }, 
      score: Number, 
    }, 
  ], resetPasswordToken: String,
  resetPasswordExpire: Date
}); 
 
// Hash password before saving 
userSchema.pre('save', async function (next) { 
    const user = this; 
    if (!user.isModified('password')) return next(); 
   
    const saltRounds = 10; 
    const hash = await bcrypt.hash(user.password, saltRounds); 
    user.password = hash; 
    next(); 
  }); 
   
  // Compare password for login 
  userSchema.methods.comparePassword = async function (password) { 
    return bcrypt.compare(password, this.password); 
  }; 
 
const Users = mongoose.model('Users', userSchema); 
 
module.exports = Users;
