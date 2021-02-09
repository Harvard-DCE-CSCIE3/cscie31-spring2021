/* app.js */
var logFac = require('./loggerFactory');   // require returns a 'factory' function
var logger = logFac();                     // we call the factory function, which returns the logger

console.log("manual logging");
logger.log("first logger.log call");       // logs with timestamp

var log2 = logFac();                       // call the factory function again to create log2
log2.showtime = false;                     // set showtime=false in new module
log2.log("first log2 call");               // logs without timestamp

logger.log("second logger call");          // logs with timestamp - log2 and logger are separate objects
