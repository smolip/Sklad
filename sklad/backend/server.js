require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db')
connectDB();

const app = express();
const PORT = 3001;

app.use(express.json());

// ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/movements', require('./routes/movements'));

// Middleware
app.use(cors()); // Povolí Reactu mluvit se serverem
app.use(express.json()); // Aby server uměl číst JSON data

// Testovací Route (Controller by byl normálně v souboru zvlášť)
app.get('/', (req, res) => {
  res.json({ message: "MVC Backend běží a zdraví MVVM Frontend!" });
});

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});