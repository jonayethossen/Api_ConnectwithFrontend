const { default: mongoose } = require("mongoose");

function dbConnect() {
  mongoose
    .connect(
      "mongodb+srv://crud:crud@cluster0.ppfwb.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("database is cnnected");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = dbConnect;
