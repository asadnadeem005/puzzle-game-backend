import express from 'express';
import cors from "cors";

import conn from './dbConnection.js';
import {errorMiddleware} from './errorMiddleware.js'

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

// Define a route for the root URL
app.get('/',(req, res) => {
    const numbers = Array.from({ length: 16 }, (_, i) => i);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    res.send({data:numbers});
});

app.put('/update',async(req, res) => {
                const query = `UPDATE players
                SET name = ?, created_at = ?
                    WHERE name = '${req.body.name[0]}'
                    ORDER BY created_at DESC
                    LIMIT 1
                )`;
    await conn.query(query,[req.body.name,new Date()]);
    res.send("success");
});

app.post('/login',async(req, res) => {
    const query = 'INSERT INTO `players` (`name`,`created_at`) VALUES (?,?)';
    await conn.query(query,[req.body.name,new Date()]);

    const query2 = 'SELECT name, score, created_at FROM players WHERE name = ?';
    const scoreBoard = await conn.query(query2, req.body.name);
    res.send(scoreBoard[0]);
});

app.use(errorMiddleware);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

