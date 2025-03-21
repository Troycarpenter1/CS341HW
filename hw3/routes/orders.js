//Troy Carpenter
//use express framework
const express = require('express');
//makes a mini app to "route" things here rather than through app.js
const router = express.Router();

var dbms = require("../public/javascripts/dbms");


//listens to a POST request from the /orders route
router.post('/', (req, res) => {
    let month = req.body.month.toLowerCase();

    console.log(month);

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const monthNumber = months.indexOf(month) + 1;

    dbms.dbquery(
        `SELECT * FROM orders WHERE month = ${monthNumber}`,
        (err, results) => {
            if (err) {
                res.status(500);
            } else {
                res.json(results);
            }
        }
    );
});

//the "handle" for app.js to use this orders "tool"
module.exports = router;