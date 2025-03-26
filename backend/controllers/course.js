const prisma = require('../configs/prisma');

exports.createCourse = async (req , res) => {
    try{
        const { title , description , benefit , video , category_id } = req.body;
        const user_id = req.users.id;

        if(!title || !description || !benefit || !video || !category_id){
            return res.status(400).json({ message : 'All fields are required'});
        };

        const course = await prisma.courses.create({})

    }catch (err){
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.createCategory = async (req , res) => {
    try{    
        const { name } = req.body;
        if (!name) return res.json({ message : "name is null"});

        await prisma.categories.create({
            data: { name : name }
        });

        const category = await prisma.categories.findFirst({
            where: { name : name },
            select: { id : true , name : true }
        })

        res.status(201).json({ message : "Create Category Success" , Category : category });

    }catch (err){
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.listAllCategory = async (req , res) => {
    try{    
        const categories =await prisma.categories.findMany({
            select: { id : true , name : true }
        });

        res.status(200).json({ Category : categories });

    }catch (err){
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}