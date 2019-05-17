const api = require("express").Router();
const path = require("path");

api.get("/friends", function(request, response) {
    return response.json(friends);
});
api.post("/friends", function(request, response) {
});
module.exports = api;
