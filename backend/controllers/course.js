const prisma = require('../configs/prisma');
const fs = require('fs');
const path = require('path');



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

exports.createCourse = async (req , res) => {
    try{
        const { title , description , benefit , category_id } = req.body;
        const user_id = req.users.id;
        
        if(!title || !description || !benefit || !category_id ){
            return res.status(400).json({ message : 'All fields are required'});
        };

        const checkCategory = await prisma.categories.findFirst({
            where : { id : category_id }
        });
        if(!checkCategory) return res.status(400).json({ message : 'Category not found'});
        
        const checkCourse = await prisma.courses.findFirst({
            where : { title : title , category : category_id , channel : user_id }
        });
        if(checkCourse){
            
            fs.unlink(`./uploads/video/${req.files['video'][0].filename}`, (err) => {
                    if (err) console.log("not found video", err);
                });
            fs.unlink(`./uploads/video/thumbnail/${req.files['thumbnail'][0].filename}`, (err) => {
                    if (err) console.log("not found image", err);
                });

            return res.status(400).json({ message : 'Course already exists'});
        };
        
        const course = await prisma.courses.create({
            data : {
                title : title,
                description : description,
                benefit : benefit,
                video_file : req.files['video'][0].filename,
                thumbnail : req.files['thumbnail'][0].filename,
                category : category_id,
                channel : user_id
            }
        });
        
        res.status(201).json({ message : 'Create Course Success' , Course : course });
    }catch (err){
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.listCourse = async (req , res) => {
    try{    
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const category_id = req.query.category;

        let courses ;
        if(!category_id){
            courses = await prisma.courses.findMany({
                skip : (page - 1) * limit,
                take : limit,
                where : { status : true },
                select : {
                    id : true,
                    title : true,
                    description : true,
                    benefit : true,
                    video_file : true,
                    thumbnail : true,
                    Channel : {
                        select : { id : true , f_name : true , l_name : true , picture : true }
                    },
                    Category : {
                        select : { id : true , name : true }
                    },
                    created_at : true
                }
            });
        }
        else{
            const checkCategory = await prisma.categories.findFirst({
                where : { id : category_id }
            });

            if (!checkCategory) return res.status(400).json({ message : 'Category not found'});

            courses = await prisma.courses.findMany({
                skip : (page - 1) * limit,
                take : limit,
                where : { status : true , category : category_id },
                select : {
                    id : true,
                    title : true,
                    description : true,
                    benefit : true,
                    video_file : true,
                    thumbnail : true,
                    Channel : {
                        select : { id : true , f_name : true , l_name : true , picture : true }
                    },
                    Category : {
                        select : { id : true , name : true }
                    },
                    created_at : true,
                    updated_at : true,
                }
            });
        }

        res.status(200).json({ courses : courses });

    }catch (err){
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}
exports.getCourse = async (req , res) => {
    try{
        const course_id = req.params.id;
        const checkCourse = await prisma.courses.findFirst({
            where : { id : course_id , status : true },
            select : {
                id : true,
                title : true,
                description : true,
                benefit : true,
                video_file : true,
                thumbnail : true,
                Channel : {
                    select : { id : true , f_name : true , l_name : true , picture : true }
                },
                Category : {
                    select : { id : true , name : true }
                },
                created_at : true,
                updated_at : true,
            }
        });
        
        if(!checkCourse) return res.status(400).json({ message : 'Course not found'});
        res.status(200).json({ Course : checkCourse });

    }catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.editCourse = async (req , res) => {
    try{
        const user_id = req.users.id;
        const course_id = req.params.id;
        
        const checkCourse = await prisma.courses.findFirst({
            where : { id : course_id , status : true , channel : user_id }
        });
        if(!checkCourse){
            return res.status(400).json({ message : 'Course not found'});
        };
        const { title , description , benefit , category_id } = {
            ...checkCourse,
            ...req.body
        };

        const course = await prisma.courses.update({
            where: { id :  course_id , status : true , channel : user_id },
            data : {
                title : title,
                description : description,
                benefit : benefit,
                category : category_id
            }
        });

        res.status(200).json({ message : 'Edit Course Success' , Course : course });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.removeCourse = async (req , res) => {
    try{
        const user_id = req.users.id;
        const course = req.params.id;

        const checkCourse = await prisma.courses.findFirst({
            where : { id : course , status : true , channel : user_id }
        });

        if(!checkCourse){
            return res.status(400).json({ message : 'Course not found'});
        };

        await prisma.courses.update({
            where : { id : course , status : true , channel : user_id },
            data : { status : false }
        });

        res.status(200).json({ message : 'Remove Course Success' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

exports.viewCourse = async (req , res) => {
    try{
        const course_id = req.params.id;
        const checkCourse = await prisma.courses.findFirst({
            where : { id : course_id , status : true }
        });
        if(!checkCourse) return res.status(400).json({ message : 'Course not found'});
        
        const course = await prisma.courses.update({
            where : { id : course_id },
            data : { view : { increment : 1 } }
        });
        res.status(200).json({ message : 'View Course Success' , Course : course });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Internal Server Error'});
    }
}

