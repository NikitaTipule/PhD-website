import { TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Button from "@mui/material/Button";
import DatePicker from "react-date-picker";
import SweetAlert from "react-bootstrap-sweetalert";
import "./Documents.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { browserHistory } from "react-router";

export default class AccountsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utrDuNumber: "",
      amount: "",
      transactionTime: "",
      bank: "",
      docUploaded: {
        type: "",
        filename: "",
        originalName: "",
      },

      errorAmount: false,
      errorUtrDuNumber: false,
      errorBank: false,
      errorDate: false,

      open: false,
      confirmAlert: false,

      selectedFile: null,

      token: localStorage.getItem("phd-website-jwt"),
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeDate = (event) => {
    this.setState({ transactionTime: event });
  };

  onChange = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log("img data : ", e.target.result);
    };
  };

  onFileChange = (event) => {
    console.log(event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = async (event) => {
    console.log(this.state.selectedFile);

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

    console.log(formData);

    try {
      axios
        .post(BACKEND_URL + "/files/upload", formData, {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((res) => {
          console.log("File Added", console.log(res));
        });
    } catch (err) {
      console.log(err);
    }
  };

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
  };

  onSubmit = async (event) => {
    await this.validateData();

    if (
      this.state.errorAmount === false &&
      this.state.errorUtrDuNumber === false &&
      this.state.errorBank === false &&
      this.state.errorDate === false
    ) {
      this.setState({ confirmAlert: !this.state.confirmAlert });
      this.props.data.feeDetails.utrDuNumber = this.state.utrDuNumber;
      this.props.data.feeDetails.amount = this.state.amount;
      this.props.data.feeDetails.transactionTime = this.state.transactionTime;
      this.props.data.feeDetails.bank = this.state.bank;
      this.props.data.feeDetails.docUploaded = this.state.docUploaded;
    }
  };

  confirmData = async () => {
    await this.setState({ confirmAlert: !this.state.confirmAlert });
    this.setState({ open: !this.state.open });

    const feeDetails = {
      feeDetails: this.props.data.feeDetails,
    };

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
  };

  handleAlertCanel = () => {
    this.setState({ open: !this.state.open });
  };

  handleNext = () => {
    this.props.nextStep();
  };

  onCancel = () => {
    this.setState({ confirmAlert: !this.state.confirmAlert });
  };

  onBack = () => {
    this.props.prevStep();
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
            this.setState({
              utrDuNumber: res.data.user.feeDetails.utrDuNumber,
              amount: res.data.user.feeDetails.amount,
              transactionTime: res.data.user.feeDetails.transactionTime,
              bank: res.data.user.feeDetails.bank,
              docUploaded: res.data.user.feeDetails.docUploaded,
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  render() {
    const theme = createTheme({
      status: {
        danger: "#e53e3e",
      },
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
            onConfirm={this.confirmData}
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
                    this.confirmData();
                  }}
                >
                  Submit
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
          {this.state.errorAmount && (
            <div style={{ color: "red" }}>
              <Typography>Invalid Amount</Typography>
            </div>
          )}
        </div>

        <div style={{ marginTop: "10px" }}>
          <Typography>UTR/DU Number</Typography>
          <TextField
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
        <div style={{ marginTop: "10px" }}>
          <Typography>Bank Name</Typography>
          <TextField
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
        <div style={{ marginTop: "10px" }}>
          <Typography>Date of Payment</Typography>
          <DatePicker
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
        <div style={{ marginTop: "10px" }}>
          <Typography>Payment Receipt</Typography>
          <div>
            <input type="file" name="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload</button>
          </div>
        </div>

        <div style={{ margin: "20px 0 20px 0" }}>
          <React.Fragment>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                size="large"
                color="neutral"
                onClick={() => {
                  this.onBack();
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
                this.onSubmit();
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
