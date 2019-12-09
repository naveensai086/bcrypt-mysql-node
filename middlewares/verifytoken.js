let jwt = require('jsonwebtoken');

var verify = function tokenVerification (req,res,next){
    const token = req.headers['token'];
    if(!token){
        res.status(400).send({
            status_code:400,
            message:"please provide token for access"
        })
    }
    else{
        jwt.verify(token, 'secret', (err, verifiedJwt) => {
            if(err){
                res.status(404).send({
                    status_code:404,
                    message:"access denied for wrong token "
                })
            }else{
                  console.log(verifiedJwt);
                if(verifiedJwt.IsAdmin==0){
                    res.status(200).send({
                        status_code:200,
                        message:"authorization succeesful "
                    })
                    next();
                }
                else{
                    res.status(401).send({
                        status_code:401,
                        message:"you are unauthorized person  "
                    }) 
                }
               
            }
          })
    }
   
}

module.exports={
    verify:verify
}