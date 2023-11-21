const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

var companiesSchema = new Schema(
  {
    domain: { type: String },
    status: { type: String },
    categoryList: { type: Array },
    contact: { type: Object },
    description: { type: String },
    employeeCount: { type: String },
    foundedOn: { type: String },
    founders: { type: Array },
    homepageUrl: { type: String },
    links: { type: Array },
    name: { type: String },
    numFundingRounds: { type: String },
    password: { type: String },
    people: { type: Array },
    revenueRange: { type: String },
    totalFundingUsd: { type: String },
    investors:  [{
      investorid: {type: String},
      name: { type: String },
    }],
  },
  {
    versionKey: false,
  }
);

companiesSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    console.log(document);
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});


companiesSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}


const companiesModel = mongoose.model("company", companiesSchema);
module.exports = companiesModel;
