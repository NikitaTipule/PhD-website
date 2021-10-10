import React, { Component, useState } from "react";
import AdmissionDetailsPG from "../components/Form/AdmissionDetailsPG";
import AdmissionDetailsUG from "../components/Form/AdmissionDetailsUG";
import Documents from "../components/Form/Documents";
import NavBar from "../components/Navbar/Navbar";
import PersonalDetails from "../components/Form/PersonalDetails";
import AccountsDetails from "../components/Form/AccountsDetails";
import { Redirect } from "react-router-dom";
import EntranceExamDetails from "../components/Form/EntranceExamDetails";

export default class admissionForm extends Component {
  state = {
    step: 1,
    data: {
      personalInfo: {
        name: "",
        middleName: "",
        email: "",
        gender: "",
        dob: "",
        mobile: "",
        nationality: "",
        category: "",
        aadhar: "",
        address: "",
        physicallyDisabled: "",
        department: "",
      },

      academicsUG: {
        ugUniversity: "",
        ugNomanclaure: "",
        ugSpecialization: "",
        ugMarksObtained: "",
        ugTotalMarks: "",
        ugCGPA: "",
        ugPercentage: "",
        ugDOD: "",
      },

      academicsPG: {
        pgUniversity: "",
        pgNomanclaure: "",
        pgMarksObtained: "",
        pgTotalMarks: "",
        pgCGPA: "",
        pgPercentage: "",
      },

      entranceOptions: [],
      gate: false,
      gateScore: "",
      gateDOV: "",
    },
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  render() {
    const { step } = this.state;

    switch (step) {
      case 1:
        return (
          <div>
            <NavBar loggedin={true}/>
            <PersonalDetails nextStep={this.nextStep} data={this.state.data} />
          </div>
        );
      case 2:
        return (
          <div>
            <NavBar loggedin={true}/>
            <AdmissionDetailsUG
              nextStep={this.nextStep}
              data={this.state.data}
              // prevStep={this.prevStep}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <NavBar loggedin={true}/>
            <AdmissionDetailsPG
              nextStep={this.nextStep}
              data={this.state.data}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <NavBar loggedin={true}/>
            <EntranceExamDetails
              nextStep={this.nextStep}
              data={this.state.data}
            />
          </div>
        );
      case 5:
        return (
          <div>
            <NavBar loggedin={true}/>
            <Documents nextStep={this.nextStep} data={this.state.data} />
          </div>
        );
      case 6:
        return (
          <div>
            <NavBar loggedin={true}/>
            <AccountsDetails nextStep={this.nextStep} data={this.state.data} />
          </div>
        );
      default:
        return <Redirect to="/studenthome" />;
    }
  }
}
