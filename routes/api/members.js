const express = require('express');
const router = express.Router();
const members = require('./members');

// get all members
router.get('/', (req, res) => {

    res.json(members);

});

// get a specific member
router.get('/:id', (req,res)=>{
    console.log(req.params);
        res.json(members.filter(membe => membe.id === parseInt(req.params.id)));
    });
    
    // create a memeber
    
    router.post('/', (req, res) =>
    {
    res.send(req.body);
    });

    module.exports = router;