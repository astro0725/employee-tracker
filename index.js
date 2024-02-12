db = require('./db/connections'); 
const appTitle = './lib/title.js';
const options = require('./lib/queries');

// Function to start the application
function startApp() {
    console.log(appTitle);
    options(); // Call the options function to display the main menu
}

db.promise().connect()
    .then(() => {
        console.log('Connected to the database.');
        startApp();
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });
