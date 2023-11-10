const express = require("express");
const path = require("path");
const connect = require("./connection");
const User = require("./models/User.model");

// Server Instance
const app = express();

// Application Configuration
const PORT = process.env.PORT ?? 3000;

// Basic Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "views/studentlogin.html"));
});

app.get("/dashboard", (req, res) => {
   res.sendFile(path.join(__dirname, "views/desktop.html"));
});

app.post("/login", async (req, res) => {
   // Extracting user inputs.
   const { email, password } = req.body;
   
   // Validating the user data.
   if (!email || !password) {
      res.status(404).json({ message: "Please provide the credentials!" });
      return;
   }
   
   try {
      const doExits = await User.findOne({ email, password });
      console.log(doExits);
      if (doExits) {
         res.status(200);
         res.redirect("/dashboard");
         res.end();
      } else {
         res.status(404);
         res.redirect("/");
         res.end();
      }
   } catch (err) {
      res.status(500);
      res.json({ error: err });
      res.end();
   }
});

app.post("/signup", async (req, res) => {
   // Extracting user inputs.
   const { phone_number,email, password } = req.body;
   
   // Validating the user data.
   if (!email || !password) {
      res.status(404).json({ message: "Please provide the credentials!" });
      res.end();
      return;
   }
   
   try {
      const doExits = await User.findOne({ email, password });
      if (doExits) {
         res.send("You are already our user please login to continue!");
      } else {
         const user = new User({ phone_number,email, password });
         const result = await user.save();
         res.status(200);
         res.redirect("/");
         res.end();
      }
   } catch (err) {
      res.status(500);
      res.json({ error: err });
      res.end();
   }
});

// Server Port Serving & Listening
app.listen(PORT, () => {
   connect();
   console.log(`\u2705 Server started at http://localhost:${PORT}`);
});