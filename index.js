var mysql = require('mysql2');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('test.ejs');
});


// users CRUD -----------------------------------------------------------------------------------------------
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM User', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.post('/users', (req, res) => {
    const user = req.body;
    var sql = "INSERT INTO User (Email, Password, Classification) VALUES ('" + user.Email + "', '" + user.Password + "', '" + user.Classification + "')";
    connection.query(sql, user, (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, ...user });
    });
});


app.put('/users/:id', (req, res) => {
    const user = req.body;
    connection.query('UPDATE User SET ? WHERE id = ?', [user, req.params.id], (err, results) => {
        if (err) throw err;
        res.json({ id: req.params.id, ...user });
    });
});


app.delete('/users/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE id = ?', req.params.id, (err, results) => {
        if (err) throw err;
        res.json({ id: req.params.id });
    });
});









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

