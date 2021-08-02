const Router = require("express").Router();
const Users = require("./../models/User");

Router.route("/New").post((req, res) => {
    const UserInformation = req.body;
    Users.create(UserInformation, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

module.exports = Router;