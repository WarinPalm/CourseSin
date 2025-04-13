const express = require('express');
const router = express.Router();
const { editProfile , getProfile , getMyChannel , watchChannel } = require('../controllers/user');
const { authCheck } = require('../middlewares/authCheck');
const { uploadProfile } = require('../middlewares/upload');

router.get('/profile' , authCheck , getProfile);
router.put('/profile' , authCheck , uploadProfile , editProfile);

router.get('/my-channel' , authCheck , getMyChannel);
router.get('/watch-channel/:id' , authCheck , watchChannel);


module.exports = router;