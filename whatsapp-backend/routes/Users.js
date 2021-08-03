const Router = require("express").Router();
const Users = require("./../models/User");

Router.route("/New").post((req, res) => {
    const UserInformation = req.body;
    console.log(UserInformation)
    Users.create(UserInformation, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

Router.route("/AddUID").put((req, res) => {
    // the point of this route is to add the firebase id to mongo
    const {Email, FirebaseID} = req.body;
    Users.updateOne({Email: Email}, {$set: {FirebaseID: FirebaseID}})
    .then(res.status(200).send("Firebase id has been added"))
    .catch(err => res.status(500).send(err))
});

Router.route("/Random").get((req, res) => {
    Users.find({})
    .then((users) => {
        res.status(201).send(users)
    })
    .catch(err => res.status(500).send(err))
})

Router.route("/Search/:UserEmail").get((req, res) => {
    const {UserEmail} = req.params;
    console.log(UserEmail)
    Users.find({Email: new RegExp(UserEmail, "i")})
    .then((users) => {
        res.status(200).send(users)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})

module.exports = Router;