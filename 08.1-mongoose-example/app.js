//app.js
const mongoose = require("mongoose");

// Connect to mongoDB on MongoDB Atlas
// (This is a basic demo with no error handling)
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/cscie31?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

console.log("connected!");
console.log(mongoose.connection);

// Create a Schema that describes the 'shape' of a document in our collection
var characterSchema = mongoose.Schema({
  name: {type: String, required:true},
  role: {type: String, required:false},
  story: {type: String, required:false}
});

// Initialize a Model - the basis for a 'document' or record based on the schema
var Character = mongoose.model('Character', characterSchema);

// Use the model to create a new Character 'document' containing one record of data
var c1 = new Character({ name: 'Bill Smoke', role: "Assassin", story: "Half-Lives: The First Luisa Rey Mystery" });

// Save the new character to the database
c1.save((err, c)=>{
  if (err){ console.log(err) }  // in a real app we'd probably return an error here
  console.log(`saved character! ${c}` );

  // now that we've saved, let's do a find() to see our record(s)
  Character.find({}, (err, characters)=>{
    if (err){console.log(err)}
    console.log(`found characters! ${characters}`);
  });
});
