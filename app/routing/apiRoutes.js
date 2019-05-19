const api = require("express").Router();
const path = require("path");
const fs = require("fs");

api.get("/friends", function(request, response) {
    // Using .readFileSync 'cuz I'd rather not deal with a callback inside a callback...
    var friends = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/friends.js"), "utf-8"));
    return response.json(friends);
});
api.post("/friends", function(request, response) {
    var newFriend = request.body;
    var friends = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/friends.js"), "utf-8"));
    // handle the comparison here
    var bestFriend = findFriend(friends, newFriend.scores);
    // then
    friends.push(newFriend);
    console.log(newFriend);
    response.json(newFriend);
    // fs.writeFile(path.join(__dirname, "../data/friends.js"), JSON.stringify(friends), (err) => {
    //     if (err) throw err;
    //     console.log("friends.js updated.");
    // });
});

function findFriend(friends, myScores) {
    var theIndex;
    var leastDiff = 100; // initialize to a high value so comparison is simpler
    for (var i = 0; i < friends.length; i++) {
        var newDiff = totalDiff(friends[i].scores, myScores);
        if (newDiff < leastDiff) {
            leastDiff = newDiff;
            theIndex = i;
        }
        return friends[theIndex];
    }
}

function totalDiff(compare, myScores) {
    var td = 0;
    for (var i = 0; i < compare.length; i++) {
        td += Math.abs(compare[i] - myScores[i]);
    }
    return td;
}

module.exports = api;
