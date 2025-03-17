//Troy Carpenter

const db = require('./dbms.js');

exports.getOrdersForMonth = function(month, year, callback) {
    const query = `SELECT * FROM orders WHERE month = ${month} AND year = ${year}`;
    db.dbquery(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};
