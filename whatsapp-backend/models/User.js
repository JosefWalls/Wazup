const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    Username: String,
    Email: String,
    Phone: String,
    HeaderImage: String,
    FirebaseID: String,
    Status: String
    // password will be stored in firebase, this is just for like grabbing header image and stuff
});

module.exports = mongoose.model("User", UserSchema)