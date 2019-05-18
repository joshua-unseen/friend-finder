const api = require("express").Router();
const path = require("path");
const fs = require("fs");

api.get("/friends", function(request, response) {
    var friends = fs.readFileSync(path.join(__dirname, "../data/friends.js")).data;
    return response.json(friends);
});
api.post("/friends", function(request, response) {
    var newFriend = request.body;
    var friends = fs.readFileSync(path.join(__dirname, "../data/friends.js")).data;
});

module.exports = api;
