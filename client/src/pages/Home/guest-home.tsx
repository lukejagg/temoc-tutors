import "../Home/guest-home.css";
import React from 'react';
import { Paper } from '@mui/material';
import { Navbar } from "../../components/navbar/navbar";

export const GuestHome: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="dividing-container" style={{backgroundColor: "#fffff", paddingTop: "0px"}}>
        <div className="dividing-container" style={{backgroundColor: "#fffff", paddingTop: "64px"}}>
          <h1>Welcome to TemocTutors</h1>
          <img src={require("./img/guest-page-front.webp")} alt="student-smiling" style={{borderRadius: "10px"}} />
        </div>
        <div style={{backgroundColor: "#4285F4", paddingTop: "20px"}}>
          <Paper style={{maxWidth: '50%', margin: '0 auto', padding: '16px', marginTop: '32px', marginBottom: '32px'}}>
            <p className="description">
              Welcome to TemocTutors, the premier online tutoring service designed to help you achieve academic success! 
              At TemocTutors, we understand that every student has their own unique learning style and pace. That's why our 
              highly skilled tutors work with you to create a personalized learning plan tailored to your needs and goals.
            </p>
            <p className="description">
              Our team of tutors are experts in their respective fields, with years of experience in teaching and helping 
              students excel in their studies. Whether you need help with a specific subject, preparing for a standardized 
              test, or just want to boost your overall academic performance, we've got you covered.
            </p>
            <p className="description">
              With our easy-to-use online platform, you can access our tutoring services from anywhere, at any time. Our 
              platform includes a virtual whiteboard, video conferencing, screen sharing, and other interactive tools to make
              your learning experience engaging and effective.
            </p>
            <p className="description">
              At TemocTutors, we are committed to providing the highest quality tutoring services to help you achieve your 
              academic goals. Our flexible pricing plans and scheduling options make it easy for you to get the support you 
              need, whenever you need it. So why wait? Sign up today and start your journey towards academic success with TemocTutors!
            </p>
          </Paper>
        </div>
      </div>
    </div>
  );
};
