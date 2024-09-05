const Userdomain=require("../modles/UserModle");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const secretKey=process.env.SecretKey;


const SignUp=async(req,res)=>{
    const {name,email,password,role}=req.body;

    if(!email||!password){
        return res.status(400).json({
            success:false,
            message:"fill all the credentials"
        })
    }

    const isEmail=await Userdomain.findOne({email});

    let hashedPassword;
    try{
        hashedPassword= await bcrypt.hash(password,10);
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"there is some problem in hashing password"
        })
    }
    if(isEmail){
        return res.status(400).json({
            success:false,
            message:"email already exist"
        })
    }

    

    const user=  await Userdomain.create({name,email,password:hashedPassword,role});

    return res.status(200).json({
        success:true,
        message:"successfully signedIn"
    })
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(404).json({
            success:false,
            message:"fill all the credentials"
        })
    }

    const isUser = await Userdomain.findOne({email});

    if(!isUser){
        return res.status(401).json({
            success:false,
            message:"No such email exist , Sign in first"
        })
    }

    const payload={
        name:isUser.name,
        email:isUser.email,
        role:isUser.role,
        id:isUser._id
    }

    if(await bcrypt.compare(password,isUser.password)){

            const token=jwt.sign( payload,secretKey,{
                expiresIn:"10h"
            })

            isUser.token=token;
            isUser.password=undefined;
            
            const options={
                expire: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie('cookies',token,options).status(200).json({
                success:true,
                token,
                isUser,
                message:"user logged in successfully"
            })
        
    }
    else{
        return res.status(401).json({
            success:false,
            message:"password is incorrect"
        })
    }
}

module.exports={SignUp,login};