const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt') 
const Users = require('../models/user') 
const nodemailer = require('nodemailer');
 const crypto=require('crypto')
 
const registerUser = async (req, res)=>{ 
    const {name, email, password,cpassword} = req.body ;
    if(!name || !email || !password||!cpassword){ 
        res.status(400) 
        throw new Error('please add all fields') 
    } 
    if(password !== cpassword){
        res.status(400)
        throw new Error('passwords doesnot match') 
    }
 
    // check if user exists 
    const userExists = await Users.findOne({email}) 
    if(userExists){ 
        res.status(400) 
        throw new Error('exists') 
    } 
    //create new user 
    const user = await Users.create({name, email, password}) 
    if(user){ 
        res.status(200).json({_id: user.id, name: user.name, email: user.email, token: generateToken(user._id)}) 
    } else { 
        res.status(400) 
        throw new Error('invalid') 
    } 
 
 
     
} 
const loginUser = async (req, res)=>{ 
 
    const{email, password} = req.body 
 
    const user = await Users.findOne({email}) 
    if (user && (await bcrypt.compare (password, user.password))) { 
        res.json({ 
            _id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            token: generateToken(user._id), 
        }) 
    } else { 
        res.status(400) 
        throw new Error('Invalid credentials') 
    } 
 
 
     
} 
 
// const forgotPassword = async(req,res) =>{ 
   
//     const email = req.body.email; 
 
//     const user = await Users.findOne({email}); 
//     if (!user){ 
//         return res.status(404).json({ message : 'not found'}) 
//     } 
    
//     const resetToken = crypto.randomBytes(20).toString('hex'); 
//     user.resetToken = resetToken; 
//     user.resetTokenExpiration = Date.now() + '30d'; 
//     await user.save(); 
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//           user: 'derssyastu@gmail.com',
//           pass:'kfhkntjyoxfrcthk' 
      
//       }
//   })

//     // Send reset email with the link containing resetToken 
//   const mailOptions = { 
//     from: 'derssyastu@gmail.com', 
//     to: user.email, 
//     subject: 'Password Reset', 
//     html:` <p>Click <a href="${process.env.CLIENT_URL}/resetPassword?token=${resetToken}">here</a> to reset your password.</p>`, 
//   }; 
 
//   transporter.sendMail(mailOptions, (error, info) => { 
//     if (error) { 
      
//       console.error(error); 
//       res.status(500).json({ message: 'Email sending failed' }); 
//     } else { 
//       console.log('Email sent: ' + info.response); 
//       res.status(200).json({ message: 'Reset email sent successfully' }); 
//     } 
//   }); 
// } 
 
// const resetPassword = async(req,res)=>{ 
//     const resetToken = req.body.token; 
//   const newPassword = req.body.newPassword; 
 
//   const user = await Users.findOne({ 
//     resetToken, 
//     resetTokenExpiration: { $gt: Date.now() }, 
//   }); 
  
 
//   if (!user) { 
//     return res.status(400).json({ message: 'Invalid or expired token' }); 
//   } 
//   // Check the expiration date of the token 
//   const resetTokenExpiration = new Date(user.resetTokenExpiration);
//   if (resetTokenExpiration < Date.now()) {
//     return res.status(400).json({ message: 'Invalid or expired token' });
//   } 
 
  
 
//   // Update the user's password 
//   user.password = newPassword; 
//   user.resetToken = undefined; 
//   user.resetTokenExpiration = undefined; 
//   await user.save(); 
 
//   res.json({ message: 'Password reset successfully' }); 
 
// } 
const forgotPassword = async(req,res) =>{   
     
  const email = req.body.email;   
 
  const user = await Users.findOne({email});   
  if (!user){   
      return res.status(404).json({ message : 'not found'})   
  }   
    
  // Generate a reset token 
  const resetToken = crypto.randomBytes(20).toString('hex'); 
  user.resetToken = resetToken; 
  user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour 
  await user.save();  
   
  let transporter = nodemailer.createTransport({  
    service: 'gmail',  
    auth: {  
        user: 'derssyastu@gmail.com',  
        pass:'kfhkntjyoxfrcthk'   
      
    }  
})  

  // Send reset email with the link containing resetToken   
const mailOptions = {   
  from: 'derssyastu@gmail.com',   
  to: user.email,   
  subject: 'Password Reset',   
  text:` http://localhost:3000/reset_password/${user._id}/${resetToken}`
};   
 
transporter.sendMail(mailOptions, (error, info) => {   
  if (error) {   
      
    console.error(error);   
    res.status(500).json({ message: 'Email sending failed' });   
  } else {   
    console.log('Email sent: ' + info.response);   
    res.status(200).json({ message: 'Reset email sent successfully' });   
  }   
});   
}   
 
const resetPassword = async(req,res)=>{   
try{ 
 const { resetToken, newPassword } = req.body; 

// Find the user with the provided reset token 
  const user = await User.findOne({ 
    resetToken, 
    resetTokenExpiration: { $gt: Date.now() }, 
  }); 
 
if (!user) {   
  return res.status(400).json({ message: 'Invalid or expired token' });   
}   
 // Encrypt and hash the new password 
  const salt = await bcrypt.genSalt(10); 
  const hashedPassword = await bcrypt.hash(newPassword, salt); 

 
// Update the user's password and reset token fields 
  user.password = hashedPassword; 
  user.resetToken = undefined; 
  user.resetTokenExpiration = undefined; 
  await user.save();  
 
res.json({ message: 'Password reset successfully' });   
} catch (error) { 
  console.error('Error resetting password:', error); 
  res.status(500).json({ error: 'An error occurred while resetting the password' }); 
} 
}

const getMe = async (req, res)=>{ 
  try { 
    const user = await Users.findById(req.user._id).select('-password'); 
    if (user) { 
      res.status(200).json(user); 
    } else { 
      res.status(404).json({ message: 'User not found' }); 
    } 
  } catch (error) { 
    res.status(500).json({ message: 'Internal server error' }); 
  } 
} 
 
//generate JWT 
const generateToken = (id, role)=> { 
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { 
        expiresIn: '30d' 
    }) 
} 
 
 
 
 
module.exports = { 
    registerUser, 
    loginUser, 
    getMe, 
    resetPassword, 
    forgotPassword, 
  }
