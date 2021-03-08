//app-promise.js
const mongoose = require("mongoose");

// Use ES6 native Promises as promise library
mongoose.Promise = global.Promise;

// Connect to mongoDB on MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{

  console.log("connected!");

  // Create a Schema that describes the 'shape' of a document in our collection
  var characterSchema = mongoose.Schema({
    name: {type: String, required:true},
    role: {type: String, required:false},
    story: {type: String, required:false}
  });

  // Initialize a Model - the basis for a 'document' or record based on the schema
  var Character = mongoose.model('Character', characterSchema);

  // Use the model to create a new Character 'document' containing one record of data
  var c1 = new Character({ name: 'Adam Ewing', role: "Lawyer", story: "The Pacific Journal of Adam Ewing" });

 
 // newChar will keep the value of 'c', the saved record, in function scope so
 // we can use it when we make our call to remove() 
 let newChar;
 
 /* Save the new character to the database
  * save() returns a Promise, which has a .then() method that's called
  *  when the operation completes (is either fulfilled or rejected)
  */
 
 c1.save()
 .then((c)=>{
   console.log(`Saved Character ${c}`);
   newChar = c;
 })
 .then(()=>{
   return Character.find({})
 })
 .then((characters)=>{
     console.log(`found characters! ${characters}`);
 })
 .then(()=>{
   return newChar.remove();
 })
 .then((removedRecord)=>{
   console.log(`Removed this record: ${removedRecord}`);
 })
 .catch((err)=>{console.log(`Error in save/find/remove${err}`)});

  
}).catch((err)=>{ console.error(`database connection error:${err}`);}) 