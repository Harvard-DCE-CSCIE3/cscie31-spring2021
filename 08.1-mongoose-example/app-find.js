//app-find.js
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/cscie31?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then({
    console.log("connected!");

    var characterSchema = mongoose.Schema({
      name: {type: String, required:true},
      role: {type: String, required:false},
      story: {type: String, required:false}
    });
    var Character = mongoose.model('Character', characterSchema);

    // Here we use find() with a regular expression seach on the story field
    Character.find({story: /Ghastly/i})
      .where("role").equals("Nurse")
      .exec((err, characters)=>{
        console.log(`found characters! ${characters}`);
      });
}).catch((err)=>{console.error(err+ "errored out!")});
