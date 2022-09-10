// const express = require('express');

// const passport = require('passport');
// const router = express.Router();
// require('../config/passport')(passport);
//
const User = require('../models').User;
const Role = require('../models').Role;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// router.post('/signup',
const signUp = async function (req, res) {

    res.send('signup');

    // const findUser = await User.findOne({ where: { email: req.body.email } });
    // if (findUser) {
    //     return res.status(409).json({
    //         message: 'user mail already exists'
    //     });
    // }
    // const newUser = await User.create({
    //     email: req.body.email,
    //     password: req.body.password,
    //     fullname: req.body.fullname,
    //     phone: req.body.phone,
    //     role_id: req.body.role_id
    // });

    // try {
    //     res.send({
    //         // data: newUser,
    //         message: 'User created successfully'
    //     })
    // } catch (error) {
    //     res.status(404).json({ messages: "Server Error" });
    // }

};
               
// router.post('/signin',
    
   const signIn= async function (req, res) {
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email: email } });
    if (!findUser) {
      return res.status(401).json({ messages: "User email is not SignUp" });
    }
    const UserValidPass = await bcrypt.compare(password, findUser.password);
  
    if (!UserValidPass) {
        return res.status(400).json({
            messages: "User password is not valid",

        });
    }
  
    const { id, fullname, email: userEmail,role_id } = findUser;
  
  
    const userInfo = {
      id: id,
      fullname: fullname,
      email: userEmail,
      role_id: role_id,
    };
  
    const Token = jwt.sign(userInfo, process.env.TOKEN, { expiresIn: "1h" });
   try {
    res.status(200).json({
      token: Token,
      user: userInfo,
      messages: "User Login Successfully",
      
    });
   } catch (error) {
    res.status(404).json({ messages: "Server Error" });
   }
};

module.exports = {
    signUp,
    signIn
};