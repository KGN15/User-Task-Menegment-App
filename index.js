const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./models/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
  res.render("index");
});
//users route
app.get("/users", async (req, res) => {
  let users = await userRouter.find()
  res.render("users", { users });
});


app.get("/edit/:id", async (req, res) => {
  let users = await userRouter.findOne({ _id: req.params.id })
  res.render("edit", { users });
});


app.post("/update/:id", async (req, res) => {
  let { Image, name, email } = req.body;
  let users = await userRouter.findOneAndUpdate({ _id: req.params.id }, {Image, name, email}, { new: true })
  res.redirect("/users");
});


app.get("/delete/:id", async (req, res) => {
  let userDelet = await userRouter.findOneAndDelete({ _id: req.params.id })
  res.redirect('/users');
});





app.post("/create", async (req, res) => {
  let { name, email, Image } = req.body;
  let userCreat = await userRouter
    .create({
      name,
      email,
      Image,
    })
  res.redirect('/users');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
