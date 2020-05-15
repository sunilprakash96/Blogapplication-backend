const express = require('express');
const { createPost, getPost, deletePost, updatePost } = require('../services/blogService');
const { validateCreate, validateUpdate, validateDelete } = require('../validation/blogValidation');


getBlog = async (req, res) => {
    try {
        const posts = await getPost();
        if (posts)
            return res.status(200).send(posts);
        else
            return res.status(400).send({ message: "Bad Request" });
    }
    catch (ex) {
        console.log("Blog controllers- getBlog Error:", ex)
    }
};

createBlog = async (req, res) => {
    try {
        const validateUser = await validateCreate(req.body);
        if (validateUser) {
            return res.status(400).send({ message: validateUser });
        }

        const { title, post } = req.body;
        const posts = await createPost(req.body);
        if (posts)
            return res.status(200).send({ message: "Created Successfully" });
        else
            return res.status(400).send({ message: "Bad Request" });
    }
    catch (ex) {
        console.log("Blog controllers- createBlog Error:", ex);
    }
};

updateBlog = async (req, res) => {
    try {
        const validateUser = await validateUpdate(req.body);
        if (validateUser) {
            return res.status(400).send({ message: validateUser });
        }

        const posts = await updatePost(req.body);
        if (posts)
            return res.status(200).send({ message: "Updated Successfully" });
        else
            return res.status(400).send({ message: "Bad Request" });
    }
    catch (ex) {
        console.log("Blog controllers- UpdateBlog Error:", ex);
    }
};

deleteBlog = async (req, res) => {
    try {
        const validateUser = await validateDelete(req.body);
        if (validateUser) {
            return res.status(400).send({ message: validateUser });
        }
        
        const posts = await deletePost(req.body.id);
        if (posts)
            return res.status(200).send({ message: "Deleted Successfully" });
        else
            return res.status(400).send({ message: "Bad Request" });
    }
    catch (ex) {
        console.log("Blog controllers- deleteBlog Error:", ex);
    }
}


module.exports = { createBlog, getBlog, deleteBlog, updateBlog }