const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = "mysecretsshhh";
// Import Mongo Models
const Companies = require("../models/CompaniesModel");
const Investors = require("../models/InvestorsModel");
const Investments = require("../models/InvestmentsModel");

//authenticate user with login & password.
router.post("/api/authenticate", function (req, res) {
  const { usertype, email, password } = req.body;
  if (usertype.toLowerCase() === "company") {
    var entity = Companies;
  } else if (usertype.toLowerCase() === "investor") {
    var entity = Investors;
  } else {
    res.status(500).send("Entity type not specified.");
  }
  entity.findOne({ password: password }, function (err, entity) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!entity) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      if (entity.contact.email !== email) {
        res.status(401).json({
          error: "Incorrect email or password",
        });
      } else {
        res.status(200).json(entity);
      }
    }
  });
});

router.post("/api/register", function (req, res) {
  const { usertype } = req.body;
  if (usertype.toLowerCase() === "company") {
    const {
      domain,
      status,
      categoryList,
      email,
      phone,
      countryCode,
      stateCode,
      city,
      address,
      description,
      employeeCount,
      foundedOn,
      founders,
      homepageUrl,
      links,
      name,
      numFundingRounds,
      password,
      people,
      revenueRange,
      totalFundingUsd,
    } = req.body;

    var entity = new Companies({
      domain,
      status,
      categoryList,
      contact: { email, phone, countryCode, stateCode, city, address },
      description,
      employeeCount,
      foundedOn,
      founders,
      homepageUrl,
      links,
      name,
      numFundingRounds,
      password,
      people,
      revenueRange,
      totalFundingUsd,
    });
  } else if (usertype.toLowerCase() === "investor") {
    const {
      companiesInvestedIn,
      companyName,
      funding,
      stage,
      telphone,
      address,
      email,
      description,
      investmentDomains,
      investorType,
      links,
      name,
      password,
      totalFunding,
    } = req.body;
    console.log(companiesInvestedIn);
    var entity = new Investors({
      companiesInvestedIn: [{ companyName, funding, stage }],
      contact: { telphone, address, email },
      description,
      investmentDomains,
      investorType,
      links,
      name,
      password,
      totalFunding,
    });
  } else {
    res.status(500).send("Entity type not specified.");
  }
  console.log(entity);
  //TODO: check if enity with email already present
  entity.save(function (err) {
    if (err) {
      res.status(500).send("Error registering new entity please try again.");
    } else {
      res.status(200).send("Entity registered");
    }
  });
});

// Get Company Details by Name
router.get("/company/details/:companyName", async (req, res, next) => {
  Companies.findOne({ name: req.params.companyName }, (error, doc) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(doc));
    }
  });
});

// Get Investor Details by Name
router.get("/investor/details/:investorName", async (req, res, next) => {
  Investors.findOne({ name: req.params.investorName }, (error, doc) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(doc));
    }
  });
});

// Update Company Details
router.put("/updateCompanyDetails/:companyid", async (req, res, next) => {
  Companies.findOneAndUpdate(
    { _id: req.params.companyid },
    {
      domain: req.body.domain,
      status: req.body.status,
      categoryList: req.body.categoryList,
      contact: req.body.contact,
      description: req.body.description,
      employeeCount: req.body.employeeCount,
      foundedOn: req.body.foundedOn,
      founders: req.body.founders,
      homepageUrl: req.body.homepageUrl,
      links: req.body.links,
      name: req.body.name,
      numFundingRounds: req.body.numFundingRounds,
      people: req.body.people,
      revenueRange: req.body.revenueRange,
      totalFundingUsd: req.body.totalFundingUsd,
    },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(doc));
      } else {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      }
    }
  );
});

// Update Investor Details
router.put("/updateInvestorDetails/:investorid", async (req, res, next) => {
  Investors.findOneAndUpdate(
    { _id: req.params.investorid },
    {
      contact: req.body.contact,
      description: req.body.description,
      investmentDomains: req.body.investmentDomains,
      investorType: req.body.investorType,
      links: req.body.links,
      name: req.body.name,
      totalFunding: req.body.totalFunding,
    },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(doc));
      } else {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      }
    }
  );
});

// Get All Companies
router.get("/companies/all", async (req, res, next) => {
  Companies.find({}, (error, doc) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(doc));
    }
  });
});

// Get All Investors
router.get("/investors/all", async (req, res, next) => {
  Investors.find({}, (error, doc) => {
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error Occured");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(doc));
    }
  });
});

// Add Company Details
router.post("/addCompanyDetails", async (req, res, next) => {
  console.log(`Add new company ${req.body.name}`);
  Companies.create(
    {
      domain: req.body.domain,
      status: req.body.status,
      categoryList: req.body.categoryList,
      contact: req.body.contact,
      description: req.body.description,
      employeeCount: req.body.employeeCount,
      foundedOn: req.body.foundedOn,
      founders: req.body.founders,
      homepageUrl: req.body.homepageUrl,
      links: req.body.links,
      name: req.body.name,
      numFundingRounds: req.body.numFundingRounds,
      people: req.body.people,
      revenueRange: req.body.revenueRange,
      totalFundingUsd: req.body.totalFundingUsd,
    },
    (err, doc) => {
      if (!err) {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(doc));
      } else {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      }
    }
  );
});

// Add Investor Details
router.post("/addInvestorDetails", async (req, res, next) => {
  console.log(`Add investor ${req.body.name}`);
  Investors.create(
    {
      contact: req.body.contact,
      description: req.body.description,
      investmentDomains: req.body.investmentDomains,
      investorType: req.body.investorType,
      links: req.body.links,
      name: req.body.name,
      totalFunding: req.body.totalFunding,
    },
    // { new: true },
    (err, doc) => {
      if (!err) {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(doc));
      } else {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error Occured");
      }
    }
  );
});

// Invest a company
router.post("/investCompany", async (req, res, next) => {
  Companies.findById({ _id: req.body.companyid }, (err, company) => {
    if (!err) {
      Investors.findById({ _id: req.body.investorid }, (err, investor) => {
        if (!err) {
          console.log(`${req.body.investorid} invests ${req.body.companyid}`);
          Investments.create(
            {
              companyid: req.body.companyid,
              investorid: req.body.investorid,
              name: req.body.name,
              stage: req.body.stage,
              funding: req.body.funding,
            },
            (err, investment) => {
              if (!err) {
                res.writeHead(200, {
                  "Content-Type": "application/json",
                });
                res.end(JSON.stringify(investment));
              } else {
                res.writeHead(500, {
                  "Content-Type": "text/plain",
                });
                res.end(`Interal Error: ${err}`);
              }
            }
          );
        } else {
          res.writeHead(404, {
            "Content-Type": "text/plain",
          });
          res.end("Investor not found.");
        }
      });
    } else {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end("Company not found.");
    }
  });
});

// List all invested companies of an investor.
router.get(
  "/investor/invested_companies/:investorid",
  async (req, res, next) => {
    console.log(`Get invested companies of ${req.params.investorid}`);
    Investments.find(
      { investorid: req.params.investorid },
      (error, investments) => {
        if (error) {
          res.writeHead(404, {
            "Content-Type": "text/plain",
          });
          res.end("Investment not found.");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          company_list = investments.map((e) => e.companyid);
          res.end(JSON.stringify(company_list));
        }
      }
    );
  }
);

// List all investors of a company.
router.get("/investor/:companyid", async (req, res, next) => {
  console.log(`Get investors of ${req.params.companyid}`);
  Investments.find(
    { companyid: req.params.companyid },
    (error, investments) => {
      if (error) {
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });
        res.end("Investment not found.");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        console.log(investments);
        investor_list = investments.map((e) => e.investorid);
        res.end(JSON.stringify(investor_list));
      }
    }
  );
});

module.exports = router;
