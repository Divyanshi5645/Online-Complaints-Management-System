const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const newPassword = process.argv[2];

if (!newPassword) {
    console.log('Please provide a new password as an argument.');
    console.log('Usage: node resetPassword.js <new_password>');
    process.exit(1);
}

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ocms');
        console.log('MongoDB Connected');

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findOneAndUpdate(
            { username: 'admin' },
            { password: hashedPassword },
            { new: true }
        );

        if (updatedUser) {
            console.log('✅ Password updated successfully for user: admin');
            console.log('New Password:', newPassword);
        } else {
            console.log('❌ Admin user not found.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

resetPassword();
