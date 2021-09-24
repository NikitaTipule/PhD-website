import { TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Button from "@mui/material/Button";
import DatePicker from "react-date-picker";
import SweetAlert from "react-bootstrap-sweetalert";

// import { browserHistory } from "react-router";

export default class AccountsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DUINumber: "",
      amount: "",
      dateOfPayment: "",
      open: false,
      confirmAlert: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChange = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log("img data : ", e.target.result);
    };
  };

  onChangeDate = (event) => {
    this.setState({ dateOfPayment: event });
  };

  onSubmit = (event) => {
    this.setState({ open: !this.state.open });
  };

  handleAlertCanel = () => {
    this.setState({ open: !this.state.open });
  };

  handleNext = () => {
    // browserHistory.push("localhost:3000/studenthome");
    this.props.nextStep();
  };

  render() {
    return (
      <div
        style={{
          alignItems: "center",
          textAlign: "left",
          margin: "30px 18% 0 18%",
        }}
      >
        {/* Popup on Success */}
        <div>
          <SweetAlert
            success
            show={this.state.open}
            title="Submitted Successfully"
            onConfirm={this.handleAlertCanel}
            customButtons={
              <React.Fragment>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    this.handleAlertCanel();
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    this.handleNext();
                  }}
                  style={{ marginLeft: "20px" }}
                >
                  Submit
                </Button>
              </React.Fragment>
            }
          ></SweetAlert>
        </div>

        <div
          style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}
        >
          Payment Details
        </div>
        <div>
          <Typography>Amount</Typography>
          <TextField
            className="mb-3"
            required
            fullWidth
            onChange={this.handleChange}
            value={this.state.amount}
            variant="outlined"
            name="amount"
            label="Amount Paid"
            style={{ marginTop: "8px" }}
          />
        </div>
        
        <div style={{ marginTop: "10px" }}>
          <Typography>UTR/DU Number</Typography>
          <TextField
            className="mb-3"
            required
            fullWidth
            onChange={this.handleChange}
            value={this.state.DUINumber}
            variant="outlined"
            name="DUINumber"
            label="UTR/DU Number of the Transaction"
            style={{ marginTop: "8px" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
              <Typography>Date of Payment</Typography>
              <DatePicker
                onChange={(e) => this.onChangeDate(e)}
                value={this.state.dateOfPayment}
                format={"dd-MM-y"}
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
              ></DatePicker>
            </div>
        <div style={{ marginTop: "10px" }}>
          <Typography>Payment Receipt</Typography>
          <div>
            <input type="file" name="file" onChange={this.onChange} />
          </div>
        </div>

        <button
          style={{
            marginTop: "20px",
            marginBottom: "30px",
            padding: "5px",
            width: "100px",
            height: "40px",
            fontSize: "20px",
            backgroundColor: "cadetblue",
            color: "white",
            borderRadius: "10px",
          }}
          onClick={this.onSubmit}
        >
          {" "}
          Submit
        </button>
      </div>
    );
  }
}
