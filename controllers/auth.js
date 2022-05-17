const jwt = require('jsonwebtoken');


generateToken = (user)=>{
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);

    return accessToken;
}

verifyUser = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    //Check if token is null
    if(token == null) return res.sendStatus(401);


    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
        if(err) return res.sendStatus(403);


        //User passed

        console.log('User passed the authentication');
        next();
    })


}

module.exports = {
    verifyUser,
    generateToken,
}