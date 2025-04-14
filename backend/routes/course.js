const express = require('express');
const router = express.Router();
const { 
    createCourse , 
    listCourse , 
    getCourse ,
    editCourse , 
    removeCourse , 
    viewCourse , 
    createCategory , 
    listAllCategory 
} = require('../controllers/course');
const { uploadCourseFiles } = require('../middlewares/upload');
const { authCheck } = require('../middlewares/authCheck');

router.post('/course', authCheck , uploadCourseFiles , createCourse );
router.get('/courses/:id?', authCheck , listCourse);
router.get('/course/:id', authCheck , getCourse );
router.put('/course/:id' , authCheck , editCourse );
router.put('/remove-course/:id' , authCheck , removeCourse );



// back door
router.post('/category', createCategory);
router.get('/category', listAllCategory);

module.exports = router;