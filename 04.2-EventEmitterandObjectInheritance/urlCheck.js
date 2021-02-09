
var EventEmitter = require("events");

class UrlCheck extends EventEmitter {

  check(url){
    console.log("From urlcheck module: "+ url);
    if (url.includes("/image/")){
          console.log("UrlCheck: emitting image event");
          this.emit("image", url);
      }
  }
}
module.exports = new UrlCheck();
