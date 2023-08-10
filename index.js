// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // display basic html file that launches root directory.
    res.sendFile(__dirname + '/public/index.html');
});

// create path to display Hello World in an html file.
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// retrieve pets from the API data.js.
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.json(pets);
});

// retrieve pet by name from data.js.
app.get('/api/v1/pets/:name', (req, res) => {
    // input a pet name in parameter.
    const name = req.params.name;

    // Find corresponding pet name inside of pet array.
    const pet = pets.find(pet => pet.name === name);

    // display pet object matching named input.
    if (pet) {
        res.json({ name: pet.name });
    } else { // display 404 if no pet matches in array objects.
        res.status(404).json({ message: 'Pet not found' });
    }
});

// retrieve a pet corresponding with owner of pet(s).
app.get('/api/v1/pets/owner', (req, res) => {
    // input owner name in parameter
    const owner = req.query.owner;

    // get pet corresponding with owner name.
    const matchingPets = pets.filter(pet => pet.owner === owner);

    // display matching pet to owner
    if (matchingPets.length > 0) {
        res.json(matchingPets);
    } else { // display 404 if no pet matches owner.
        res.status(404).json({ message: 'No pets found for the specified owner' });
    }
});


app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
