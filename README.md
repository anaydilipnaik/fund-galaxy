## Team 6 Project Ideas:

# 1. Development of an online platform for Seed Funding/Venture Funding/Angel Funding for Startups

## Introduction to the problem statement
   
   Funding is crucial for all early stage and crucial startups. Investors have their own platforms for VC/Angel/Crowdfunding. There is no aggregated platform as of now.            Startups can get access to investors. 
   
## Abstract (rough draft)
   
   With change comes challenges. We want to leverage the enormous capabilities of technology to make VC/Angel/Crowdfunding accessible and ease the process of Funding for            everyone. We want to create a one-stop solution where various organizations and the potential investors can interact with each other throughout the entire process right          from pitching in the ideas to finalizing the deal. 
   
   We are planning on having a number of features for this platform which include:
   
   * Ability for the organizations to reach out to the investors and vice versa via a ‘Search’ and a ‘Smart Search’ functionality. What we mean by ‘Smart Search’ is that              either of the users will answer a responsive questionnaire about their preferences and what they’re looking for, including the rough estimates for the figures and                things like that, and they will be smartly matched with a list of companies/investors.
   * Ability to fix meetings, upload documentation, review paperwork, etc.
   * A notification system wherein the other party will be notified of an action via email and text message.
   * We can also plan to have an e-learning module wherein organizations can subscribe to various courses/ tips and tricks etc for making a pitch, ROI documents, etc. The e-          learning modules can be in the form of PDFs, documents or video tutorials.
   
## Approach
   
   We will be making use of MySql for all the database operations (maintaining the tables, writing of queries, views, stored procedures, etc.

   For the backend, we will be making use of Express and Node for developing REST APIs, and we can also make use of TypeScript for certain operations.

   For the frontend, we will be using a JavaScript library called React, which can seamlessly handle states and other basic pages. We can couple it with either Bootstrap or        Material UI for a responsive and an interactive design.

   This MVC (Model View Controller) architecture will help us in modularizing our code and also separate out all our services, so that debugging and developing will be much        easier, and the code will be much more cleaner as well, hence aiding in maintaining it for a long term.

   We will be making use of various other external APIs as well for SMS, email (Mail gun), payment gateway (Razorpay).

   AWS S3 Bucket for storing all the media such as video tutorials, PPTs, documents, etc.

## Persona
   
   This application will primarily have 2 personas:
   
   1) Organizations: Major responsibilities include reaching out to investors, uploading documents, pitches, subscribing to tutorials, etc
   
   2) Investors: Major responsibilities include connecting with organizations, reviewing documents, uploading paperwork, etc
           
## Dataset links
  
   Not Applicable.

  (More features and use cases can be added to this web application based on some more market research. This problem statement was originally inspired from Smart India             Hackathon (https://www.sih.gov.in/sih2020PS)
