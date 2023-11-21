import React, { useState, useEffect } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";
import LocationIcon from "../../assets/img/location.png";
import DollarIcon from "../../assets/img/dollar.png";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    let apiEndpoint = "";
    if (JSON.parse(localStorage.getItem("user")).investorType)
      apiEndpoint =
        "https://fundgalaxy-api.herokuapp.com/companyname?cname=" +
        JSON.parse(localStorage.getItem("user")).name.toLowerCase();
    else
      apiEndpoint =
        "https://fundgalaxy-api.herokuapp.com/investorname?iname=" +
        JSON.parse(localStorage.getItem("user")).name.toLowerCase();
    axios
      .get(apiEndpoint)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleButtonClick(e, name) {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("userType")) == "investor")
      window.location.href = "/admin/company?name=" + name;
    else window.location.href = "/admin/investor?name=" + name;
  }

  let dollarUSLocale = Intl.NumberFormat("en-US");

  !JSON.parse(localStorage.getItem("user"))
    ? (window.location.href = "/login")
    : null;

  return (
    <div>
      <div style={{ border: "1px solid" }}>
        <h1 style={{ margin: 0, textAlign: "center" }}>
          <b>TOP 10 RECOMMENDATIONS</b>
        </h1>
      </div>
      <GridContainer>
        {data &&
          data.length === 10 &&
          data.map((key) => (
            <GridItem md={4} key={key.id}>
              <Card style={{ height: "180px" }}>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    <b
                      style={{
                        textTransform: "capitalize",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={(e) => handleButtonClick(e, key.name)}
                    >
                      {key.name}
                    </b>
                  </h4>
                  <p
                    className={classes.cardCategory}
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {JSON.parse(localStorage.getItem("user")).investorType ? (
                      key.description.length > 85 ? (
                        key.description.substr(0, 85) + "..."
                      ) : (
                        key.description.substr(0, 85)
                      )
                    ) : (
                      <>
                        <b>Investment Domain:</b>{" "}
                        {key.investmentDomains[0].split("_")[0]}{" "}
                        {key.investmentDomains[0].split("_")[1]}
                      </>
                    )}
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <span style={{ marginRight: "5px" }}>
                      <img
                        src={
                          JSON.parse(localStorage.getItem("user")).investorType
                            ? DollarIcon
                            : LocationIcon
                        }
                        style={{ width: "20px", height: "20px" }}
                      />
                    </span>
                    <div style={{ color: "black" }}>
                      {JSON.parse(localStorage.getItem("user")).investorType ? (
                        <>
                          Total Funding: ${" "}
                          {dollarUSLocale.format(key.totalFundingUsd)}
                        </>
                      ) : null}
                      {!JSON.parse(localStorage.getItem("user"))
                        .investorType ? (
                        <>
                          {key.contact.split(",")[0]},{" "}
                          {key.contact.split(",")[1]}
                        </>
                      ) : null}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
      </GridContainer>
    </div>
  );
}
