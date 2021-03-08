//app-setup.js
/*  This file exists to populate the database with some sample data
*/
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(function() {
    // we're connected!
    console.log("connected!");

    var characterSchema = mongoose.Schema({
      name: {type: String, required:true},
      role: {type: String, required:false},
      story: String
    });

    var Character = mongoose.model('Character', characterSchema);

    var chars = [
    { name: 'Adam Ewing', role: "Lawyer", story: "The Pacific Journal of Adam Ewing" },
    { name: 'Tilda Ewing', role: "Wife", story: "The Pacific Journal of Adam Ewing" },
    { name: 'Autua', role: "Stowaway", story: "The Pacific Journal of Adam Ewing" },
    { name: 'Luisa Rey', role: "Journalist", story: "Half-Lives: The First Luisa Rey Mystery" },
    { name: 'Rufus Sixsmith', role: "Physicist", story: "Half-Lives: The First Luisa Rey Mystery" },
    { name: 'Joe Napier', role: "Security", story: "Half-Lives: The First Luisa Rey Mystery" },
    { name: 'Timothy Cavendish', role: "Publisher", story: "The Ghastly Ordeal of Timothy Cavendish" },
    { name: 'Nurse Noakes', role: "Nurse", story: "The Ghastly Ordeal of Timothy Cavendish" },
    { name: 'Dermot Hoggins', role: "Gangster", story: "The Ghastly Ordeal of Timothy Cavendish" }
    ];

  /* Iterates over the array 'chars', creates a Character model object,
    *  and calls 'save' on each one. The Promise returned by the 'save()'
    *  operation is added to the 'saves' array.
    */
  var saves = chars.map((c, i)=>{
      return new Character(c).save((err, savedC)=>{
          console.log(`saved ${i}`);
      });
  });

    /*  Promise.all(saves) completes only when all of the Promises
    *   in the 'saves' array have been completed (fulfilled or rejected).
    */
    Promise.all(saves).then(()=>{
      Character.find({story: /Ghastly/i}, (err, characters)=>{
        if (err){console.log(err)}
        console.log(`found characters! ${characters}`);
      });
    });

}).catch((err)=>{console.error(err+ "database error!")});
