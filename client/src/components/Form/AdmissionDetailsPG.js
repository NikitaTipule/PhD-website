import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Button from "@mui/material/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import "./AdmissionDetails.css";
import { BACKEND_URL } from "../../config";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { Table, TableBody } from "@material-ui/core";
import { docType } from "../../phdAdmDetails";
import viewDoc from "../../pages/DocViewer";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

      pg: { name: docType.pg, error: false, display: true },

      remarks: "",
      verification: "",

      editable: "",
      disabled: "",

      errorUniversity: false,
      errorNomanclaure: false,
      errorMarksObtained: false,
      errorTotalMarks: false,
      errorCGPA: false,
      errorPercentage: false,

      documentsUploaded: [],

      token: localStorage.getItem("phd-website-jwt"),
    };
  }

  // FUNCTIONS FOR FILE DATA
  onFileChange = async (event) => {
    await this.setState({ selectedFile: event.target.files[0] });

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

    const i = await this.state.documentsUploaded
      .map((e) => e.type)
      .indexOf(event.target.name);

    axios
      .post(BACKEND_URL + "/files/upload", formData, {
        headers: {
          "phd-website-jwt": this.state.token,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const docUploaded = {
          type: event.target.name,
          filename: res.data.filename,
          contentType: res.data.contentType,
          originalName: res.data.originalname,
          verification: "pending",
        };

        if (i === -1) {
          this.setState((prevState) => ({
            documentsUploaded: [...prevState.documentsUploaded, docUploaded],
          }));
        } else {
          this.state.documentsUploaded[i] = docUploaded;
        }

        // this.setState((prevState) => ({
        //   documentsUploaded: [...prevState.documentsUploaded, docUploaded],
        // }));

        console.log(this.state.documentsUploaded);
      })
      .catch((err) => console.log(err.response || "error"));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateData = () => {
    if (this.state.documentsUploaded.some((e) => e.type === docType.pg)) {
      this.setState({
        pg: {
          name: this.state.pg.name,
          error: false,
          display: this.state.pg.display,
        },
      });
    } else {
      this.setState({
        pg: {
          name: this.state.pg.name,
          error: true,
          display: this.state.pg.display,
        },
      });
    }
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
    if (this.state.disabled) {
      this.props.nextStep();
    } else {
      await this.validateData();
      if (
        this.state.errorUniversity === false &&
        this.state.errorNomanclaure === false &&
        this.state.errorMarksObtained === false &&
        this.state.errorTotalMarks === false &&
        this.state.errorCGPA === false &&
        this.state.errorPercentage === false
      ) {
        if (!this.state.disabled) {
          const documentsUploaded = {
            documentsUploaded: this.state.documentsUploaded,
          };
          try {
            axios
              .post(BACKEND_URL + "/students/edit/docs", documentsUploaded, {
                headers: { "phd-website-jwt": this.state.token },
              })
              .then((res) => {
                console.log("Documents Added");
              });
          } catch (err) {
            console.log(err.res);
          }
        }
        this.setState({ confirmAlert: !this.state.confirmAlert });
        this.props.data.academicsPG.institute = this.state.university;
        this.props.data.academicsPG.degree = this.state.nomanclaure;
        this.props.data.academicsPG.totalAggregate = this.state.marksObtained;
        this.props.data.academicsPG.totalMarks = this.state.totalMarks;
        this.props.data.academicsPG.cgpa10 = this.state.cgpa;
        this.props.data.academicsPG.percentageMarks = this.state.percentage;
      }
    }
  };

  onBack = (event) => {
    this.props.prevStep();
  };

  confirmData = (event) => {
    this.props.nextStep();

    const academicsPG = {
      academicsPG: this.props.data.academicsPG,
    };

    try {
      axios
        .post(BACKEND_URL + "/students/edit/info", academicsPG, {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((res) => {
          console.log("PG Data Added");
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
            res.data.user.academicsPG &&
              this.setState({
                university: res.data.user.academicsPG.institute
                  ? res.data.user.academicsPG.institute
                  : "",
                nomanclaure: res.data.user.academicsPG.degree
                  ? res.data.user.academicsPG.degree
                  : "",
                marksObtained: res.data.user.academicsPG.totalAggregate
                  ? res.data.user.academicsPG.totalAggregate
                  : "",
                totalMarks: res.data.user.academicsPG.totalMarks
                  ? res.data.user.academicsPG.totalMarks
                  : "",
                cgpa: res.data.user.academicsPG.cgpa10
                  ? res.data.user.academicsPG.cgpa10
                  : "",
                percentage: res.data.user.academicsPG.percentageMarks
                  ? res.data.user.academicsPG.percentageMarks
                  : "",
                remarks: res.data.user.academicsPG.remarks
                  ? res.data.user.academicsPG.remarks
                  : "",
                verification: res.data.user.academicsPG.verification
                  ? res.data.user.academicsPG.verification
                  : "",
              });
            this.setState({ editable: res.data.user.editable });
            res.data.user.editable &&
            (res.data.user.academicsPG.verification === "mod_req" ||
              res.data.user.academicsPG.verification === "pending")
              ? this.setState({ disabled: false })
              : this.setState({ disabled: true });

            res.data.user.documentsUploaded &&
              this.setState({
                documentsUploaded: res.data.user.documentsUploaded
                  ? res.data.user.documentsUploaded
                  : [],
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
      <div className="admission_container">
        {/* Confirmation Alert */}
        <div>
          <SweetAlert
            title={"Admission Details - PG"}
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
                  Save and Proceed
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

        {/* Academics PG Details complete from  */}
        <div className="title">Academic Details - PG</div>
        <div className={"Form"}>
          <form onSubmit={this.onSubmit}>
            {/* 1. University/Institute of PG  */}
            <div style={{ marginBottom: "12px" }}>
              <Typography>University/Institute</Typography>
              <TextField
                disabled={this.state.disabled}
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
                disabled={this.state.disabled}
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
                  disabled={this.state.disabled}
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
                  disabled={this.state.disabled}
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
                  disabled={this.state.disabled}
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
                  disabled={this.state.disabled}
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

          {/**
           *
           * Document Collection Component
           *
           */}
          <div
            className="formContainer"
            style={{ marginTop: "30px", fontSize: "21px" }}
          >
            Documents Required
          </div>
          <Table>
            <TableBody>
              <div>
                {/* UG Marksheet */}
                {this.state.pg.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.pg.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.pg.name}
                          onChange={this.onFileChange}
                        />
                        {this.state.pg.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === this.state.pg.name) {
                            return (
                              <div>
                                <div className="docsPreviewDiv">
                                  <div className="docsPreviewFilename">
                                    {doc.originalName.slice(0, 10) + "...  "}
                                  </div>
                                  <div
                                    className="previewIcon"
                                    onClick={() => {
                                      // this.loader();
                                      viewDoc({
                                        filename: doc.filename,
                                        contentType: doc.contentType,
                                        originalName: doc.originalName,
                                      });
                                    }}
                                  >
                                    <VisibilityIcon />
                                  </div>
                                </div>
                                <div>
                                  {doc.verification === "verified" && (
                                    <div
                                      className="docVerify"
                                      style={{ color: "green" }}
                                    >
                                      Verified
                                    </div>
                                  )}
                                  {doc.verification === "mod_req" && (
                                    <div
                                      className="docVerify"
                                      style={{ color: "red" }}
                                    >
                                      Modification Required
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </div>
                ) : (
                  " "
                )}
              </div>
            </TableBody>
          </Table>

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
