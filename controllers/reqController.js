const DNS2 =require("dns2");
const domain = require("../modles/domainModle");
const cacheMemory=new Map();

const dns= new DNS2({dns:'8.8.8.8'});

const ttl=300;


const getIp=async(req,res)=>{
    const domainName=req.params.domain;
    const record=req.params.record||'A';

    const compositeKey=`${domainName}${record}`;    
    console.log(compositeKey<<"composite key");


    const cacheEntry=cacheMemory.get(compositeKey);
    console.log(cacheEntry);

    if(record==='CNAME'&&cacheEntry&&Date.now()<cacheEntry.expiresAt){
        return res.status(200).json({
            success:true,
            CNAME:cacheEntry.CNAME,
            message:"request completed successfully "
        })
    }
    
    if(cacheEntry&&Date.now()<cacheEntry.expiresAt){
        return res.status(200).json({
            success:true,
            Address:cacheEntry.value,
            message:"Ip address i given from cache memory"
        })
    }
    


    const dbEntry=await domain.findOne({domain:domainName,record_type:record});
    if(dbEntry){

        if(record=='CNAME'){
            cacheMemory.set(compositeKey, {
                value: dbEntry.value,
                CNAME:dbEntry.CNAME,
                expiresAt: Date.now() + ttl * 1000
            });

            return res.status(200).json({
                success:true,
                CNAME:dbEntry.CNAME,
                message:"request resolved"
            })
        }

        cacheMemory.set(compositeKey, {
            value: dbEntry.value,
            expiresAt: Date.now() + ttl * 1000
        });
        return res.status(200).json({
            success:true,
            Address:dbEntry.value,
            message:"Ip address i given from database"
        })
    }

    //upscale to the google (8.8.8.8)
    let result;
    try{
        
         result = await dns.resolve(domainName,record);

         console.log(result);

         const len=result.answers.length;
         const CNAME=result.answers;
        
         const ip = result.answers.length >0 ? (result.answers[0].address||result.answers[len-1].address) :null;
         console.log("hello the ip is ", ip)

         if(record=='CNAME'){
            cacheMemory.set(compositeKey, {
                CNAME:CNAME,
                expiresAt: Date.now() + ttl * 1000
            });

            const newData=await domain.create({domain:domainName,record_type:record,CNAME:CNAME,ttl:ttl});
        

            return res.status(200).json({
                success:true,
                CNAME:CNAME,
                message:"CNAME found through external DNS resolution"
            })
        }
         if(ip){

            cacheMemory.set(compositeKey,{
                value:ip,
                expiresAt :Date.now()+ ttl * 1000
            });

            const newData=await domain.create({domain:domainName,record_type:record,value:ip,ttl:ttl})
            

            return res.status(200).json({
                success:true,
                Address:ip,
                message:"ip found through external DNS resolution"
             }) 

         }
         else{
            return res.status(404).json({
                success: false,
                message: "Domain not found"
            });
         }
        

         
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"some error"
        })
    }
    
}

const updData=async(req,res)=>{
    //check wether the user is admin or not 
    const role=req.user.role;
    console.log(role);
    if(role!=='admin'){
        return res.status(401).json({
            success:false,
            message:"you are not authorised to made changes in the database"
        })
    }
    const newData=req.body;
    console.log(newData);

        const domainName=newData.domain;
        console.log(domainName);
        const value=newData.value;
        console.log(value);
        const id=req.params.id;

        console.log(id);
    try{
        
        const data=await domain.findById(id);
        
        data.domain=domainName;
        data.value=value;


        await data.save();

        return res.status(200).json({
            success:true,
            message:"updated successfully",
            data:data
        })

    }catch(error){
        return res.status(402).json({
            success:false,
            message:"there is some issue in updating the data"
        })

    }
    


}
module.exports={getIp,updData};