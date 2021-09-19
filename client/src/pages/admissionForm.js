import React, { Component } from "react";
import AdmissionDetailsPG from "../components/Form/AdmissionDetailsPG";
import AdmissionDetailsUG from "../components/Form/AdmissionDetailsUG";
import Documents from "../components/Form/Documents";
import NavBar from "../components/Navbar/Navbar";
import PersonalDetails from "../components/Form/PersonalDetails";

export default class admissionForm extends Component {
  state = {
    step: 1,
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
            <NavBar />
            <PersonalDetails nextStep={this.nextStep} />
          </div>
        );
      case 2:
        return (
          <div>
            <NavBar />
            <AdmissionDetailsUG
              nextStep={this.nextStep}
              // prevStep={this.prevStep}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <NavBar />
            <AdmissionDetailsPG nextStep={this.nextStep} />
          </div>
        );
      case 4:
        return (
          <div>
            <NavBar />
            <Documents />
          </div>
        );
    }
  }
}
