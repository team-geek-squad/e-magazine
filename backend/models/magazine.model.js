const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const magazineSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
        unique: true
    },
    downloadURL: {
        type: String,
        required: true,
        unique: true
    }
  },
  {
    timestamps: true,
  }
);

magazineSchema.index({'$**': 'text'});

module.exports = mongoose.model("Magazine", magazineSchema);

