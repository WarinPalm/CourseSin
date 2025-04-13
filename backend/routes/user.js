const express = require('express');
const router = express.Router();
const { authCheck } = require('../middlewares/authCheck');

router.get('/profile' , authCheck);
router.put('/profile' , authCheck);

router.get('/my-courses' , authCheck);


module.exports = router;