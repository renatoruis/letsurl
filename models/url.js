const mongoose = require("mongoose");
const shortid = require("shortid");

// Define o schema para os URLs encurtados
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrlCode: {
    type: String,
    default: shortid.generate,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Url", urlSchema);
