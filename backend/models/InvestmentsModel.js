const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var investmentsSchema = new Schema(
  {
    companyid: { type: String },
    investorid: { type: String },
    stage: { type: String },
    funding: { type: String },
  },
  {
    versionKey: false,
  }
);

const investmentsModel = mongoose.model("investment", investmentsSchema);
module.exports = investmentsModel;
