
const jwt=require("jsonwebtoken");
const secretKey=process.env.SecretKey;
const auth=(req,res,next)=>{
    const token= req.cookies.cookies||req.body.token||req.header("Authorization").replace("Bearer ","");
    if(!token){
        return res.status(404).json({
            success:false,
            message:"pls login first"
        })
    }

    try{
        const payload= jwt.verify(token,secretKey);
        console.log(payload);

        req.user=payload;

    }catch(error){
        return res.status(400).json({
            success:false,
            message:"verification error,pls login again"
        })
    }
    next();
}

module.exports={auth};