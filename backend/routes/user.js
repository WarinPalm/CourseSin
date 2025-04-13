const express = require('express');
const router = express.Router();
const { authCheck } = require('../middlewares/authCheck');
const { uploadProfile } = require('../middlewares/upload');
const { editProfile } = require('../controllers/user');

router.get('/profile' , authCheck , );
router.put('/profile' , authCheck , uploadProfile , editProfile);

router.get('/my-courses' , authCheck);


module.exports = router;