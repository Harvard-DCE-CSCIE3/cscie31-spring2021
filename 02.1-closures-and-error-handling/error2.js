// See CSCI E31 Video 2.6
// error in asynchronous call - not caught or handled 
try{
  setTimeout(function(){
    console.log('About to throw an error');
    var str;
    str.indexOf("a");
  }, 1000);
}
catch(e){
  console.log('Catch: I will only execute if an error is thrown');
  console.log('Error caught: ', e.message);
}
finally {
  console.log('Finally: I will execute irrespective of an error thrown');
}
