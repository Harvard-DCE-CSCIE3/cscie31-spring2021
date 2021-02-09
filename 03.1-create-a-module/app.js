/* app.js */
var logger = require('./logger');

// we'll require the JS file 'data.js'
var d = require('./data');
var e = require('./data');

logger.log(d.school);   // Harvard
logger.log(e.school);   // Harvard
d.school = 'MIT';       //  sets 'school' property in all shared instances of the object returned by require('./data')
logger.log(d.school);   // MIT
logger.log(e.school);   // MIT


console.log("manual logging");
logger.log("first logger.log call");   // logs with timestamp

var log2 = require('./logger');        // require the same module again
log2.showtime = false;                 // set showtime=false in new module
log2.log("first log2 call");           // logs without timestamp

logger.log("second logger call");      // logs without timestamp - log2 and logger point to the same object with showtime=false
