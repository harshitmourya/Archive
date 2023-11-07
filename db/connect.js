
const mongoose = require("mongoose");

mongoose.set('strictQuery',false)
const connectDB = (uri) => {
    console.log("Db Connected")
    return mongoose.connect(uri, {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};


module.exports = connectDB; 