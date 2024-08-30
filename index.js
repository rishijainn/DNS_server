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
    console.log("connection establised")
})

app.use(express.json());
app.use(cookieParser());


app.use("/user",router);
app.use("/custom",auth,reqRouter); 

app.listen(portNo,()=>{
    console.log("listening on the port no",portNo);
});

