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
    console.log(newFriend);
    var friends = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/friends.js"), "utf-8"));
    // handle the comparison here
    var bestFriend = findFriend(friends, newFriend.scores);
    // then add the new person to the array
    friends.push(newFriend);
    // return the best match
    response.json(bestFriend);
    // write the array to the file, overwriting the entire file.
    fs.writeFile(path.join(__dirname, "../data/friends.js"), JSON.stringify(friends), (err) => {
        if (err) throw err;
        console.log("friends.js updated.");
    });
});

// This walks through the friends array and uses the totalDiff() to find the best match.
function findFriend(friends, myScores) {
    var theIndex;
    var leastDiff = 100; // initialize to a high value; any comparison will be better...
    console.log("Total score differences:")
    for (var i = 0; i < friends.length; i++) {
        var newDiff = totalDiff(friends[i].scores, myScores);
        console.log(friends[i].name + ": " + newDiff);
        if (newDiff < leastDiff) {
            leastDiff = newDiff;
            theIndex = i;
        }
    }
    return friends[theIndex];
}

// This computes the total score difference
function totalDiff(compare, myScores) {
    var td = 0;
    for (var i = 0; i < compare.length; i++) {
        td += Math.abs(compare[i] - myScores[i]);
        // console.log(Math.abs(compare[i] - myScores[i]));
    }
    return td;
}

module.exports = api;
