const express = require('express');
const app = express();
const path = require('path');

app.use('/',(req, res, next) => {
res.end("hello post");
    console.log("Add post");
});