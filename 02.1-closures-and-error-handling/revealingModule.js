//revealingModule.js
// This example uses closures and a "factory pattern", the Revealing Module pattern,
//  to create objects with their own scope. Video 2.5 in CSCI E31 walks thru this example.
function printableMessage() {
    var message = 'hello';
    function setMessage(newMessage) {
        message = newMessage;
    }

    function printMessage() {
        console.log(message);
    }

    return {
        setMessage: setMessage,
        printMessage: printMessage
    };
}

var myMessageUtil = printableMessage();
myMessageUtil.printMessage(); // hello

var myMessageUtil2 = printableMessage();
myMessageUtil2.setMessage("different hello!");
myMessageUtil2.printMessage();

myMessageUtil.printMessage(); // hello
