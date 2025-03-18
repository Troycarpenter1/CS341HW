//Troy Carpenter

const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/dbms'); // DB connection file

// Handle POST request to insert a new order
router.post('/', (req, res) => {
    const { toppingId, quantity, notes, month, year } = req.body;

    const query = `INSERT INTO orders (T_ID, quantity, notes, month, year)
                   VALUES (${toppingId}, ${quantity}, '${notes}', ${month}, ${year})`;

    db.dbquery(query, (err, results) => {
        if (err) {
            console.error('Error inserting order:', err);
            res.status(500).json({ error: 'Error adding order' });
        } else {
            res.json({ message: 'Order added successfully', orderId: results.insertId });
        }
    });
});

module.exports = router; // Ensure we export router, not an object!

