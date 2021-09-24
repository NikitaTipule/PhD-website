import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import { TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import NavBar from "../components/Navbar/Navbar"
import "./DisplayData.css";
import { Redirect } from "react-router";



  class VerificationComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        verify: "",
      };
    }
  
    render() {
      return (
        <div className="verify">
          <div style={{ width: "100%" }}>
            <div className="radios">
              <div>
                <input
                  type="radio"
                  value="Pending"
                  name="verify"
                  checked={this.state.verify === "Pending"}
                  onChange={this.onChangeGender}
                  className="radio"
                />
                Pending
              </div>
              <div>
                <input
                  type="radio"
                  value="Modification-Required"
                  name="verify"
                  checked={this.state.verify === "Modification-Required"}
                  onChange={this.onChangeGender}
                  className="radio"
                />{" "}
                Modification-Required
              </div>
              <div>
                <input
                  type="radio"
                  value="Verified"
                  name="verify"
                  checked={this.state.verify === "Verified"}
                  onChange={this.onChangeGender}
                  className="radio"
                />{" "}
                Verified
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  

class AccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Pragati Narote",
            category: "NT",
            DUINumber: "DU9813891",
            amount: "1000",
            DateOfPayment: "23/09/2021"
        }
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    handleSubmit = (event) => {
      this.setState({
        message: this.state.message,
      });
      console.log(this.state.message);
      this.setState({
        redirect: !this.state.redirect,
      });
    };
  

    render() {
        if (this.state.redirect) {
          return <Redirect to="/account" />;
        }
        return(
          <>
          <NavBar />
            <div
                style={{
                    alignItems: "center",
                    textAlign: "left",
                    margin: "30px 10% 30px 10%",
                }}
            >
              <div className="title">Accounts Details</div>

              <div style={{ alignItems: "left", textAlign: "left" }}>
                <div className="field">
                  <div div className="fieldName">Name :</div>
                  <div>{this.state.name}</div>
                </div>

                <div className="field">
                  <div className="fieldName">Category :</div>
                  <div>{this.state.category}</div>
                </div>
                      
                <div className="field">
                  <div className="fieldName">Amount Paid :</div>
                  <div>{this.state.amount}/-</div>
                </div>

                <div className="field">
                  <div className="fieldName">UTR/DU Number:</div>
                  <div>{this.state.DUINumber}</div>
                </div>

                <div className="field">
                  <div className="fieldName">Date Of Payment:</div>
                  <div>{this.state.DateOfPayment}</div>
                </div>

                <div className="field" style={{marginTop:"40px"}}>
                  <div className="documents">
                    <div className="docFieldName">Payment Reciept: </div>
                    <div className="iconMobile">
                      <div>PaymentReciept</div>
                      <div>
                        <ArrowCircleDown />
                      </div>
                    </div>
                  </div>
                  <div className="icon" style={{marginLeft:"0px", justifyContent:"flex-start"}}>
                    <div>
                      <VerificationComponent />
                    </div>
                  </div>
                </div>
              </div> 
              <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

              <Button
                variant="contained"
                size="large"
                style={{ alignSelf: "center" }}
                onClick={this.handleSubmit}
              >
                Done
              </Button>
            </div>
            </>
        );
    }
}

export default AccountForm;