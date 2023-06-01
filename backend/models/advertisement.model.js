const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const advertisementSchema = new Schema(
  {
    position: {
        type: number,
        required: true,
    },
    size: {
        type: number,
        required: true
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

advertisementSchema.index({'$**': 'text'});

module.exports = mongoose.model("Advertisement", advertisementSchema);

