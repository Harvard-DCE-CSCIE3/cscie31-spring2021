//moduleusingnew.js
// This example uses constructor functions and the new keyword to create objects
//  with their own scope. Video 2.5 in CSCI E31 walks thru this example.
function printableMessage()  {
    var message = 'hello';
    this.setMessage = function (newMessage) {
        if (!newMessage) throw new Error('cannot set empty message');
        message = newMessage;
    }

    this.printMessage = function() {
        console.log(message);
    }
}

var myMessageUtil = new printableMessage();
myMessageUtil.printMessage(); // hello

var myMessageUtil2 = new printableMessage();
myMessageUtil2.setMessage("different hello!!")
myMessageUtil2.printMessage(); // different hello!

myMessageUtil.printMessage(); // hello
