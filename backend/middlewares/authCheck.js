const jwt = require('jsonwebtoken');
const prisma = require('../configs/prisma');
const { secret } = require('../configs/configenv');

exports.authCheck = async (req, res , next) => {
    try{    
        const headersToken = req.headers.authorization;
        if(!headersToken){
            return res.status(401).json({ message: 'No token, Authorization'});
        }
        const token = headersToken.split(" ")[1];
        const decode = jwt.verify(token, secret);

        req.users = decode;

        await prisma.users.findFirst({
            where:{
                email: req.users.email
            }
        })
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Token Invalid'});
    }
}