import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import axios from "axios";
// import { ldapAuthUrl } from "../../../../config/configKeys";
import Button from "@mui/material/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import "./AdmissionDetails.css";
import { BACKEND_URL } from "../../config";

export default class AdmissionDetailsPG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      university: "",
      nomanclaure: "",
      marksObtained: "",
      totalMarks: "",
      cgpa: "",
      percentage: "",
      confirmAlert: false,

      errorUniversity: false,
      errorNomanclaure: false,
      errorMarksObtained: false,
      errorTotalMarks: false,
      errorCGPA: false,
      errorPercentage: false,

      token: localStorage.getItem("phd-website-jwt"),
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateData = () => {
    this.state.university.replace(/ /g, "") === ""
      ? this.setState({ errorUniversity: true })
      : this.setState({ errorUniversity: false });

    this.state.nomanclaure.replace(/ /g, "") === ""
      ? this.setState({ errorNomanclaure: true })
      : this.setState({ errorNomanclaure: false });

    /^\d+$/.test(this.state.marksObtained) &&
    parseInt(this.state.marksObtained) < parseInt(this.state.totalMarks)
      ? this.setState({ errorMarksObtained: false })
      : this.setState({ errorMarksObtained: true });

    /^\d+$/.test(this.state.totalMarks) &&
    parseInt(this.state.marksObtained) < parseInt(this.state.totalMarks)
      ? this.setState({ errorTotalMarks: false })
      : this.setState({ errorTotalMarks: true });

    !isNaN(parseFloat(this.state.cgpa)) &&
    isFinite(this.state.cgpa) &&
    parseInt(this.state.cgpa) < 10
      ? this.setState({ errorCGPA: false })
      : this.setState({ errorCGPA: true });

    !isNaN(parseFloat(this.state.percentage)) &&
    isFinite(this.state.percentage) &&
    parseInt(this.state.percentage) < 100
      ? this.setState({ errorPercentage: false })
      : this.setState({ errorPercentage: true });
  };

  onSubmit = async (event) => {
    // await this.validateData();

    if (
      this.state.errorUniversity === false &&
      this.state.errorNomanclaure === false &&
      this.state.errorMarksObtained === false &&
      this.state.errorTotalMarks === false &&
      this.state.errorCGPA === false &&
      this.state.errorPercentage === false
    ) {
      this.setState({ confirmAlert: !this.state.confirmAlert });
      this.props.data.academicsPG.pgUniversity = this.state.university;
      this.props.data.academicsPG.pgNomanclaure = this.state.nomanclaure;
      this.props.data.academicsPG.pgMarksObtained = this.state.marksObtained;
      this.props.data.academicsPG.pgTotalMarks = this.state.totalMarks;
      this.props.data.academicsPG.pgCGPA = this.state.cgpa;
      this.props.data.academicsPG.pgPercentage = this.state.percentage;
    }
  };

  confirmData = (event) => {
    this.props.nextStep();
    console.log(this.props.data);
    const StudentSchema = {
      personalInfo: this.props.data.personalInfo,
      academicsUG: this.props.data.academicsUG,
      academicsPG: this.props.data.academicsPG,
    };

    const personalInfo = {
      mobile: "999",
      nationality: "i",
      category: "jh",
      aadhar: "gsjdg",
      dob: {
        $date: "2021-10-08T02:28:36.000Z",
      },
      ageYears: "91082",
      physcialDisability: true,
      department: "Computer Engineering",
      adressPermenant: "addd",
      adressCorrespondance: "skhk",
    };

    try {
      console.log(this.state.token);
      axios
        .post(BACKEND_URL + "/students/edit/info", personalInfo, {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  onCancel = () => {
    this.setState({
      confirmAlert: !this.state.confirmAlert,
    });
  };

  render() {
    return (
      <div className="container">
        {/* Confirmation Alert */}
        <div>
          <SweetAlert
            title={"Admission Details - PG"}
            show={this.state.confirmAlert}
            onConfirm={this.confirmData}
            onCancel={this.onCancel}
            customButtons={
              <React.Fragment>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    this.onCancel();
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={() => {
                    this.confirmData();
                  }}
                >
                  Confirm
                </Button>
              </React.Fragment>
            }
          >
            {() => (
              <div style={{ alignItems: "left", textAlign: "left" }}>
                <div className="popUpField">
                  <div>
                    <Typography>University/Institute : </Typography>
                  </div>
                  <div>{this.state.university}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Nomanclaure of Degree :</Typography>
                  </div>
                  <div>{this.state.nomanclaure}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Marks Obtained :</Typography>
                  </div>
                  <div>{this.state.marksObtained}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Total Marks :</Typography>
                  </div>
                  <div>{this.state.totalMarks}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>CGPA :</Typography>
                  </div>
                  <div>{this.state.cgpa}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Percentage :</Typography>
                  </div>
                  <div>{this.state.percentage}%</div>
                </div>
              </div>
            )}
          </SweetAlert>
        </div>
        <div className="title">Academic Details - PG</div>
        <div className={"Form"}>
          <form onSubmit={this.onSubmit}>
            {/* 1. University/Institute of PG  */}
            <div style={{ marginBottom: "12px" }}>
              <Typography>University/Institute</Typography>
              <TextField
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.university}
                name="university"
                label="Univerity/Institute"
                variant="outlined"
                required
                style={{ marginTop: "8px" }}
              />
              {this.state.errorUniversity && (
                <div style={{ color: "red" }}>
                  <Typography>
                    University/Institute is required field
                  </Typography>
                </div>
              )}
            </div>
            {/* 2. Nomanclaure of Degree  */}
            <div style={{ marginBottom: "12px" }}>
              <Typography>Nomanclaure of Degree</Typography>
              <TextField
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.nomanclaure}
                name="nomanclaure"
                label="Nomanclaure of Degree"
                variant="outlined"
                required
                style={{ marginTop: "8px" }}
              />
              {this.state.errorNomanclaure && (
                <div style={{ color: "red" }}>
                  <Typography>
                    Nomanclaure of degree is required field
                  </Typography>
                </div>
              )}
            </div>
            {/*
             * 4. Marks Obtained
             * 5. Total Marks
             */}
            <div className="marksContainer">
              <div>
                <Typography>Marks Obtained</Typography>
                <TextField
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.marksObtained}
                  name="marksObtained"
                  label="Marks Obtained"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
                {this.state.errorMarksObtained && (
                  <div style={{ color: "red" }}>
                    <Typography>Invalid entry</Typography>
                  </div>
                )}
              </div>
              <div className="totalMarks">
                <Typography>Total Marks</Typography>
                <TextField
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.totalMarks}
                  name="totalMarks"
                  label="Totals Marks"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
                {this.state.errorTotalMarks && (
                  <div style={{ color: "red" }}>
                    <Typography>Invalid entry</Typography>
                  </div>
                )}
              </div>
            </div>
            {/*
             *   6. CGPA
             *   7. Percentage of Marks
             */}
            <div className="marksContainer">
              <div>
                <Typography>CGPA</Typography>
                <TextField
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.cgpa}
                  name="cgpa"
                  label="CGPA"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
                {this.state.errorCGPA && (
                  <div style={{ color: "red" }}>
                    <Typography>Please enter valid CGPA</Typography>
                  </div>
                )}
              </div>
              <div className="totalMarks">
                <Typography>Percentage</Typography>
                <TextField
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.percentage}
                  name="percentage"
                  label="Percentage"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
                {this.state.errorPercentage && (
                  <div style={{ color: "red" }}>
                    <Typography>Please enter valid percentage</Typography>
                  </div>
                )}
              </div>
            </div>
          </form>

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
            Next
          </button>
        </div>
      </div>
    );
  }
}
