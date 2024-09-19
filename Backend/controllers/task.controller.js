const express = require("express");

const task = require("../models/task.model" );

const router = express.Router();
//reusable in future
router.post("/task", async (req, res) => {
  try {
    console.log("item post body",req.body)
    const item = await task.create(req.body);
    console.log("item",item)
    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.post("/task/:userid", async (req, res) => {
  try {
    const {title}= req.body
    let date = new Date();
    date = date.getFullYear() +"-"+date.getMonth()+"-"+date.getDate();
    const userid = req.params.userid;
    const item = await task.create({title,date,userid});
    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get("/task/:userid", async (req, res) => {
  try {
    const userid= req.params.userid
    const item = await task.find({userid}).lean().exec();
    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
//reusable in future
// router.get("/usertask/:userid", async (req, res) => {
//   try {
//     const userid= req.params.userid
//     const item = await task.find({userid});

//     return res.status(201).send(item);
//   } catch (error) {
//     return res.status(404).send(error.message);
//   }
// });
router.get("/task/:id", async (req, res) => {
  try {
    const item = await task.findById(req.params.id);

    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
//reusable in future
// router.delete("/task", async (req, res) => {
//   try {
//     const item = await task.deleteMany();

//     return res.status(201).send(item);
//   } catch (error) {
//     return res.status(404).send(error.message);
//   }
// });
router.delete("/task/:id", async (req, res) => {
  try {
    const item = await task.findByIdAndRemove(req.params.id);
    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.patch("/task/:id", async (req, res) => {
  try {
    await task.findByIdAndUpdate(req.params.id, req.body);
    const item = await task.findOne({_id:req.params.id})
    console.log({message:"Successfully updated",})
    return res.status(201).send({message:"Successfully updated",item});
  } 
  catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
