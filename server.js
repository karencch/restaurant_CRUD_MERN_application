require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurantModel');
const restaurantRoute = require('./routes/restaurantRoute'); // This imports resetaurantRoute.js into server.js
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
// Note: will use render to deploy my application to server

const app = express();

// Regarding cors. If you want to connect front end to back end, need to allow a specific IP or domain name to access your application (ie., to send a request to your backend application). Set cors policy on backend side.

const PORT = process.env.PORT || 3000;  //This line means: If doesn't use PORT, then use 3000.
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions)); // corsOptions will allow only the specified domain(s) here to have access to your backend/API


// Need to use json middeware so our application can understand json:
app.use(express.json());

// ****** ROUTES: 

// Need middleware to use restaurantRoute.js
app.use('/api/restaurants', restaurantRoute);

// GET
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, my name is k!')
  });

// Use our error middleware:
app.use(errorMiddleware)

// Moved app.listen into mongoose.connect.then because want the app to connect to the database first before the app runs
mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to mongodb");
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
      });
}).catch((error) => {
    console.log(error)
})