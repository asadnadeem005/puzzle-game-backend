import mysql from 'mysql2/promise';

// Create the connection to database
const conn = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'admin',
  database: 'puzzle',
});

export default conn;
