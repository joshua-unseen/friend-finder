# friend-finder
Sort of a dating app, I guess.

## Frameworks
Node.js, Express, jQuery, Bootstrap

## Function
This web app presents a survey of 10 questions, using browser-native form validation.  Based on the answers to that survey, it matches the user with a previous respondent by computing the total difference in scores, and presents the "best friend" match to the user in a bootstrap modal.  It then stores the current respondent in the /data/friends.js flat file to match against future respondents.

Express routing is stored in external files to the main server.js file, in the /routing directory.  The html pages are stored in /public.

I apologize for the minimal comments.