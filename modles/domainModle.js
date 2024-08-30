const mongoose=require("mongoose");

const Schema=new mongoose.Schema({
    domain:{
        type:String,
        required:true
    },
    record_type:{
        type:String,
        required:true,
        enum:['A','AAAA','CNAME']
    },
    value:{
        type:String,
    },
    CNAME:{
        type:Object,
    },
    ttl:{
        type:Number,
        default:300
    }

})

const domain = mongoose.model('detail',Schema);

module.exports=domain