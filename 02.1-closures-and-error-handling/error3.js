// See CSCI E31 Video 2.6
// error properly handled in callback itself
setTimeout(function(){
  try{
    console.log('About to throw an error');
    var str;
    str.indexOf("a");
  }
  catch(e){
    console.log('Catch: I will only execute if an error is thrown');
    console.log('Error caught: ', e.message);
  }
  finally {
    console.log('Finally: I will execute irrespective of an error thrown');
  }
}, 1000);
