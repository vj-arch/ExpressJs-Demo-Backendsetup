const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const mysql = require('mysql');

const postrouter = require("./posts/crud");
const mysqlconnection = require('./databaseconnection');
const category_router = require('./category/categories');


const bodyparser = require('body-parser');
const logger = require('./logger');

const PORT = process.env.PORT || 5000;



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


// Database Connection
mysqlconnection.connect((err) => {
    if (!err) {
        console.log("connected");
    } else {
        console.log(err);
    }
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

const data = app.use("/post", postrouter);
app.use(logger);

app.use('/api/members', require('./routes/api/members'));
 

app.use('/category', category_router);
//Post option

app.post('/api/post', (req, res, next) => {
    const post = req.body;
    var result_id = 0;

    //console.log(post.title);
    var sql = "INSERT INTO post_table (title,content) VALUES ?";
    var values = [
        [post.title, post.content]
    ];
    mysqlconnection.query(sql, [values], (err, result) => {

        if (!err) {

            res.status(201).json({
                message: "Post Successful",
                insertId: result.insertId
            });
        } else {
            console.log(err);
        }
    });
});

//Get Option

app.use('/api/post', (req, res, next) => {
    var posts = [];
    mysqlconnection.query("SELECT * FROM post_table", (err, rows, feilds) => {
        if (!err) {
            res.status(200).json(
                rows);
        } else {
            console.log(err);
        }
    });

});

//Update the post
app.put('/api/posts/:id',(req, res, next)=>{

    var sql = "UPDATE post_table SET title =?, content=? WHERE id = ?";
    console.log(req.body.title, req.body.content)
    var post = [req.body.title, req.body.content, req.params.id];
    mysqlconnection.query(sql,post, (err,result)=>{

    if(!err){
        console.log("updated successfully");
    }else{
        console.log(err);
    }
    });
    res.status(200).json({message:"data updated"});
});


//Delete option
app.delete('/api/posts/:id', (req, res, next) => {
    var sql = "DELETE FROM post_table WHERE id = ?";
    var _id = req.params.id;
 mysqlconnection.query(sql, _id, (err, result) => {
        if (!err) {
            console.log("row deleted");
        } else {
            console.log(err);
        }
    });
    res.status(200).json({ message: 'id deleted' });
});


//make static folder to point at
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log("server started"));