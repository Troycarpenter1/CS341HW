//Troy Carpenter

const db = require('../public/javascripts/dbms.js');

exports.addNewOrder = function(toppingId, quantity, notes, month, year, callback) {
    const query = `INSERT INTO orders (T_ID, quantity, notes, month, year)
                   VALUES (${toppingId}, ${quantity}, '${notes}', ${month}, ${year})`;
    console.error('${query}');
    db.dbquery(query, (err, results) => {
        if (err) {
            console.error('Error inserting order:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};
