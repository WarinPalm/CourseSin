const prisma = require('../configs/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } =require('../configs/configenv');

exports.register = async (req , res ) => {
    try{
        const { email , password , fName , lName } = req.body;

        if(!email || !password || !fName || !lName){
            return res.status(400).json({msg : 'All fields are required'});
        };

        const checkUser = await prisma.users.findFirst({
            where: { email: email }
        });
        if (checkUser){
            return res.status(400).json({msg : 'Email is already exists'});
        };

        const hashPassword = await bcrypt.hash(password , 10);

        await prisma.users.create({
            data: {
                email: email,
                password: hashPassword,
                f_name: fName,
                l_name: lName
            }
        });

        res.status(201).json({ message : "Register Success" });

    }catch (err){
        console.log(err);
        res.status(500).json({msg : 'Internal Server Error'});
    }
}

exports.login = async (req , res) => {
    try{
        const { email , password } = req.body;
        if(!email || !password){
            return res.status(400).json({msg : 'All fields are required'});
        };

        const chechUser = await prisma.users.findFirst({
            where: { email: email }
        });
        if(!chechUser){
            return res.status(400).json({msg : 'User not found'});
        };

        const passwordMatch = await bcrypt.compare(password , chechUser.password);
        if(!passwordMatch){
            return res.status(400).json({msg : 'Password is not match'});
        };
 
        const payload = {
            id: chechUser.id,
            email: chechUser.email
        }

        jwt.sign(payload , secret , { expiresIn: '30d'}, (err , token) => {
            if(err){
                return res.status(500).json({msg : 'Server Error'});
            }
            res.json({payload , token});
        })
    }catch (err){
        console.log(err);
        res.status(500).json({msg : 'Internal Server Error'});
    }
}

exports.currentUser = async (req , res) => {
    try{
        const user = await prisma.users.findFirst({
            where: { id: req.users.id },
            select: {
                id: true,
                email: true,
            }
        });
        res.json(user);
    }catch (err){
        console.log(err);
        res.status(500).json({msg : 'Internal Server Error'});
    }
}