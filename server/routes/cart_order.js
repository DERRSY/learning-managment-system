const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const {
    getUser,
    getIdUser,
    deleteUser,
    editUser
} =require("../controllers/usercontroller");
router.get('/users', getUser) 
router.get('/users/:userId', getIdUser) 
router.delete('/users/:userId', deleteUser) 
router.put('/users/:userId', editUser)


module.exports=router