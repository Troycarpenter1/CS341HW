//Troy Carpenter
//use express framework
const express = require('express');
//makes a mini app to "route" things here rather than through app.js
const router = express.Router();

var dbms = require("../public/javascripts/dbms");


//listens to a POST request from the /orders route
router.post('/', (req, res) => {
    const { toppingId, quantity, notes, month, year } = req.body;

    const query = `INSERT INTO orders (T_ID, quantity, notes, month, year)
                   VALUES (${toppingId}, ${quantity}, '${notes}', ${month}, ${year})`;

    dbms.dbquery(query, (err, results) => {
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