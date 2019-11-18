const mysql = require("mysql");
const connection = require("../databaseconnection");
const express = require("express");
const router = express.Router();

router.get("/",(req, res) =>{

    connection.query("SELECT * FROM post_table", (err, rows, feilds) =>{
       if(!err){
           res.send(rows);
       }else{
           console.log(err);
       }
    });
});


module.exports = router;