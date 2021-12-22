import React, { Component } from "react";
import AdmissionDetailsPG from "../components/Form/AdmissionDetailsPG";
import AdmissionDetailsUG from "../components/Form/AdmissionDetailsUG";
import Documents from "../components/Form/Documents";
import NavBar from "../components/Navbar/Navbar";
import PersonalDetails from "../components/Form/PersonalDetails";
import AccountsDetails from "../components/Form/AccountsDetails";
import { Redirect } from "react-router-dom";
import EntranceExamDetails from "../components/Form/EntranceExamDetails";
import Sidebar from "../components/Sidebar";
import "../CSS/admissionForm.css";
import Disclaimer from "../components/Form/Disclaimer";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default class admissionForm extends Component {
  state = {
    step: 1,
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
        institute: "",
        degree: "",
        totalAggregate: "",
        totalMarks: "",
        cgpa10: "",
        percentageMarks: "",
        dateofDeclaration: "",
      },

      entranceDetails: {
        givenGate: false,
        givenPet: false,
        isInterestedCoepRPET: false,
        isInterestedCoepEntrance: false,
        Gate: {
          score: "",
          lastDateOfValidation: "",
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
            <NavBar loggedin={true} />
            <div className="menu" >
                {this.state.menu ? <MenuIcon onClick={()=>{this.setState({menu: false}); }}/>
                : <CloseIcon onClick={() => {this.setState({menu: true})}}/> }
              </div>
              <div className="container">
                {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
              <PersonalDetails
                nextStep={this.nextStep}
                data={this.state.data}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <NavBar loggedin={true} />
            <div className="menu" >
                {this.state.menu ? <MenuIcon onClick={()=>{this.setState({menu: false}); }}/>
                : <CloseIcon onClick={() => {this.setState({menu: true})}}/> }
              </div>
              <div className="container">
                {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
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
            <div className="menu" >
                {this.state.menu ? <MenuIcon onClick={()=>{this.setState({menu: false}); }}/>
                : <CloseIcon onClick={() => {this.setState({menu: true})}}/> }
              </div>
              <div className="container">
                {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
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
            <div className="menu" >
                {this.state.menu ? <MenuIcon onClick={()=>{this.setState({menu: false}); }}/>
                : <CloseIcon onClick={() => {this.setState({menu: true})}}/> }
              </div>
              <div className="container">
                {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
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
            <div className="menu" >
                {this.state.menu ? <MenuIcon onClick={()=>{this.setState({menu: false}); }}/>
                : <CloseIcon onClick={() => {this.setState({menu: true})}}/> }
              </div>
              <div className="container">
                {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
              <AccountsDetails
                nextStep={this.nextStep}
                data={this.state.data}
                prevStep={this.prevStep}
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <NavBar loggedin={true} />
            <div className="menu" >
                {this.state.menu ? <MenuIcon onClick={()=>{this.setState({menu: false}); }}/>
                : <CloseIcon onClick={() => {this.setState({menu: true})}}/> }
              </div>
              <div className="container">
                {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
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
