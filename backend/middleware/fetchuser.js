const jwt=require('jsonwebtoken')
const JWT_SECRET='avanisG00dg*rl';

const fetchuser=(req,res,next)=>{
const token=req.header("auth-token");
if(!token){
    return res.status(401).send("Please authenticate using a valid token")
}
try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;

}catch(err){
    return res.status(401).send("Please authenticate using a valid token")

}

next();
}
module.exports=fetchuser;