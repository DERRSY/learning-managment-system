const express=require('express')
const cors =require('cors')
require('dotenv').config()
const multer =require('multer')
const mongoose=require('mongoose')
const courseroute=require('./routes/course')
const userprofile =require("./routes/userProfile")
const bodyParser = require('body-parser')
const path = require("path")


const quiz =require("./controllers/quizcontroller")
const users =require("./controllers/userprofiles")

const app = express()
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage });
  
  app.post('/Courses', upload.single('image'), (req, res, next) => {
    const image = req.file;
  
    res.send({
      message: 'Image uploaded successfully!',
      image: image.filename
    });
  });

//middleware
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));


//routes
app.use('/userprofile',userprofile)
app.use('/Courses',courseroute)
// app.use("/Courses/questions",question)
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log('connected to db and listning to port 5000',process.env.PORT)
})})
.catch(()=>{
    console.error("Error connecting to DB")});

//listen for request
