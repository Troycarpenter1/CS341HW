//Troy Carpenter
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//HW4
const orders = require('./routes/orders');
app.use('/orders', orders);

app.use('/', indexRouter);
app.use('/users', usersRouter);

//HW5
const newOrder = require('./javascriipts/newOrder');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Define a POST endpoint to handle new orders
app.post('/newOrder', (req, res) => {
    
  // Extract the order details from the request body
  const { toppingId, quantity, notes, month, year } = req.body;

  // Call the function to insert the order into the database
  newOrder.addNewOrder(toppingId, quantity, notes, month, year, (err, results) => {
      
      if (err) {
          // If an error occurs, send a 500 Internal Server Error response
          res.status(500).json({ error: 'Error adding order' });
      } else {
          // If successful, respond with a success message and the new order ID
          res.json({ message: 'Order added successfully', orderId: results.insertId });
      }
  });
});
module.exports = app;


