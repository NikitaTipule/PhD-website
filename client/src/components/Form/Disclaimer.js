import React, { Component } from "react";
// import { TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Button from "@mui/material/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import "./AdmissionDetails.css";
import { BACKEND_URL } from "../../config";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default class Disclaimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertopen: false,
      check: false,
    };
  }

  onSubmit = async (event) => {
    try {
      await axios
        .post(
          BACKEND_URL + "/students/lock",
          { editable: false },
          {
            headers: {
              "phd-website-jwt": localStorage.getItem("phd-website-jwt"),
            },
          }
        )
        .then((res) => {
          this.setState({ alertopen: !this.state.alertopen });
          // console.log("profile locked");
        });
    } catch (err) {
      console.log(err);
    }
  };

  onCancel = async (event) => {
    await this.setState({ alertopen: !this.state.alertopen });
  };

  onBack = () => {
    this.props.nextStep();
  };

  handleNext = () => {
    this.props.nextStep();
  };

  onCheck = (event) => {
    this.setState({
      check: !this.state.check,
    });
  };

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
      <div style={{ margin: "30px", marginRight: "60px", marginTop: "100px" }}>
        {/* Popup on Success */}
        <div>
          <SweetAlert
            success
            show={this.state.alertopen}
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

        <div
          style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "700" }}
        >
          Declaration
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "40px",
          }}
        >
          <input
            name="check"
            value={true}
            checked={this.state.check === true}
            onChange={this.onCheck}
            type="checkbox"
            style={{
              marginTop: "8px",
              marginRight: "12px",
              // width: "300px",
            }}
          />
          <div style={{ fontSize: "19px", textAlign: "justify" }}>
            I have read all the rules of admission and after understanding these
            rules, I have filled this application form for admission to Ph.D.
            course in COEP Technological University for the academic year 2023 - 24. The information given
            by me in this application is true to the best of my knowledge and
            belief. At any later state, if it is found that I have furnished
            wrong information and/or submitted false certificate(s), I am aware
            that my admission stands cancelled and fees paid by me will be
            forfeited. Further, I will be subject to legal and/or penal action
            as per the provisions of the law.
            <br />
            <br />
            (Please make sure that information that you've filled in Application
            is correct. It can not be modified once you submit.)
          </div>
        </div>

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
              Cancel
            </Button>
          </ThemeProvider>
          <Button
            variant="contained"
            color="success"
            size="large"
            disabled={!this.state.check}
            onClick={() => {
              this.onSubmit();
            }}
          >
            Submit
          </Button>
        </React.Fragment>
      </div>
    );
  }
}
