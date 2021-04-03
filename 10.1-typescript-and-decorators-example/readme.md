## Typescript Basic Demo
This repo accompanies video 10.2, 10.3 and 10.6 in CSCI E31.

To run the code, you'll need NodeJS installed, as well as typescript (`npm install -g typescript`).  

If you plan to edit the typecript code, you can set the typescript transpiler to watch for changes to your `.ts` files by doing `tsc -w`.  You can execute your `.js` code with `node [filename]`. **Note:** You will not execute your `.ts` code - it gets transpiled to `.js`, which you execute as usual using the node runtime.

### Contents
+ `typescript.ts`: Simple example of Typescript code. `typescript.js` is the transpiled Javascript. 
+ `decorator.ts`:  Example of creating both a class and a function decorator. `decorator.js` is the transpiled Javascript
+ `nmod.js` and `tmod.ts`: Modules using the respective module systems of NodeJS and Typescript
+ `nimport.js` and `timport.ts`: Code that implements the modules in the previous files

### Example Output
```
$ node nimport
2018-03-14T13:09:26.805Z
[ 'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday' ]
$
$ node timport
2018-03-14T13:13:39.877Z
[ 'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday' ]
$  
```
