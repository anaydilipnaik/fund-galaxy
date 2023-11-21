import axios from "axios";
import React, { useState, useEffect } from "react";
import "./companyProfile.css";
import { useLocation } from "react-router-dom";

const Company = () => {
  const [details, setDetails] = useState(null);

  const search = useLocation().search;

  useEffect(() => {
    const name = new URLSearchParams(search).get("name");
    axios
      .get(
        "http://" + process.env.REACT_APP_HOST + ":5001/company/details/" + name
      )
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="main-container">
        {details ? (
          <>
            <div>
              <div className="main-container">
                <div className="top-container">
                  <div className="profile block">
                    <div className="profile-description">
                      <h1
                        className="user-name"
                        style={{ textTransform: "capitalize" }}
                      >
                        {details.name}
                      </h1>
                      <h4>
                        <span>Domain: </span>
                        {details.domain}
                      </h4>
                      {details.categoryList.map((item) => (
                        <span className="hashtag" key={""}>
                          {item}{" "}
                        </span>
                      ))}
                      <p className="scnd-font-color">{details.description}</p>
                    </div>
                    <div className="bottom">
                      <a href="*link" className="btn">
                        <span style={{ color: "#fff" }}>Visit website</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="">
                    <div className="left-container container">
                      <div className="menu-box block">
                        <h2 className="titular">Contact Info</h2>
                        <div className="vcard">
                          <div className="bottom">
                            <div className="vcontact">
                              <span className="phone">
                                Phone: {details.contact.telephone}
                              </span>
                              <br />
                              <span className="email">
                                Email: {details.contact.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="middle-container container">
                      <div className="menu-box block">
                        <h2 className="titular">Info</h2>
                        <ul className="menu-box-menu">
                          <li>
                            <a className="menu-box-tab" href="#8">
                              <span className="icon entypo-cc-by scnd-font-color"></span>
                              Employee Count
                              <div className="menu-box-number">
                                {details.employeeCount}
                              </div>
                            </a>
                          </li>
                          <li>
                            <a className="menu-box-tab" href="#10">
                              <span className="icon entypo-calendar scnd-font-color"></span>
                              Founded
                              <div className="menu-box-number">
                                {details.foundedOn}
                              </div>
                            </a>
                          </li>
                          <li>
                            <a className="menu-box-tab" href="#6">
                              <span className="icon entypo-info-circled scnd-font-color"></span>
                              No. of Funding Rounds{" "}
                              <div className="menu-box-number">
                                {details.numFundingRounds}
                              </div>
                            </a>
                          </li>
                          <li>
                            <a className="menu-box-tab" href="#6">
                              <span className="icon entypo-right-open scnd-font-color"></span>
                              Total Funding{" "}
                              <div className="menu-box-number">
                                USD {details.totalFundingUsd}
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="right-container container">
                      <ul className="social block">
                        <li>
                          <a href="*">
                            <div className="facebook icon">
                              <span className="zocial-facebook"></span>
                            </div>
                            <h2 className="facebook titular">VISIT FACEBOOK</h2>
                          </a>
                        </li>
                        <li>
                          <a href="*">
                            <div className="twitter icon">
                              <span className="zocial-twitter"></span>
                            </div>
                            <h2 className="twitter titular">VISIT TWITTER</h2>
                          </a>
                        </li>
                        <li>
                          <a href="*">
                            <h2 className="googleplus titular">
                              VISIT WEBPAGE
                            </h2>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            style={{ textAlign: "center", color: "black", fontSize: "50px" }}
          >
            No Data Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Company;
