const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const userModel = require("./models/user");
const methodOverride = require("method-override");

const app = express();

// View engine
app.set("view engine", "ejs");

// Middleware
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  try {
    let users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.log("cannot get lists of enquiries", error);
    res.status(500).json({ error: "failed to fetch users list" });
  }
});

app.get("/lists", async (req, res) => {
  try {
    let users = await userModel.find();
    res.render("read", { users });
  } catch (error) {
    console.log("cannot get lists of enquiries", error);
    res.status(500).json({ error: "failed to fetch users list" });
  }
});

app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ id: req.params.id });
  res.render("edit", { user });
});

app.post("/update/:id", async (req, res) => {
  let { name, email, message } = req.body;
  let user = await userModel.findOneAndUpdate(
    { id: req.params.id },
    { name, email, message },
    { new: true }
  );
  res.redirect("/lists");
});

app.get("/delete/:id", async (req, res) => {
  try {
    let users = await userModel.findOneAndDelete({ id: req.params.id });
    res.redirect("/lists");
  } catch (error) {
    console.log("Post cannot be deleted", error);
    res.status(500).json({ error: "post cannot be deleted" });
  }
});

app.post("/lists", async (req, res) => {
  let { id, name, email, message } = req.body;

  let createdUser = await userModel.create({
    id,
    name,
    email,
    message,
  });
  res.redirect("/lists");
});

// Port
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
