const express = require("express");
const path = require("path");   // not necessary in this file, I guess.

//The route files
const html = require("./app/routing/htmlRoutes");
const api = require("./app/routing/apiRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// External route files
app.use("/api", api);
app.use("/", html);


// Start the server
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
