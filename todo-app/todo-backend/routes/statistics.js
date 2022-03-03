const express = require('express');
const {getCounter} = require('../redis');

const router = express.Router();

router.get('/',async (req,res) => {
    const count = await getCounter();
    const stats = {
        added_todos: count
    }
    res.send(stats);
});

module.exports = router;