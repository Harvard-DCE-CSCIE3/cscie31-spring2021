const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{

    console.log("connected!");
    const characterSchema = mongoose.Schema({
      name: {type: String, required:true},
      role: {type: String, required:false},
      story: {type: String, required:false}
    });

    const Character = mongoose.model('Character', characterSchema);

    var c1 = new Character({ name: 'Bill Smoke', role: "Assassin", story: "Half-Lives: The First Luisa Rey Mystery" });

    c1.save((err, c)=>{
      if (err) {console.log(err);}
      console.log(`Saved Character ${c}`);

      Character.find({}, (err, characters)=>{
        if (err){console.log(err)}
        console.log(`found characters! ${characters}`);

        c.remove((err, r)=>{
          if (err) console.log(err);
          console.log(`removed ${r}`);
        });
      });
    });

  })
  .catch((err)=>{ console.error(`database connection error:${err}`); })