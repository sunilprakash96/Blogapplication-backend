//Registration module...
const express = require('express');
const router = express.Router();
const { createBlog, getBlog, updateBlog, deleteBlog } = require('../controllers/blogController');


router.get('/blog', getBlog);
router.post('/blog', createBlog);
router.put('/blog', updateBlog);
router.delete('/blog', deleteBlog)

module.exports = router