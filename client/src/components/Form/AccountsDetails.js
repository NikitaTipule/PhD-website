import { TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Button from "@mui/material/Button";
import DatePicker from "react-date-picker";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "@mui/material/Divider";
import { Table, TableBody } from "@material-ui/core";
import { docType } from "../../phdAdmDetails";
// import { browserHistory } from "react-router";

import "./Documents.css";
import DocViewer from "../../pages/DocViewer";

export default class AccountsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utrDuNumber: "",
      amount: "",
      transactionTime: "",
      bank: "",
      docUploaded: {},

      remarks: "",
      verification: "",

      editable: "",
      disabled: false,

      try: "",

      errorAmount: false,
      errorUtrDuNumber: false,
      errorBank: false,
      errorDate: false,
      errorDoc: false,

      open: false,
      confirmAlert: false,

      selectedFile: null,

      token: localStorage.getItem("phd-website-jwt"),
    };
  }

  // ON CHANGE FUNCTIONS
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onChangeDate = (event) => {
    this.setState({ transactionTime: event });
  };

  // FUNCTIONS FOR FILE DATA
  onFileChange = async (event) => {
    await this.setState({ selectedFile: event.target.files[0] });
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    await axios
      .post(BACKEND_URL + "/files/upload", formData, {
        headers: {
          "phd-website-jwt": this.state.token,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const docUploaded = {
          filename: res.data.filename,
          contentType: res.data.contentType,
          originalName: res.data.originalname,
        };
        this.setState({ docUploaded: docUploaded });
      })
      .catch((err) => console.log(err.response.data.error || "error"));
  };

  // FUNCTION FOR FORM DATA VALIDATION
  validateData = () => {
    /^\d+$/.test(this.state.amount)
      ? this.setState({ errorAmount: false })
      : this.setState({ errorAmount: true });

    this.state.utrDuNumber === "" || this.state.utrDuNumber === undefined
      ? this.setState({ errorUtrDuNumber: true })
      : this.setState({ errorUtrDuNumber: false });

    this.state.bank === "" || this.state.bank === undefined
      ? this.setState({ errorBank: true })
      : this.setState({ errorBank: false });

    this.state.transactionTime === "" ||
    this.state.transactionTime === null ||
    this.state.transactionTime === undefined
      ? this.setState({ errorDate: true })
      : this.setState({ errorDate: false });
    this.state.docUploaded &&
    Object.keys(this.state.docUploaded).length >= 3 &&
    this.state.docUploaded.filename !== null &&
    this.state.docUploaded.filename !== undefined
      ? this.setState({ errorDoc: false })
      : this.setState({ errorDoc: true });
  };

  // ON CLICK - "Next" button
  onNext = async (event) => {
    await this.validateData();
    if (
      this.state.errorAmount === false &&
      this.state.errorUtrDuNumber === false &&
      this.state.errorBank === false &&
      this.state.errorDate === false &&
      this.state.errorDoc === false
    ) {
      if (!this.state.editable) {
        // return to candidate page
        this.props.nextStep(2);
      }
      if (!this.state.disabled) {
        this.setState({ confirmAlert: !this.state.confirmAlert });
      }
      if (this.state.disabled) {
        this.props.nextStep(1);
      }
      this.props.data.feeDetails.utrDuNumber = this.state.utrDuNumber;
      this.props.data.feeDetails.amount = this.state.amount;
      this.props.data.feeDetails.transactionTime = this.state.transactionTime;
      this.props.data.feeDetails.bank = this.state.bank;
      this.props.data.feeDetails.docUploaded = this.state.docUploaded;
      this.props.data.feeDetails.completed = true;
    }
  };

  // ON CLICK - "Confirm" button (Pop-Up)
  onConfirm = async () => {
    await this.setState({ confirmAlert: !this.state.confirmAlert });
    this.setState({ open: !this.state.open });

    if (!this.state.disabled) {
      const feeDetails = {
        feeDetails: this.props.data.feeDetails,
      };
      console.log(feeDetails);
      try {
        axios
          .post(BACKEND_URL + "/students/edit/fee", feeDetails, {
            headers: { "phd-website-jwt": this.state.token },
          })
          .then((res) => {
            console.log("Accounts Info Added");
          });
      } catch (err) {
        console.log(err);
      }
    }

    // try {
    //   await axios
    //     .post(BACKEND_URL + "/students/lock", this.state.try, {
    //       headers: { "phd-website-jwt": this.state.token },
    //     })
    //     .then((res) => {
    //       console.log("profile locked");
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
    this.props.nextStep(1);
  };

  // Handle Pop-up Cancels
  handleAlertCanel = () => {
    this.setState({ open: !this.state.open });
  };
  onCancel = () => {
    this.setState({ confirmAlert: !this.state.confirmAlert });
  };

  // Handle next and back navigation
  handleNext = () => {
    this.props.nextStep(1);
  };
  handleBack = () => {
    this.props.prevStep(1);
  };

  async componentDidMount() {
    if (localStorage.getItem("phd-website-jwt")) {
      await this.setState({
        token: localStorage.getItem("phd-website-jwt"),
      });
      try {
        await axios
          .get(BACKEND_URL + "/students/me", {
            headers: { "phd-website-jwt": this.state.token },
          })
          .then((res) => {
            this.setState({ try: { editable: res.data.user.editable } });
            res.data.user.feeDetails &&
              this.setState({
                utrDuNumber: res.data.user.feeDetails.utrDuNumber
                  ? res.data.user.feeDetails.utrDuNumber
                  : "",
                amount: res.data.user.feeDetails.amount
                  ? res.data.user.feeDetails.amount
                  : "",
                transactionTime: res.data.user.feeDetails.transactionTime
                  ? res.data.user.feeDetails.transactionTime
                  : "",
                bank: res.data.user.feeDetails.bank
                  ? res.data.user.feeDetails.bank
                  : "",
                docUploaded: res.data.user.feeDetails.docUploaded
                  ? res.data.user.feeDetails.docUploaded
                  : {},
                remarks: res.data.user.feeDetails.remarks
                  ? res.data.user.feeDetails.remarks
                  : "",
                verification: res.data.user.feeDetails.verification
                  ? res.data.user.feeDetails.verification
                  : "",
              });
            this.setState({ editable: res.data.user.editable });
            res.data.user.editable &&
            (res.data.user.feeDetails.verification === "mod_req" ||
              res.data.user.feeDetails.verification === "pending")
              ? this.setState({ disabled: false })
              : this.setState({ disabled: true });
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#0971f1",
          darker: "#053e85",
        },
        neutral: {
          main: "#64748B",
          contrastText: "#fff",
        },
      },
    });

    return (
      <div className="accountsContainer">
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
                    this.handleNext();
                  }}
                  style={{ marginLeft: "20px" }}
                >
                  Okay
                </Button>
              </React.Fragment>
            }
          ></SweetAlert>
        </div>

        {/* Pop for confirming data*/}
        <div>
          <SweetAlert
            title={"Payment Details"}
            show={this.state.confirmAlert}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
            customButtons={
              <React.Fragment>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    size="large"
                    color="neutral"
                    onClick={() => {
                      this.onCancel();
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Back
                  </Button>
                </ThemeProvider>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={() => {
                    this.onConfirm();
                  }}
                >
                  Save and Proceed
                </Button>
              </React.Fragment>
            }
          >
            {() => (
              <div style={{ alignItems: "left", textAlign: "left" }}>
                <div className="popUpField">
                  <div>
                    <Typography>UTR/DU Number :</Typography>
                  </div>
                  <div>{this.state.utrDuNumber}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Amount :</Typography>
                  </div>
                  <div>{this.state.amount}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Bank Name :</Typography>
                  </div>
                  <div>{this.state.bank}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Date of Declaration :</Typography>
                  </div>
                  <div>
                    {this.state.transactionTime.toLocaleString().slice(0, 10)}
                  </div>
                </div>
              </div>
            )}
          </SweetAlert>
        </div>

        {/* Remark and verification display    */}
        <div className="remark_verify_container">
          {/* Remark display  */}
          <div className="remark_container">
            <div style={{ fontWeight: "500" }}>Remark : </div>
            <div style={{ marginLeft: "20px" }}>
              {this.state.remarks.replace(/ /g, "") !== ""
                ? this.state.remarks
                : "No remarks mentioned yet"}
            </div>
          </div>
          {/* Verification status display  */}
          <div className="verify_container">
            <div style={{ fontWeight: "500" }}>Verification Status: </div>
            <div style={{ marginLeft: "20px" }}>
              {" "}
              {this.state.verification === "verified"
                ? "Verified"
                : this.state.verification === "mod_req"
                ? "Modification Required"
                : "Pending"}
            </div>
          </div>
        </div>

        {/* Payment Details complete form   */}
        <div className="paymentsContainer">Payment Details</div>
        {/* Amount    */}
        <div>
          <Typography>Amount</Typography>
          <TextField
            disabled={this.state.disabled}
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
          {this.state.errorAmount && (
            <div style={{ color: "red" }}>
              <Typography>Invalid Amount</Typography>
            </div>
          )}
        </div>

        {/* UTR/DU Number    */}
        <div style={{ marginTop: "10px" }}>
          <Typography>UTR/DU Number</Typography>
          <TextField
            disabled={this.state.disabled}
            className="mb-3"
            required
            fullWidth
            onChange={this.handleChange}
            value={this.state.utrDuNumber}
            variant="outlined"
            name="utrDuNumber"
            label="UTR/DU Number of the Transaction"
            style={{ marginTop: "8px" }}
          />
          {this.state.errorUtrDuNumber && (
            <div style={{ color: "red" }}>
              <Typography>Invalid Entry</Typography>
            </div>
          )}
        </div>

        {/* Bank Name    */}
        <div style={{ marginTop: "10px" }}>
          <Typography>Bank Name</Typography>
          <TextField
            disabled={this.state.disabled}
            className="mb-3"
            required
            fullWidth
            onChange={this.handleChange}
            value={this.state.bank}
            variant="outlined"
            name="bank"
            label="Bank Name"
            style={{ marginTop: "8px" }}
          />
          {this.state.errorBank && (
            <div style={{ color: "red" }}>
              <Typography>Required field</Typography>
            </div>
          )}
        </div>

        {/* Date of Payment    */}
        <div style={{ marginTop: "10px" }}>
          <Typography>Date of Payment</Typography>
          <DatePicker
            disabled={this.state.disabled}
            onChange={(e) => this.onChangeDate(e)}
            value={this.state.transactionTime}
            format={"dd-MM-y"}
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
          ></DatePicker>
          {this.state.errorDate && (
            <div style={{ color: "red" }}>
              <Typography>Please select date</Typography>
            </div>
          )}
        </div>

        {/**
         *
         * Document Collection Component
         *
         */}
        <div style={{ marginTop: "10px" }}>
          <div
            className="formContainer"
            style={{ marginTop: "30px", fontSize: "21px" }}
          >
            Documents Required
          </div>
          <Table>
            <TableBody>
              <div>
                {/* Payment Receipt */}

                <div>
                  <div className="field">
                    <div>Fee Receipt</div>
                    <div>
                      <input
                        disabled={this.state.disabled}
                        type="file"
                        name="Fee Receipt"
                        onChange={this.onFileChange}
                      />
                      {this.state.errorDoc ? (
                        <div className="docsError">Please upload file</div>
                      ) : (
                        ""
                      )}
                      {this.state.docUploaded.filename !== null ||
                      this.state.docUploaded.filename !== undefined ? (
                        <div>
                          <div className="docsPreviewDiv">
                            <div className="docsPreviewFilename">
                              {this.state.docUploaded.originalName
                                ? this.state.docUploaded.originalName.slice(
                                    0,
                                    10
                                  )
                                : " "}
                              {"...."}
                            </div>
                            <DocViewer
                              data={{
                                filename: this.state.docUploaded.filename,
                                contentType: this.state.docUploaded.contentType,
                                originalName:
                                  this.state.docUploaded.originalName,
                              }}
                            />
                          </div>
                          <div>
                            {this.state.verification === "verified" && (
                              <div
                                className="docVerify"
                                style={{ color: "green" }}
                              >
                                Verified
                              </div>
                            )}
                            {this.state.verification === "mod_req" && (
                              <div
                                className="docVerify"
                                style={{ color: "red" }}
                              >
                                Modification Required
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                  <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                </div>
              </div>
            </TableBody>
          </Table>
        </div>

        {/* Back and Next buttons   */}
        <div style={{ margin: "20px 0 20px 0" }}>
          <React.Fragment>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                size="large"
                color="neutral"
                onClick={() => {
                  this.handleBack();
                }}
                style={{ marginRight: "10px" }}
              >
                Back
              </Button>
            </ThemeProvider>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                this.onNext();
              }}
            >
              Next
            </Button>
          </React.Fragment>
        </div>
      </div>
    );
  }
}
