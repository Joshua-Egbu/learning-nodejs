require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => res.send("My Week 2 API!"));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date()}`);
    next();
})
app.post('/user', (req, res) => {
    const { name, email} = req.body;
    if (!name || !email) return res.status(400).json({ error: "Missing fields" })
    res.status(201).json({ message: `Hello ${name}`});
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.send(`User ${id} profile`);
})

app.listen(PORT, () => console.log(`API is live on port ${PORT}`) );