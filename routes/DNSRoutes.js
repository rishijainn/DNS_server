const express=require("express");
const{getIp,updData}=require("../controllers/reqController")

const reqRouter=express.Router();

reqRouter.get("/get/:domain/:record",getIp)

reqRouter.patch("/update/:id",updData)


module.exports=reqRouter;