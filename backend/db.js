const mongoose = require('mongoose');

// Password is now URL-encoded
const mongoURI = `mongodb+srv://Avantika:avantika%40890@cluster0.b8k7t.mongodb.net/CloudScript?retryWrites=true&w=majority`

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Error: ", err);
    }
}

module.exports = connectToMongo;
