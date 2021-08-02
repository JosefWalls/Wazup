const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    Message: String,
    Name: String,
    Timestamp: String,
    Received: Boolean
});

module.exports = mongoose.model("messagecontent", MessageSchema);