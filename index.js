const {Client} = require('pg');

const connection = new Client({
    host:'localhost',
    port:5432,
    user:'postgres',
    password:'admin',
    database: 'myDB'
})


connection.connect().then(() => console.log("Connected"))