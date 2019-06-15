//Loads in NPM Modules that will be used
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const mongoose = require('mongoose');

//Loads in Mongoose Models that will be used
const Debt = require('./models/debt');

//Loads the mongoDB connection
require('./db/mongoose.js');

//Initializes the express server variable
const app = express();
app.use(express.json());
const port = process.allowedNodeEnvironmentFlags.PORT || 3000;

//Defines path for express to configure hbs
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Further setup for hbs, pointing to views and partials location on server
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Renders the main page
app.get('', (req, res) => {
    res.render('index', {
        name: 'Michael Boro'
    })
})


//Adds a new debt to the database with sent data
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

//Returns the requested Debt and displays the remaining balance
app.get("/seeDebt/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const debt = await Debt.findById(_id);
        const remaining = (debt.startingBalance - debt.amountPaid);
        res.send(`You have ${remaining} left to pay!`);
    } catch (e) {
        res.send(e);
    }
})


//Starts the server on the proper port
app.listen(port, () => {
    console.log(`Sever launched on port ${port}`);
})