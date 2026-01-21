const mongoose = require('mongoose');

// PASTE YOUR CONNECTION STRING HERE TO TEST
const uri = "mongodb+srv://divyanshiparashar2:Jagdishp021@cluster0.32kib.mongodb.net/ocms?retryWrites=true&w=majority";

console.log("Testing connection to:", uri.split('@')[1]);

mongoose.connect(uri)
    .then(() => {
        console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ FAILURE: Connection failed.");
        console.error("Error Message:", err.message);
        if (err.message.includes("bad auth")) {
            console.error("\nTIP: Username ya Password galat hai. Atlas Dashboard par jaakar 'Database Access' check karein.");
        } else if (err.message.includes("ETIMEDOUT") || err.message.includes("not authorized")) {
            console.error("\nTIP: IP Whitelist check karein (Network Access -> 0.0.0.0/0).");
        }
        process.exit(1);
    });
