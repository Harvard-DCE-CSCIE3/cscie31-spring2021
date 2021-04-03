function countWords(sentence:any):number{
  return (sentence as string).split(' ').length;
}
var n:number = countWords('12345');
console.log(n);
