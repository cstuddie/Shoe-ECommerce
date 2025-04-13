var mysql = require('mysql2');
const express = require('express');
const app = express();
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// redirect for testing
app.get('/', (req, res) => {
    connection.query('SELECT * FROM User', (err, users) => {
        if (err) throw err;
        res.render('test.ejs', {users});
    });
});


// Search --------------------------------------------------------------------------

app.get('/', (req, res) => {
    connection.query('SELECT * FROM User', (err, users) => {
        if (err) throw err;
        res.render('test.ejs', {users});
    });
});


// Browse functionality
app.get('/products', (req, res) => {
    connection.query('SELECT * FROM Products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// users CRUD -----------------------------------------------------------------------------------------------

// login and permissions setup :)


// Read functionality - displays list of all users - for admin only
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM User', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create/Insert functionality
/*app.post('/users', (req, res) => {
    const user = req.body;
    var sql = "INSERT INTO User (Email, Password, Classification) VALUES ('" + user.Email + "', '" + user.Password + "', '" + user.Classification + "')";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, ...user });
    });
});*/

// create that checks if there is a duplicate account and warned you if there isn't.
// creates user account
const checkSql = "SELECT * FROM User WHERE Email = ?";
connection.query(checkSql, [user.Email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
        return res.status(409).json({ message: 'User already exists. Try again.' });
    }
    
    // Now safe to insert
    app.post('/users', (req, res) => {
        const user = req.body;
        var sql = "INSERT INTO User (Email, Password, Classification) VALUES ('" + user.Email + "', '" + user.Password + "', '" + user.Classification + "')";
        connection.query(sql, (err, results) => {
            if (err) throw err;
            res.json({ id: results.insertId, ...user });
        });
    });

});

// Update functionality - wait on jacob
app.put('/users/:id', (req, res) => {
    const user = req.body;
    connection.query('UPDATE User SET ? WHERE id = ?', [user, req.params.id], (err, results) => {
        if (err) throw err;
        res.json({ id: req.params.id, ...user });
    });
});

// Delete functionality - deletes user account
app.delete('/users/:id', (req, res) => {
    var sql = "DELETE FROM User WHERE id = '" + req.params.id + "'";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Customer dashboard functionality
// create, read self info, update info, and delete account (all in user functionality)

// Seller dashboard functionality
// has all user functionality but can also create, read, update and delete their own products

// checks if a duplicate product exists, sends warning if it does.
// creates a new product - work on this!
// THIS MIGHT NOT BE CORRECT COMPLETELY TO JACOB'S STUFF - just something i found/made
// please tweak
const checkProductSql = "SELECT * FROM Products WHERE ProductID = ?";
connection.query(checkProductSql, [products.ProductID], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
        return res.status(409).json({ message: 'Product already exists. Try again.' });
    }
    
    // Now safe to insert
    const insertSql = "INSERT INTO Products (ProductID, Name, Description, Category, SellerID, SellerBrand, Quantity) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(insertSql, [products.ProductID, products.Name, products.Description], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, ...user });
    });
});

// Reads and displays all of the seller's products.
app.get('/products', (req, res) => {
    connection.query('SELECT * FROM Products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Deletes a specific product
app.delete('/products/:id', (req, res) => {
    var sql = "DELETE FROM Products WHERE ProductID = '" + req.params.id + "'";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Admin dashboard functionality

// Read functionality - displays list of all users - for admin only
app.adminUserGet('/users', (req, res) => {
    connection.query('SELECT * FROM User', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Delete functionality - delete a user's account upon request
app.adminProductDelete('/users/:id', (req, res) => {
    var sql = "DELETE FROM User WHERE id = '" + req.params.id + "'";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Reads and displays all products for monitoring
app.adminProductGet('/products', (req, res) => {
    connection.query('SELECT * FROM Products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Connections
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

var connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'asdlfkj12345',
    password: 'drghudla',
    database: 'asdlfkj12345'
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

