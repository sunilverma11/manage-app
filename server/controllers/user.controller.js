const express = require('express');
const bcrypt = require('bcrypt');

const userModel = require('../models/user.model');
const {hashingPassword, comparePassword} = require('../middleware/hashpassword');
const { generateToken } = require('../middleware/authentication');
const router = express.Router();

router.post("/register",hashingPassword, async (req, res) => {
  try {
    if(req.body.userAlreadyExist){
        return res.status(200).send("user already exist");
    }
    if(req.body.hashstatus){
        return res.status(200).send(req.body.user);
    }
    return res.send("Registration failed");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.get("/users", async (req, res) => {
    try {
      const item = await userModel.aggregate( [ {$project: {name:1,_id:0}} ] );
      return res.status(201).send(item);
    } catch (error) {
      return res.status(404).send(error.message);
    }
});
router.post("/login",comparePassword,generateToken,  async (req, res) => {
    try {
        if(req.body.error){
            return res.send("login error");
        }
        if(!req.body.status || req.body.userNotExist){
            return res.send("invalid credentials");
        }
      return res.status(201).send({...req.body.user,token:req.body.token});
    } catch (error) {
      return res.status(404).send(error.message);
    }
});

router.get("/profile/:id", async (req, res) => {
    try {
      const item = await userModel.find({email});
      return res.status(201).send(item);
    } catch (error) {
      return res.status(404).send(error.message);
    }
});

module.exports = router;