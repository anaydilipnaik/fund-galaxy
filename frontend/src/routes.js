/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Investor from "views/InvestorProfile/investorProfile.js";
import Company from "views/CompanyProfile/companyProfile";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "My Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/investor",
    name: "Investor Details",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Investor,
    layout: "/admin",
  },
  {
    path: "/company",
    name: "Company Details",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Company,
    layout: "/admin",
  },
];

export default dashboardRoutes;
