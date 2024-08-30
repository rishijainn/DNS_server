const express=require("express");
const {SignUp,login}=require("../controllers/UserController")
const router=express.Router();


router.post('/SignUp',SignUp);
router.post('/login',login);

module.exports=router;