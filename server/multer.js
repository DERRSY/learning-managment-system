// const multer =require('multer')
// const upload = multer({
//     limits: {
//       fileSize: 1000000,
// },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//         return cb(new Error('Please upload a JPEG, JPG, or PNG file.'));
//       }
//       cb(undefined, true);
//     },
//   });
// const storage =multer.diskStorage({
//     destination:"./public/uploads/",
//     filename:function(req,file,cb){
//         cb(null.file.fieldname+'-'+Date.now()+Path.extname(file.originalname))
//     }
// })
// module.exports=upload.multer({storage:storage})
// // const multer =require("multer")
// // const storage =multer.diskStorage({
// //     destination:function(req,res,cb){
// //         cb(null,"upload/")
// //     },
// //         filename:function(req,file,cb){
// //             const uniqueSuffix=Date.now()+"-"+Math.round.apply(Math.random()+1e9)
// //             const filename =file.originalname.split(".")[0];
// //             cb(null,filename+"-"+uniqueSuffix+".png")
// //         },
// // });
