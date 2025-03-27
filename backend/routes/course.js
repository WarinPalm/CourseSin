const express = require('express');
const router = express.Router();
const { createCategory , listAllCategory } = require('../controllers/course');

router.post('/course')
router.get('/course')
router.put('/course')
router.delete('/course/:id')

// back door
router.post('/category', createCategory);
router.get('/category', listAllCategory);

module.exports = router;