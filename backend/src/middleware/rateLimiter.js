import ratelimit from "../config/upstash.js";



const rateLimiter = async (req,res,next) => {
try{
   const {success} = await  ratelimit.limit("my-rate-limit")
   if(!success){
    return res.status(429).json({
        message:"Too Many request,please tryagain later"
    })
   }
   next();
}catch(error){
console.log("Rate Limit error",error);
next(error);
}
}

export default rateLimiter;
