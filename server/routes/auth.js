const express = require('express'); 
const router = express.Router(); 
const {registerUser,loginUser,getMe,resetPassword,forgotPassword} = require('../controllers/authcontroller') 
//const {protect} = require('../middleware/auth') 
// const{upload}=require("../multer")
 
 
router.post('/', registerUser) 
router.post('/login', loginUser) 
router.post('/forgotPassword', forgotPassword) 
router.post('/resetPassword/:id/:token', resetPassword) 
router.get('/me', getMe) 
 
module.exports = router