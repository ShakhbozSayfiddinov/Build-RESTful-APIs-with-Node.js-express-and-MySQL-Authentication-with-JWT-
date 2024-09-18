const { verify } = require("jsonwebtoken")


module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization').split(" ")[1]
        console.log(token);
       

        // console.log("Received token: ", token);
        
        if(token) {
            // token = token.slice(7);
            const jwtkey = process.env.JWT_SECRET_KEY;
            verify(token, jwtkey, (err, decoded) => {
                if(err) {
                    console.log(err);
                    res.status(401).json({
                        success:0,
                        message: 'Invalid token'
                    });
                } else{
                    next();
                }
            })
        } else{
            res.json({
                success: 0,
                message: 'Access denied: unautorized user',
                token: token
            });
            
        }
    }
}