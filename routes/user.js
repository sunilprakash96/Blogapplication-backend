//Registration module...
const express=require('express');
const router=express.Router();
const {createUser}=require("../controllers/userController");

router.get('/user', function (req, res) {
    res.send("inside USer service");
});

router.post('/user',createUser);

module.exports=router