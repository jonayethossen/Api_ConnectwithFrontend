const { default: mongoose } = require("mongoose");
let todoSchema = new mongoose.Schema({
  task: {
    type: String,
  },
});
module.exports = mongoose.model("Todo", todoSchema);
