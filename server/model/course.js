// const express = require('express')
const mongoose = require('mongoose');
require("dotenv").config
const Schema = mongoose.Schema;
const sectionSchema=new mongoose.Schema(
  {
    title:{
      type:String,
      required:true
    },
  lessons:[lessonSchema],
  quizzes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Quiz'
    }
  ]
}
)
const lessonSchema=new mongoose.Schema(
  {
    title:{
      type:String,
      required:true
    },
    type:{
      type:String,
      enum:['video','file'],
      required:true
    },
    url:{
      type:String,
      required:true
    }
}
)

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required:true,
    
  },
  price: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum:['programming,business,design,self development,interior design'],
    required: true,
  },
  category: {
    type: String,
    enum:['programming,business,design,self-development,interior design'],
    required: true,
  },
  enrolledUser:[
    {type :mongoose.Types.ObjectId , 
      ref:'user'
    }],
  
  sections:[sectionSchema]
  

  // lessons: {
  //   type: [
  //     {
  //       title: {
  //         type: String,
  //         required: true,
  //       },
  //       video: {
  //         type: String,
  //         required: true,
  //       },
  //       duration: {
  //         type: Number,
  //         required: true,
  //       },
  //     },
  //   ],
  //   required: true,
  // },
}
);

module.exports = mongoose.model('Course', CourseSchema);