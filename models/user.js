const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sadiq08:yj8xwvAJE4eSgZCZ@cluster0.7ya1ans.mongodb.net/Enquiry_db?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log("Cannot connect to Database", err));

const userSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("data", userSchema);
