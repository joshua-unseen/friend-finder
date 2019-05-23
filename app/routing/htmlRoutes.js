    const html = require("express").Router();
    const path = require("path");

    html.get("/survey", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    html.get("/*", function(request, response) {    // gets anything passed to the server (except /survey, which is handled above.)
        response.sendFile(path.join(__dirname, "../public/home.html"));
    });
    
    module.exports = html;
