//Troy Carpenter
//use express framework
const express = require('express');
//makes a mini app to "route" things here rather than through app.js
const router = express.Router();

const getOrders = require('../public/javascripts/getOrders');

/*
//array of orders by month
const orders = {
    Jan: [
        { topping: 'Cherry', quantity: 1 },
        { topping: 'Plain', quantity: 25 },
        { topping: 'Chocolate', quantity: 2 }
    ],
    Feb: [
        { topping: 'Plain', quantity: 3 },
        { topping: 'Chocolate', quantity: 26 },
        { topping: 'Cherry', quantity: 4 }
    ],
    Mar: [
        { topping: 'Cherry', quantity: 5 },
        { topping: 'Plain', quantity: 27 },
        { topping: 'Chocolate', quantity: 6 }
    ],
    Apr: [
        { topping: 'Plain', quantity: 7 },
        { topping: 'Chocolate', quantity: 28 },
        { topping: 'Cherry', quantity: 8 }
    ],
    May: [
        { topping: 'Cherry', quantity: 9 },
        { topping: 'Plain', quantity: 29 },
        { topping: 'Chocolate', quantity: 10 }
    ],
    Jun: [
        { topping: 'Plain', quantity: 11 },
        { topping: 'Chocolate', quantity: 30 },
        { topping: 'Cherry', quantity: 12 }
    ],
    Jul: [
        { topping: 'Cherry', quantity: 13 },
        { topping: 'Plain', quantity: 31 },
        { topping: 'Chocolate', quantity: 14 }
    ],
    Aug: [
        { topping: 'Plain', quantity: 15 },
        { topping: 'Chocolate', quantity: 32 },
        { topping: 'Cherry', quantity: 16 }
    ],
    Sep: [
        { topping: 'Cherry', quantity: 17 },
        { topping: 'Plain', quantity: 33 },
        { topping: 'Chocolate', quantity: 18 }
    ],
    Oct: [
        { topping: 'Plain', quantity: 19 },
        { topping: 'Chocolate', quantity: 34 },
        { topping: 'Cherry', quantity: 20 }
    ],
    Nov: [
        { topping: 'Cherry', quantity: 21 },
        { topping: 'Plain', quantity: 35 },
        { topping: 'Chocolate', quantity: 22 }
    ],
    Dec: [
        { topping: 'Plain', quantity: 23 },
        { topping: 'Chocolate', quantity: 36 },
        { topping: 'Cherry', quantity: 24 }
    ]
};


//display all the orders stored in the array
router.get('/', (req, res) => {
    res.json(orders);
});
*/

//listens to a POST request from the /orders route
router.post('/', (req, res) => {
    //client data from selecting month
    const { month, year } = req.body;

    //checks if there is data that month
    getOrders.getOrdersForMonth(month, year, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving orders' });
        } else {
            res.json(results);
        }
    });
});

//the "handle" for app.js to use this orders "tool"
module.exports = router;