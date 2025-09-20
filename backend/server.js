const express = require('express');
const app = express();
const mongoose = require('mongoose'); //Assigns the mongoose function to the mongoose variable.
const cors = require('cors');   // <--- import cors
const port = 5000;

// Allow requests from your frontend
app.use(cors());


app.use(express.json()); //Allows parsing JSON in request body. This tells Express to parse incoming JSON data and fill req.body with it.




const usersRoutes = require('./routes/usersRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

app.use('/', usersRoutes);
app.use('/', settingsRoutes);

app.get('/', (req, res) => {
    res.send("Hello from the backend");
})

mongoose.connect('mongodb://localhost:27017/cryptoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB database');
})
.catch((err) => {
    console.error('Failed to connect to database')
});

app.listen(port, () => { // This starts the server and listens on the specified port.
  console.log(`🚀 Server running at http://localhost:${port}`);
});

