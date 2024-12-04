const mongoose = require('mongoose');


const connectDB = async () => {
    
    const MongoURI=process.env.MONGO_URI;
    
    if (!MongoURI ) {
        console.error('MongoDB URI or Database Name is not defined in environment variables.');
        process.exit(1);
      }
    try {
        let connect=await mongoose.connect(`${MongoURI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;