const express = require('express');
const router = express.Router();
const { 
    createCourse , 
    listCourse , 
    editCourse , 
    removeCourse , 
    viewCourse , 
    createCategory , 
    listAllCategory 
} = require('../controllers/course');
const { uploadVideo } = require('../middlewares/upload');
const { authCheck } = require('../middlewares/authCheck');

router.post('/course', authCheck , uploadVideo , createCourse );
router.get('/course', authCheck , listCourse);
router.put('/course/:id' , authCheck , editCourse );
router.put('/remove-course/:id' , authCheck , removeCourse );

router.put('/view-course/:id' , authCheck , viewCourse );

// back door
router.post('/category', createCategory);
router.get('/category', listAllCategory);

module.exports = router;