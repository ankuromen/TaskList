const dotenv = require('dotenv').config()
const secret=process.env.SECRET
const jwt = require('jsonwebtoken');



const middleware=(req,res,next)=>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0]=="test")
    {   
        let token= req.headers.authorization.split(" ")[1]
        jwt.verify(token, secret, function(err, decoded) {
            if(err){
                return res.status(400).json({
                    "message":err
                });
            }
            else {
                req.user=decoded 
                next()//callback function
            }
          });
    }
    else {
        return res.status(400).json({
            "message":"unauthorized"
        });
    }
}
module.exports=middleware;