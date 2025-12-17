const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use('/api', transactionRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
