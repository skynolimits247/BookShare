const route = require('express').Router()
const User = require('../db').User
// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'akash.singh247@gmail.com',
//     pass: ''
//   }
// });

// var mailOptions = {
//   from: 'akash.singh247@gmail.com',
//   to: 'akash.singh247@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// }); 
route.post('/', function (req, res) {
  console.log("in post signup")

  console.log(req.body)
  User.create({
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    mobile: req.body.mobile,
    password:req.body.password,
    course:req.body.course,
    address:req.body.address,
    college:req.body.college
              })
                                    })
  exports = module.exports = route