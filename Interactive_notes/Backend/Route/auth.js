const express=require("express");
const router=express.Router();
const {signin,signup}=require("../controller/auth");
router.post("/signup",signup);
router.post("/signin",signin);

// router.get('/falana',(req,res)=>
// {
//    res.send("Kya Kar Raha Ha Be");
// });
module.exports=router;

