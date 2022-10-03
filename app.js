const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Cucumber",
  rating: 10,
  review: "Pretty solid as a fruit."
});

const pineapple = new Fruit ({
  name: "Pineapple",
  rating: 8,
  review: "Great fruit"
});

pineapple.save()

const manSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // embeding a fruit dataBase
  favouriteFruit: fruitSchema
});

const John = mongoose.model("John", manSchema);

const john = new John ({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

john.save();
// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "THe best fruit!"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   rating: 2,
//   review: "Bad"
// });

fruit.save();

// model
// Fruit.insertMany([kiwi,orange], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully saved all the fruits to fruitsDB");
//   }
// });

// Find any filed in a DataBase
Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// Update any field in DataBase
// Fruit.updateOne({_id: "631e59d9c79422bcfec2a4a5"}, {name:"Dragon"}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Succesfully updated");
//   }
// });
John.updateOne({_id: "631e5f7444e251c399744aa4"}, {favouriteFruit: fruit}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log("Succesfully updated");
  }
});

// Deletes an object from DataBase
// Fruit.deleteOne({name: "Apple"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted");
//   }
// });
// Deletes an all objects from DataBase
// John.deleteMany({name: "John"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted");
//   }
// });
