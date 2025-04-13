const prisma = require('../configs/prisma');
const bcrypt = require('bcryptjs');

exports.editProfile = async (req , res ) => {
    try{
        const user_id = req.users.id;
        const checkUser = await prisma.users.findFirst({
            where : { id : user_id }
        });
        if(!checkUser) return res.status(400).json({ message : 'User not found'});
        const { f_name , l_name } = {
            ...checkUser,
            ...req.body
        };
        const password = req.body.password;

        const hashPassword = password ? await bcrypt.hash(password , 10) : checkUser.password;
        const pictureProfile = req.file ? req.file.filename : checkUser.picture;
        const updateUser = await prisma.users.update({
            where : { id : user_id },
            data : {
                f_name : f_name,
                l_name : l_name,
                picture : pictureProfile,
                password : hashPassword
            }
        });
        res.status(200).json({ message : 'Profile updated successfully' , user : updateUser });

    }catch (err) {  
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}