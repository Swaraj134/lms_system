const mongoose = require("mongoose");

const URI = "mongodb+srv://lms_sp:ABCDEFG@lms.nurdig7.mongodb.net/lms_id";
const OPTIONS = {
   useUnifiedTopology: true,
   useNewUrlParser: true
};

function connect() {
   mongoose
      .connect(URI, OPTIONS)
      .catch((err) => console.log(err));
   
   mongoose.connection.on("connected", () => {
      console.log("\u2705 Connected to the MongoDB Atlas!");
   });
   
   mongoose.connection.on("error", (err) => {
      console.log(err.message);
   });
   
   mongoose.connection.on("disconnected", () => {
      console.log("\n\n\u2705 Mongodb connection closed!");
   });
   
   process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
   });
}

module.exports = connect;
