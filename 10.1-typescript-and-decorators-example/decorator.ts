
function timer(){
  return function(target:any, key:string, descriptor:PropertyDescriptor){
    var decoratedFunction = descriptor.value;
    descriptor.value = function(...args:any[]){
      console.log(`starting ${target} at ${new Date()}`);
      decoratedFunction.apply(this, args);
      console.log(`completing ${target} at ${new Date()}`);
    }
  }
}

function courseProperty(target: any){
  Object.defineProperty(target.prototype, 'course', {value: "CSCIE31"});
}

@courseProperty
class myClass {

  @timer()
  doSomething(){
    console.log("i'm doing something!");
  }

}

let c = new myClass();
c.doSomething();
console.log(c.course);
