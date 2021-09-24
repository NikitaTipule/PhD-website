import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import { TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import NavBar from "../components/Navbar/Navbar"


const styles = (theme) => ({
    field: {
      marginTop: "8px",
      display: "flex",
      flexDirection: "row",
      fontSize: "18px",
      alignItems: "center",
      width: "100%",
    },
    fieldName: {
      fontSize: "20px",
      fontWeight: "500",
      width: "40%",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "10px",
    },
    icon: {
      marginLeft: "10px",
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
  });

  class VerificationComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        middleName: "",
        gender: "",
        dob: "",
        email: "",
        mobile: "",
      };
    }
  
    render() {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* <div style={{ width: "100%" }}>
            <div style={{ marginTop: "4px" }}>
              <input
                type="radio"
                value="Male"
                name="gender"
                checked={this.state.gender === "Male"}
                onChange={this.onChangeGender}
                style={{ marginLeft: "20px" }}
              />
              Pending
              <input
                type="radio"
                value="Female"
                name="gender"
                checked={this.state.gender === "Female"}
                onChange={this.onChangeGender}
                style={{ marginLeft: "30px" }}
              />{" "}
              Modification-Required
              <input
                type="radio"
                value="Other"
                name="gender"
                checked={this.state.gender === "Other"}
                onChange={this.onChangeGender}
                style={{ marginLeft: "30px" }}
              />{" "}
              Verified
            </div>
          </div> */}
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
            dateofpayment: "23/09/2021"
        }
    }

    render() {
        const { classes } = this.props;
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
              
                {/* <div className={classes.title}>Accounts Details</div>

                <div style={{ alignItems: "left", textAlign: "left" }}>
                <div className={classes.field}>
                    <div className={classes.fieldName}>Amount Paid :</div>
                    <div>{this.state.amount}/-</div>
                </div>

                <div className={classes.field}>
                    <div className={classes.fieldName}>UTR/DU Number:</div>
                    <div>{this.state.DUINumber}</div>
                </div>

                <div className={classes.field}>
                    <div className={classes.fieldName}>Payment Receipt :</div>
                    <div>casteCertificate</div>
                    <div className={classes.icon}>
                    <div>
                        <ArrowCircleDown />
                    </div>
                    <div>
                        <VerificationComponent />
                    </div>
                    </div>
                </div>
                </div> */}

            </div>
            </>
        );
    }
}

export default AccountForm;