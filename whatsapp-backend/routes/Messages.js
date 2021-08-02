const Router = require("express").Router();
const Messages = require("../models/Messages");


Router.route("/new").post((req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

Router.route("/sync").get((req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

module.exports = Router;