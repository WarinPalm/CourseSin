const express = require('express');
const router = express.Router();
const { likeCourse , listFavaorite , unLikeCourse , allCourse } = require('../controllers/favorite');
const { authCheck } = require('../middlewares/authCheck');

router.post('/favorite', authCheck , likeCourse);
router.get('/favorites', authCheck , listFavaorite);
router.delete('/favorite/:id', authCheck , unLikeCourse);

router.get('/favorite/course', allCourse);

module.exports = router;