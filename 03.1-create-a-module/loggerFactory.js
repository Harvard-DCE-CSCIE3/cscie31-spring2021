/* loggerFactory.js */

//  this function returns the logger object
var logger = function(){
  console.log("initialize new logger");
  
  return {
    log : function(message){
      let time='';
      if (this.showtime){
        time = new Date().toTimeString();
      }else{
        time = '## ';
      }
      console.log(time + ":" + message);
    },
    showtime: true
  }
}

module.exports = logger;   // exports the function
