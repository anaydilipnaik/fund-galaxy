import axios from "axios";
import React, { useState, useEffect } from "react";
import "./investorProfile.css";
import { useLocation } from "react-router-dom";

const Investor = () => {
  const [details, setDetails] = useState(null);

  const search = useLocation().search;

  useEffect(() => {
    const name = new URLSearchParams(search).get("name");
    axios
      .get(
        "http://" +
          process.env.REACT_APP_HOST +
          ":5001/investor/details/" +
          name
      )
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="main-container">
        {details ? (
          <>
            <div className="top-container ">
              <div className="profile block">
                <div className="profile-description">
                  <h1
                    className="user-name"
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {details.name}
                  </h1>
                  <h2 className="user-name">
                    <span>Domain: </span>
                    {details.investorType}
                  </h2>
                  {details.investmentDomains.map((item) => (
                    <span className="hashtag" key={""}>
                      {item}{" "}
                    </span>
                  ))}
                  <p className="scnd-font-color">{details.description}</p>
                </div>
                <div className="bottom">
                  <a href="*link" className="btn">
                    <span>Visit website</span>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="main-container">
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
                    <h2 className="titular">Invested Companies</h2>
                    <ul className="m-d expand-list">
                      {details.companiesInvestedIn.map((item) => (
                        <li data-md-content="200" key={""}>
                          <label name="tab">{item.companyName}</label>
                          <input type="checkbox" />
                          <span className="open-close-icon">
                            <span className="entypo-plus"></span>
                            <span className="entypo-minus"></span>
                          </span>
                          <div className="content">
                            <ul className="menu-box-menu">
                              <li>
                                <a className="menu-box-tab">
                                  Total Funding{" "}
                                  <div className="menu-box-number">
                                    USD {item.funding}
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a className="menu-box-tab">
                                  Stage{" "}
                                  <div className="menu-box-number">
                                    {item.stage}
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      ))}
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
                        <h2 className="googleplus titular">VISIT WEBPAGE</h2>
                      </a>
                    </li>
                  </ul>
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

export default Investor;
