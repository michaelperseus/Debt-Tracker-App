const express = require('express');
const mongoose = require('mongoose');
const Debt = require('./models/debt');

require('./db/mongoose.js');


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the page!")
});

app.post("/newDebt", async (req, res) => {
    console.log(req.body);
    const debt = new Debt(req.body);
    try {
        await debt.save();
        res.status(201).send("Debt added successfully!");
    } catch (e) {
        res.status(500).send(e);
    }
    
})

app.listen(3000, () => {
    console.log("App launched on port 3000");
})