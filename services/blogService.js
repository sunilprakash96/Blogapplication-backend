const Post = require('../models/blogModel');

getPost = async () => {
    try {
        const post = await Post.find();
        return post
    }
    catch (ex) {
        console.log("Blog service- getPost Error:", ex);
    }
};

createPost = async (posts) => {
    try {
        const post = await Post(posts);
        const result = await post.save();
        return post;
    }
    catch (ex) {
        console.log("Blog service- createPost Error:", ex);
    }
};

updatePost = async (posts) => {
    try {
        console.log(posts)
        const post = await Post.findByIdAndUpdate(posts.id,{
            $set:{
                title:posts.title,
                post:posts.post
            }
        });
        return post;
    }
    catch (ex) {
        console.log("Blog service- updatePost Error:", ex);
    }
}

deletePost = async (id) => {
    try {
        console.log(id)
        const post= await Post.findByIdAndDelete({ _id: id });
        return post;
    }
    catch (ex) {
        console.log("Blog service - deletePost Error:", ex);
    }
};

module.exports = { createPost, getPost, deletePost, updatePost };