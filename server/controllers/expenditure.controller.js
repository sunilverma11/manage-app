const express = require("express");

const expenditure = require("../models/expenditure.model");
const { verifyToken } = require("../middleware/authentication");

const router = express.Router();
//reusable in future
router.post("/expenditure", verifyToken, async (req, res) => {
  try {
    // console.log("item post body",req.body)
    const item = await expenditure.create(req.body);
    // console.log("item",item)
    return res.status(201).send(item);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.get("/expenditure/:userid", verifyToken, async (req, res) => {
    try {
    //   console.log("item get expendi")
      const item = await expenditure.find({userid:req.params.userid});
      // console.log("item",item)
      return res.status(201).send(item);
    } catch (error) {
      return res.status(404).send(error.message);
    }
});
router.delete("/expenditure/:id", verifyToken, async (req, res) => {
    try {
    //   console.log("item delete expend")
      const _id= req.params.id
      await expenditure.findByIdAndDelete(_id);
      return res.status(201).send("Successfully deleted");
    } catch (error) {
      return res.status(404).send(error.message);
    }
});
module.exports = router;