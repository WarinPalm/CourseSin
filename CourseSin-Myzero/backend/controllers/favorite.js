const prisma = require('../configs/prisma');

exports.likeCourse = async (req , res) => {
    try{
        const user_id = req.users.id;
        const course_id = req.body.course_id;
        const checkCourse = await prisma.courses.findFirst({
            where : { id : course_id , status : true }
        });
        if(!checkCourse) return res.status(400).json({ message : 'Course not found'});

        const checkFavorite = await prisma.favorites.findFirst({
            where : { channel : user_id , course : course_id }
        });
        if (checkFavorite) return res.status(400).json({ message : 'You already like this course'});

        const favaorite = await prisma.favorites.create({
            data : {
                channel : user_id,
                course : course_id
            }
        });
        res.status(201).json({ message : 'Like Course Success' , favorite : favaorite });
    }catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.listFavaorite = async (req , res) => {
    try{
        const user_id = req.users.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const countFavorite = await prisma.favorites.count({ where : { channel : user_id } });
        const favaorite = await prisma.favorites.findMany({
            skip : (page - 1) * limit,
            take : limit,
            where : { channel : user_id },
            include : {
                Course : {
                    select : {
                        id : true,
                        title : true,
                        description : true,
                        benefit : true,
                        _count : { select : { like : true } },
                        Category : { select : { id : true , name : true } },
                        Channel : {
                            select : {
                                id : true,
                                f_name : true,
                                l_name : true,
                                picture : true
                            }
                        },
                        created_at : true,
                    }
                }
            }
        });
        res.status(201).json({ message : 'Like Course Success' , count : countFavorite , favorites : favaorite });
    }catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.unLikeCourse = async (req , res) => {
    try{
        const user_id = req.users.id;
        const course_id = req.params.id;
        const checkCourse = await prisma.courses.findFirst({
            where : { id : course_id , status : true }
        });
        if(!checkCourse) return res.status(400).json({ message : 'Course not found'});
        await prisma.favorites.deleteMany({
            where : { channel : user_id , course : course_id }
        });
        res.status(200).json({ message : 'Unlike Course Success' });
    }catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}