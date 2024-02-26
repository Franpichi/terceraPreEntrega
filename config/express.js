const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/tickets', ticketRoutes);

module.exports = app;
