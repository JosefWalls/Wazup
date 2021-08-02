const express = require("express");
const mongoose = require("mongoose");
const Pusher  = require("pusher");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1243701",
    key: "0fe764646b7b18e061e7",
    secret: "22aebf0a6f1649ab4bdc",
    cluster: "us2",
    useTLS: true
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("DB Is connected");

    const msgColletion = db.collection("messagecontents");
    const changeStream = msgColletion.watch();

    changeStream.on("change", (change) => {
        if(change.operationType  === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                Name: messageDetails.Name,
                Message: messageDetails.Message,
                Timestamp: messageDetails.Timestamp,
                Received: messageDetails.Received
            })
        } else {
            console.log("there was a error pushing")
        }
    })

})

app.use(express.json());
app.use(cors());

const connection_url = 'mongodb+srv://admin:Lm1YzXSZL6vyrjzz@cluster0.rr1va.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

app.get("/", (req, res) => res.status(200).send("hello"));

const MessageRouter = require("./routes/Messages");
const UserRouter = require("./routes/Users");

app.use("/Messages", MessageRouter); 
app.use("/Users", UserRouter);

app.listen(port, () => console.log(port + " is working good"))