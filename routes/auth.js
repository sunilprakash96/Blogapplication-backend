//Registration module...
const express=require('express');
const router=express.Router();
const {findLogin}=require("../controllers/authController");

router.get('/auth', function (req, res) {
    res.send("inside USer service");
});

router.post('/auth', authenticateUser);

module.exports=router