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


// users CRUD -----------------------------------------------------------------------------------------------
// Read functionality
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM User', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create/Insert functionality
app.post('/users', (req, res) => {
    const user = req.body;
    var sql = "INSERT INTO User (Email, Password, Classification) VALUES ('" + user.Email + "', '" + user.Password + "', '" + user.Classification + "')";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, ...user });
    });
});

// Update functionality
app.put('/users/:id', (req, res) => {
    const user = req.body;
    connection.query('UPDATE User SET ? WHERE id = ?', [user, req.params.id], (err, results) => {
        if (err) throw err;
        res.json({ id: req.params.id, ...user });
    });
});

// Delete functionality
app.delete('/users/:id', (req, res) => {
    var sql = "DELETE FROM User WHERE id = '" + req.params.id + "'";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
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

