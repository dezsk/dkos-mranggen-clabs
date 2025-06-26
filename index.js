const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();

// Swagger Documentation
const swagger = require('./swagger');
swagger(app);

// Middleware & Routing
app.use(cors());
app.use(express.json());

// Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Admin Routes
const adminRoutes = require('./routes/admin/adminRoutes');
const adminChatRoutes = require('./routes/admin/chatRoutes');
app.use('/api/admin', adminRoutes);
app.use('/api/admin', adminChatRoutes);

// User Routes
const userRoutes = require('./routes/user/userRoutes');
const bookingRoutes = require('./routes/user/bookingRoutes');
const userChatRoutes = require('./routes/user/chatRoutes');

app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/user', userChatRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));