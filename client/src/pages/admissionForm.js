import React, { Component } from "react";
import AdmissionDetailsPG from "../components/Form/AdmissionDetailsPG";
import AdmissionDetailsUG from "../components/Form/AdmissionDetailsUG";
// import Documents from "../components/Form/Documents";
import NavBar from "../components/Navbar/Navbar";
import PersonalDetails from "../components/Form/PersonalDetails";
import AccountsDetails from "../components/Form/AccountsDetails";
import { Redirect } from "react-router-dom";
import EntranceExamDetails from "../components/Form/EntranceExamDetails";
import Sidebar from "../components/Sidebar";
import "../CSS/admissionForm.css";
import Disclaimer from "../components/Form/Disclaimer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MobileView,BrowserView } from "react-device-detect";
export default class admissionForm extends Component {
  state = {
    // step: this.props.location.state.step ? this.props.location.state.step : 1,
    menu:false,
    step: this.props
      ? this.props.location
        ? this.props.location.state
          ? this.props.location.state.step
            ? this.props.location.state.step
            : 1
          : 1
        : 1
      : 1,
    
    token: "",
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
        employed:"",
        domicile: "",
        department: "",
      },

      academicsUG: {
        institute: "",
        degree: "",
        specialization: "",
        marksFinalYear: "",
        totalAggregate: "",
        cgpa10: "",
        percentageMarks: "",
        dateofDeclaration: "",
      },

      academicsPG: {
        status: "",
        institute: "",
        degree: "",
        totalAggregate: "",
        totalMarks: "",
        cgpa10: "",
        percentageMarks: "",
        dateofDeclaration: "",
        specialization: "",
        status: "",
        branch: "",
      },

      entranceDetails: {
        givenGate: false,
        givenPet: false,
        isInterestedCoepRPET: false,
        isInterestedCoepEntrance: false,
        Gate: {
          score: "",
          lastDateOfValidation: "",
          discipline: "",
          category: "",
          marks: "",
        },
        sppuPet: {
          details: "",
          year: "",
        },
      },

      feeDetails: {
        utrDuNumber: "",
        amount: "",
        transactionTime: "",
        bank: "",
        docUploaded: {
          type: "",
          filename: "",
          originalName: "",
        },
      },
    },
  };

  nextStep = (inc = 1) => {
    const { step } = this.state;
    this.setState({
      step: step + inc,
    });
  };

  prevStep = (dec = 1) => {
    const { step } = this.state;
    this.setState({
      step: step - dec,
    });
  };

  render() {
    const { step } = this.state;

    switch (step) {
      case 1:
        return (
          <div>
            <NavBar loggedin={true} />
            <div className="menu">
              {!this.state.menu ? (
                <MenuIcon
                  onClick={() => {
                    this.setState({ menu: true });
                  }}
                />
              ) : (
                <CloseIcon
                  onClick={() => {
                    this.setState({ menu: false });
                  }}
                />
              )}
            </div>
            <div className="container">
            <MobileView>
            {this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </MobileView>
          <BrowserView>
            {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </BrowserView>
              <PersonalDetails
                nextStep={this.nextStep}
                data={this.state.data}
                prevStep={this.prevStep}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <NavBar loggedin={true} />
            <div className="menu">
              {!this.state.menu ? (
                <MenuIcon
                  onClick={() => {
                    this.setState({ menu: true });
                  }}
                />
              ) : (
                <CloseIcon
                  onClick={() => {
                    this.setState({ menu: false });
                  }}
                />
              )}
            </div>
            <div className="container">
            <MobileView>
            {this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </MobileView>
          <BrowserView>
            {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </BrowserView>
              <AdmissionDetailsUG
                nextStep={this.nextStep}
                data={this.state.data}
                prevStep={this.prevStep}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <NavBar loggedin={true} />
            <div className="menu">
              {!this.state.menu ? (
                <MenuIcon
                  onClick={() => {
                    this.setState({ menu: true });
                  }}
                />
              ) : (
                <CloseIcon
                  onClick={() => {
                    this.setState({ menu: false });
                  }}
                />
              )}
            </div>
            <div className="container">
            <MobileView>
            {this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </MobileView>
          <BrowserView>
            {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </BrowserView>
              <AdmissionDetailsPG
                nextStep={this.nextStep}
                data={this.state.data}
                prevStep={this.prevStep}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <NavBar loggedin={true} />
            <div className="menu">
              {!this.state.menu ? (
                <MenuIcon
                  onClick={() => {
                    this.setState({ menu: true });
                  }}
                />
              ) : (
                <CloseIcon
                  onClick={() => {
                    this.setState({ menu: false });
                  }}
                />
              )}
            </div>
            <div className="container">
            <MobileView>
            {this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </MobileView>
          <BrowserView>
            {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </BrowserView>
              <EntranceExamDetails
                nextStep={this.nextStep}
                data={this.state.data}
                prevStep={this.prevStep}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <NavBar loggedin={true} />
            <div className="menu">
              {!this.state.menu ? (
                <MenuIcon
                  onClick={() => {
                    this.setState({ menu: true });
                  }}
                />
              ) : (
                <CloseIcon
                  onClick={() => {
                    this.setState({ menu: false });
                  }}
                />
              )}
            </div>
            <div className="container">
            <MobileView>
            {this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </MobileView>
          <BrowserView>
            {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </BrowserView>
              <AccountsDetails
                nextStep={this.nextStep}
                data={this.state.data}
                prevStep={this.prevStep}
              />
            </div>
          </div>
        );
      case 10:
        return (
          <div>
            <NavBar loggedin={true} />
            <div className="menu">
              {!this.state.menu ? (
                <MenuIcon
                  onClick={() => {
                    this.setState({ menu: true });
                  }}
                />
              ) : (
                <CloseIcon
                  onClick={() => {
                    this.setState({ menu: false });
                  }}
                />
              )}
            </div>
            <div className="container">
            <MobileView>
            {this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </MobileView>
          <BrowserView>
            {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </BrowserView>
              <Disclaimer
                nextStep={this.nextStep}
                data={this.state.data}
                prevStep={this.prevStep}
              />
            </div>
          </div>
        );
      default:
        return <Redirect to="/candidate" />;
    }
  }
}
