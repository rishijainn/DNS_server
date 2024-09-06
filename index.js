const express = require("express");
const {connection}=require("./connection");
const router=require("./routes/UserRoutes");
const reqRouter=require("./routes/DNSRoutes");
const cookieParser=require("cookie-parser");
const {auth}=require("./middleware/auth");
require("dotenv").config();

const url=process.env.DbUrl;
const portNo=process.env.portNo;


const app= express();


connection(url).then(()=>{
    console.log("connection establised");
})

app.use(express.json());
app.use(cookieParser());

app.get('/',auth,(req,res)=>{
    res.send(
        `hello from Rishi ,Welcome to the Complete Backend Project (API)

This project provides a REST API for [brief description of your project, e.g., managing tasks, handling user authentication, etc.]. Below are the instructions to get started and test the API using Postman. `
    )
})


app.use("/user",router);
app.use("/custom",auth,reqRouter); 

app.listen(portNo,()=>{
    console.log("listening on the port no",portNo);
});

