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

exports.getProfile = async (req , res) => {
    try{
        const user_id = req.users.id;
        const checkUser = await prisma.users.findFirst({
            where : { id : user_id },
            select : {
                f_name : true,
                l_name : true,
                email : true,
                picture : true,
            }
        });
        if(!checkUser) return res.status(400).json({ message : 'User not found'});
        res.status(200).json({ user : checkUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.getMyChannel = async (req , res) => {
    try{
        const user_id = req.users.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const checkUser = await prisma.users.findFirst({
            where : { id : user_id },
            select : {
                f_name : true,
                l_name : true,
                picture : true,
                _count : {
                    select : { course : true }
                },
                course : {
                    skip : (limit * page) - limit,
                    take : limit,
                    where : { status : true },
                    select : {
                        id : true,
                        title : true,
                        description : true,
                        benefit : true,
                        video_file : true,
                        thumbnail : true,
                        created_at : true,
                        _count : {
                            select : {
                                like : true
                            }
                        },
                        Category : {
                            select : { id : true , name : true }
                        }
                    }
                }
            }
        });
        if(!checkUser) return res.status(400).json({ message : 'User not found'});
        res.status(200).json({
            total_course : checkUser._count.course,
            total_pages : Math.ceil(checkUser._count.course / limit),
            courses:[
                {
                    id: checkUser.course[0].id,
                    title: checkUser.course[0].title,
                    description: checkUser.course[0].description,
                    benefit: checkUser.course[0].benefit,
                    video_file: checkUser.course[0].video_file,
                    thumbnail: checkUser.course[0].thumbnail,
                    _count: {
                        like: checkUser.course[0]._count.like
                    },
                    Channel: {
                        f_name: checkUser.f_name, l_name: checkUser.l_name
                    },
                    Category:{
                        id:checkUser.course[0].Category.id, name:checkUser.course[0].Category.name
                    },
                    created_at: checkUser.course[0].created_at
                }
            ]
        });

    }catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.watchChannel = async (req , res) => {
    try{
        const channel_id = req.params.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const checkChannel = await prisma.users.findFirst({
            where : { id : channel_id },
            select : {
                f_name : true,
                l_name : true,
                picture : true,
                _count : {
                    select : { course : true }
                },
                course : {
                    skip : (limit * page) - limit,
                    take : limit,
                    where : { status : true },
                    select : {
                        id : true,
                        title : true,
                        description : true,
                        benefit : true,
                        video_file : true,
                        thumbnail : true,
                        created_at : true,
                        _count : {
                            select : {
                                like : true
                            }
                        },
                        Category : {
                            select : { id : true , name : true }
                        }
                    }
                }
            }
        });
        if(!checkChannel) return res.status(400).json({ message : 'Channel not found'});
        res.status(200).json({
            total_course : checkChannel._count.course,
            total_pages : Math.ceil(checkChannel._count.course / limit),
            courses:[
                {
                    id: checkChannel.course[0].id,
                    title: checkChannel.course[0].title,
                    description: checkChannel.course[0].description,
                    benefit: checkChannel.course[0].benefit,
                    video_file: checkChannel.course[0].video_file,
                    thumbnail: checkChannel.course[0].thumbnail,
                    _count: {
                        like: checkChannel.course[0]._count.like
                    },
                    Channel: {
                        f_name: checkChannel.f_name, l_name: checkChannel.l_name
                    },
                    Category:{
                        id : checkChannel.course[0].Category.id, name : checkChannel.course[0].Category.name
                    },
                    created_at: checkChannel.course[0].created_at
                }
            ]
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}
