import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import axios from "axios";
// import { ldapAuthUrl } from "../../../../config/configKeys";
import Button from "@mui/material/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import "./AdmissionDetails.css";

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
      headers: {
        token: localStorage.getItem("token"),
      },
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    this.setState({ confirmAlert: !this.state.confirmAlert });
    this.props.data.academicsPG.pgUniversity = this.state.university;
    this.props.data.academicsPG.pgNomanclaure = this.state.nomanclaure;
    this.props.data.academicsPG.pgMarksObtained = this.state.marksObtained;
    this.props.data.academicsPG.pgTotalMarks = this.state.totalMarks;
    this.props.data.academicsPG.pgCGPA = this.state.cgpa;
    this.props.data.academicsPG.pgPercentage = this.state.percentage;
  };

  confirmData = (event) => {
    this.props.nextStep();
    console.log(this.props.data);
    const StudentSchema = {
      personalInfo: this.props.data.personalInfo,
      academicsUG: this.props.data.academicsUG,
      academicsPG: this.props.data.academicsPG,
    };
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
