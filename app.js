const express = require('express');
const app = express();
const auth = require("./routes/auth");
const user = require("./routes/user");
const blog = require("./routes/blog")
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
    exposedHeaders: 'authorization',
};

app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use('/api/blogService', auth);
app.use('/api/blogService', user);
app.use('/api/blogService', blog);

//Connection for MongoDb
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to Mongodb');
    })
    .catch((ex) => {
        console.log('Not Connected to MongoDb');
    });

const port = process.env.port || 5000;

//Connection for Localhost 
app.listen(port, () => {
    console.log("Connected to localhost:", port);
});