const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;



var investorsSchema = new Schema(
  {
    // companiesInvestedIn:  [{
    //   companyid: {type: String},
    //   name: { type: String },
    //   stage: { type: String },
    //   funding: { type: String },
    // }],
    contact: { type: Object },
    description: { type: String },
    investmentDomains: { type: Array },
    investorType: { type: String },
    links: { type: Array },
    name: { type: String },
    password: { type: String },
    totalFunding: { type: String },
  },
  {
    versionKey: false,
  }
);

investorsSchema.pre('save', function(next) {
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


investorsSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}


const investorsModel = mongoose.model("investor", investorsSchema);
module.exports = investorsModel;
