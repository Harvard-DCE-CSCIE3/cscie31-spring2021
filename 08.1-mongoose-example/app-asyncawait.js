//app-asyncawait.js
const mongoose = require("mongoose");

// Use ES6 native Promises as promise library
mongoose.Promise = global.Promise;

// Connect to mongoDB on MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
  /* To use the async/await construct, the function that encloses our asychronous
   *  'await' calls must be preceded by the 'async' keyword. In this case, it was
   *  necessary to use the Promise returned by mongoose.connect() to create function
   *  scope for our code. This function gets the 'async' keyword, which lets us
   *  use 'await' in our code below.
   */
  .then(async function() {
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

    //  standard try/catch for errors
    try{
      let c = await c1.save();
      console.log(`saved character! ${c}`);

      let characters = await Character.find({});
      console.log(`found characters! ${characters}`);

      let res = await c.remove();
      console.log(`Removed ${res}`);
    } catch(err){
      console.log(`Error! ${err}`);
    }
}).catch((err) =>{ console.log(`connection error: ${err}`) });
