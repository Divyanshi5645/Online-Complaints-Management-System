const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ocms');
        console.log('MongoDB Connected');

        const existingUser = await User.findOne({ username: 'admin' });
        if (existingUser) {
            console.log('Admin user already exists');
            process.exit();
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const adminUser = new User({
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
