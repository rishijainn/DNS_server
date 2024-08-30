const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
       
    }

})

const Userdomain = mongoose.model('Userdetail',UserSchema);

module.exports=Userdomain;