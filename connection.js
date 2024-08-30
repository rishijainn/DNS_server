const mongoose=require("mongoose");

const connection=async(url)=>{
    return mongoose.connect(url);
}

module.exports={connection};