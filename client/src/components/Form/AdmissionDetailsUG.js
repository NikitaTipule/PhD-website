import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import DatePicker from "react-date-picker";
import SweetAlert from "react-bootstrap-sweetalert";
import "./AdmissionDetails.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { Table, TableBody } from "@material-ui/core";
import { docType } from "../../phdAdmDetails";
import DocViewer from "../../pages/DocViewer";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import DropDown from "react-dropdown";
export default class AdmissionDetailsUG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      university: "",
      nomenclature: "",
      otherNomenclature: "",
      specialization: "",
      //marksObtained: "",
      //totalMarks: "",
      cgpa: "",
      percentage: "",
      dateOfDeclaration: "",
      otherSpecialization: "",
      confirmAlert: false,

      ug: { name: docType.ug, error: false, display: true },
      ugCertificate: {
        name: docType.ugCertificate,
        error: false,
        display: true,
      },

      remarks: "",
      verification: "",

      editable: "",
      disabled: false,

      errorUniversity: false,
      errorNomenclature: false,
      errorSpecialization: false,
      errorOtherSpecialization: false,
      errorOtherNomenclature: false,
      //errorMarksObtained: false,
      //errorTotalMarks: false,
      errorCGPA: false,
      errorPercentage: false,
      errorDod: false,
      errorFileSize: false,
      documentsUploaded: [],

      token: localStorage.getItem("phd-website-jwt"),
    };
  }

  // FUNCTIONS FOR FILE DATA
  onFileChange = async (event) => {
    if (!event.target.files[0]) return;
    if (event.target.files[0].size > 1000000) {
      event.target.value = "";
      alert(`File size of ${event.target.name} exceeded by 1 MB`);
      return;
    }
    await this.setState({ selectedFile: event.target.files[0] });

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

    if (
      this.state.selectedFile !== undefined &&
      this.state.selectedFile.size > 1000000
    ) {
      this.state.errorFileSize = true;
    } else {
      this.state.errorFileSize = false;
    }
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
          const docs = [...this.state.documentsUploaded];
          docs[i] = docUploaded;
          this.setState({ documentsUploaded: docs });
        }

        // this.setState((prevState) => ({
        //   documentsUploaded: [...prevState.documentsUploaded, docUploaded],
        // }));

        // console.log(this.state.documentsUploaded);
      })
      .catch((err) => console.log(err.response || "error"));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeSpecialization = (event) => {
    this.setState({
      specialization: event.value,
    });
  };

  onChangeNomenclature = (event) => {
    this.setState({
      nomenclature: event.value,
    });
  };

  onChangeDate = (event) => {
    this.setState({
      dateOfDeclaration: new Date(
        event.getTime() - event.getTimezoneOffset() * 60000
      ),
    });
  };

  validateData = () => {
    if (this.state.documentsUploaded.some((e) => e.type === docType.ug)) {
      this.setState({
        ug: {
          name: this.state.ug.name,
          error: false,
          display: this.state.ug.display,
        },
      });
    } else if (
      !this.state.documentsUploaded.some((e) => e.type === docType.ug)
    ) {
      this.setState({
        ug: {
          name: this.state.ug.name,
          error: true,
          display: this.state.ug.display,
        },
      });
    }

    if (
      this.state.documentsUploaded.some((e) => e.type === docType.ugCertificate)
    ) {
      this.setState({
        ugCertificate: {
          name: this.state.ugCertificate.name,
          error: false,
          display: this.state.ugCertificate.display,
        },
      });
    } else if (
      !this.state.documentsUploaded.some(
        (e) => e.type === docType.ugCertificate
      )
    ) {
      this.setState({
        ugCertificate: {
          name: this.state.ugCertificate.name,
          error: true,
          display: this.state.ugCertificate.display,
        },
      });
    }
    var s = this.state.university.replace(/ /g, "");
    s === ""
      ? this.setState({ errorUniversity: true })
      : this.setState({ errorUniversity: false });

    this.state.otherSpecialization.replace(/ /g, "") === ""
      ? this.setState({ errorOtherSpecialization: true })
      : this.setState({ errorOtherSpecialization: false });

    var n = this.state.nomenclature.replace(/ /g, "");
    n === ""
      ? this.setState({ errorNomenclature: true })
      : this.setState({ errorNomenclature: false });

    var sp = this.state.specialization.replace(/ /g, "");
    sp === ""
      ? this.setState({ errorSpecialization: true })
      : this.setState({ errorSpecialization: false });

    this.state.otherNomenclature.replace(/ /g, "") === ""
      ? this.setState({ errorOtherNomenclature: true })
      : this.setState({ errorOtherNomenclature: false });
    // /^\d+$/.test(this.state.marksObtained) &&
    // parseInt(this.state.marksObtained) < parseInt(this.state.totalMarks)
    //   ? this.setState({ errorMarksObtained: false })
    //   : this.setState({ errorMarksObtained: true });

    // /^\d+$/.test(this.state.totalMarks) &&
    // parseInt(this.state.marksObtained) < parseInt(this.state.totalMarks)
    //   ? this.setState({ errorTotalMarks: false })
    //   : this.setState({ errorTotalMarks: true });

    if (this.state.cgpa !== "") {
      !isNaN(parseFloat(this.state.cgpa)) &&
      isFinite(this.state.cgpa) &&
      parseInt(this.state.cgpa) < 10
        ? this.setState({ errorCGPA: false })
        : this.setState({ errorCGPA: true });
    }

    !isNaN(parseFloat(this.state.percentage)) &&
    isFinite(this.state.percentage) &&
    parseInt(this.state.percentage) < 100
      ? this.setState({ errorPercentage: false })
      : this.setState({ errorPercentage: true });

    this.state.dateOfDeclaration === ""
      ? this.setState({ errorDod: true })
      : this.setState({ errorDod: false });
  };

  onBack = (event) => {
    this.props.prevStep(1);
  };

  onNext = async (event) => {
    if (this.state.disabled) {
      this.props.nextStep(1);
    } else {
      await this.validateData();
      if (
        !this.state.ug.error &&
        !this.state.ugCertificate.error &&
        this.state.errorUniversity === false &&
        this.state.errorSpecialization === false &&
        this.state.errorFileSize === false &&
        ((this.state.errorSpecialization === false &&
          this.state.specialization !== "OTHER") ||
          (this.state.specialization === "OTHER" &&
            this.state.otherSpecialization)) &&
        //this.state.errorMarksObtained === false &&
        //this.state.errorTotalMarks === false &&
        this.state.errorCGPA === false &&
        this.state.errorPercentage === false &&
        this.state.errorDod === false
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
        this.props.data.academicsUG.institute = this.state.university;

        if (this.state.nomenclature === "OTHER") {
          this.props.data.academicsUG.degree =
            this.state.nomenclature + " " + this.state.otherNomenclature;
        } else {
          this.props.data.academicsUG.degree = this.state.nomenclature;
        }

        if (this.state.specialization === "OTHER") {
          this.props.data.academicsUG.specialization =
            this.state.specialization + " " + this.state.otherSpecialization;
        } else {
          this.props.data.academicsUG.specialization =
            this.state.specialization;
        }

        //this.props.data.academicsUG.totalAggregate = this.state.marksObtained;
        //this.props.data.academicsUG.totalMarks = this.state.totalMarks;
        this.props.data.academicsUG.cgpa10 = this.state.cgpa;
        this.props.data.academicsUG.percentageMarks = this.state.percentage;
        this.props.data.academicsUG.dateOfDeclaration =
          this.state.dateOfDeclaration;
        this.props.data.academicsUG.completed = true;
      }
    }
  };

  confirmData = (event) => {
    this.props.nextStep(1);

    const academicsUG = {
      academicsUG: this.props.data.academicsUG,
    };

    try {
      axios
        .post(BACKEND_URL + "/students/edit/info", academicsUG, {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((res) => {
          console.log("UG Data Added");
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
            res.data.user.academicsUG &&
              this.setState({
                university: res.data.user.academicsUG.institute
                  ? res.data.user.academicsUG.institute
                  : "",
                nomenclature: res.data.user.academicsUG.degree
                  ? res.data.user.academicsUG.degree
                  : "",
                specialization: res.data.user.academicsUG.specialization
                  ? res.data.user.academicsUG.specialization
                  : "",
                // marksObtained: res.data.user.academicsUG.totalAggregate
                //   ? res.data.user.academicsUG.totalAggregate
                //   : "",
                // totalMarks: res.data.user.academicsUG.totalMarks
                //   ? res.data.user.academicsUG.totalMarks
                //   : "",
                cgpa: res.data.user.academicsUG.cgpa10
                  ? res.data.user.academicsUG.cgpa10
                  : "",
                percentage: res.data.user.academicsUG.percentageMarks
                  ? res.data.user.academicsUG.percentageMarks
                  : "",
                dateOfDeclaration: res.data.user.academicsUG.dateOfDeclaration
                  ? res.data.user.academicsUG.dateOfDeclaration
                  : "",
                remarks: res.data.user.academicsUG.remarks
                  ? res.data.user.academicsUG.remarks
                  : "",
                verification: res.data.user.academicsUG.verification
                  ? res.data.user.academicsUG.verification
                  : "",
              });
            this.setState({ editable: res.data.user.editable });
            res.data.user.editable &&
            (res.data.user.academicsUG.verification === "mod_req" ||
              res.data.user.academicsUG.verification === "pending")
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
    const dropdown_options_nomenclature = [
      "B.E./ B.Tech",
      "B.Planning",
      "B.Arch",
      "OTHER",
    ];

    const dropdown_options_specialization = [
      "Civil Engineering",
      "Computer Engineering",
      "Electrical Engineering",
      "Electronics and Telecommunication Engineering",
      "Instrumentation and Control Engineering",
      "Mechanical Engineering",
      "Metallurgy and Materials Science",
      "Manufacturing Engineering and Industrial Management",
      "OTHER",
    ];

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
      <div className="admission_container" style={{ marginTop: "90px" }}>
        {/* Confirmation Alert */}
        <div>
          <SweetAlert
            title={"Admission Details - UG"}
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
                    <Typography>Nomenclature of Degree :</Typography>
                  </div>
                  <div>
                    {this.state.nomenclature} {this.state.otherNomenclature}
                  </div>
                </div>

                <div className="popUpField">
                  <div>
                    <Typography>Branch :</Typography>
                  </div>
                  <div>
                    {this.state.specialization} {this.state.otherSpecialization}
                  </div>
                </div>
                {/* <div className="popUpField">
                  <div>
                    <Typography>Marks Obtained :</Typography>
                  </div>
                  <div>{this.state.marksObtained}</div>
                </div> */}
                {/* <div className="popUpField">
                  <div>
                    <Typography>Total Marks :</Typography>
                  </div>
                  <div>{this.state.totalMarks}</div>
                </div> */}
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
                <div className="popUpField">
                  <div>
                    <Typography>Date of Result Declaration :</Typography>
                  </div>
                  <div>
                    {this.state.dateOfDeclaration.toLocaleString().slice(0, 10)}
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

        {/* Academics UG Details complete form  */}
        <div className="title">Academic Details - UG</div>
        <div className={"Form"} style={{ zIndex: "-1" }}>
          <form>
            {/* 1. University/Institute of UG  */}
            <div style={{ marginBottom: "12px" }}>
              <Typography>University/Institute</Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.university}
                name="university"
                label="University/Institute"
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
            {/* 2. Nomenclature of Degree  */}
            {/* <div style={{ marginBottom: "12px" }}>
              <Typography>Nomenclature of Degree</Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.nomenclature}
                name="nomenclature"
                label="Nomenclature of Degree"
                variant="outlined"
                required
                style={{ marginTop: "8px" }}
              />
              {this.state.errorNomenclature && (
                <div style={{ color: "red" }}>
                  <Typography>
                    Nomenclature of degree is required field
                  </Typography>
                </div>
              )}
            </div> */}
            <div className="formNumber" style={{ marginLeft: "0%" }}>
              <Typography style={{ marginBottom: "12px" }}>
                Nomenclature of Degree
              </Typography>
              <DropDown
                disabled={this.state.disabled}
                options={dropdown_options_nomenclature}
                name="nomenclature"
                value={this.state.nomenclature}
                onChange={this.onChangeNomenclature}
                placeholder="Select Nomenclature of Degree"
              />

              {this.state.errorNomenclature && (
                <div style={{ color: "red" }}>
                  <Typography>Please select nomenclature</Typography>
                </div>
              )}
            </div>

            {(() => {
              if (
                this.state.errorNomenclature && (
                  <div style={{ color: "red" }}>
                    <Typography>Please select Nomenclature</Typography>
                  </div>
                )
              ) {
              }
              if (this.state.nomenclature === "OTHER") {
                return (
                  <div>
                    <Typography>
                      Please enter your other nomenclature
                    </Typography>
                    <TextField
                      className="mb-3"
                      fullWidth
                      required
                      onChange={this.handleChange}
                      value={this.state.otherNomenclature}
                      name="otherNomenclature"
                      label="Other Nomenclature Field"
                      variant="outlined"
                      style={{ marginTop: "8px" }}
                    />
                    {this.state.errorOtherNomenclature && (
                      <div style={{ color: "red" }}>
                        <Typography>Please enter other nomenclature</Typography>
                      </div>
                    )}
                  </div>
                );
              }
            })()}

            {/* 3. Specialization Branch  */}
            <div className="formNumber" style={{ marginLeft: "0%" }}>
              <Typography style={{ marginBottom: "12px", paddingTop: "15px" }}>
                Branch
              </Typography>
              <DropDown
                disabled={this.state.disabled}
                options={dropdown_options_specialization}
                name="specialization"
                value={this.state.specialization}
                onChange={this.onChangeSpecialization}
                placeholder="Select Branch"
              />
              {this.state.errorSpecialization && (
                <div style={{ color: "red" }}>
                  <Typography>Please select Branch</Typography>
                </div>
              )}
              {(() => {
                if (
                  this.state.errorSpecialization && (
                    <div style={{ color: "red" }}>
                      <Typography>Please select Branch</Typography>
                    </div>
                  )
                ) {
                }
                if (this.state.specialization === "OTHER") {
                  return (
                    <div>
                      <Typography>Please enter your other Branch</Typography>
                      <TextField
                        className="mb-3"
                        fullWidth
                        required
                        onChange={this.handleChange}
                        value={this.state.otherSpecialization}
                        name="otherSpecialization"
                        label="Other Branch Field"
                        variant="outlined"
                        style={{ marginTop: "8px" }}
                      />
                      {this.state.errorOtherSpecialization && (
                        <div style={{ color: "red" }}>
                          <Typography>Please enter other Branch</Typography>
                        </div>
                      )}
                    </div>
                  );
                }
              })()}
            </div>
            {/* <div style={{ marginBottom: "12px" }}>
              <Typography>Specialization Branch</Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.specialization}
                name="specialization"
                label="Specialization Branch"
                variant="outlined"
                required
                style={{ marginTop: "8px" }}
              />
              {this.state.errorSpecialization && (
                <div style={{ color: "red" }}>
                  <Typography>Specialization is required field</Typography>
                </div>
              )}
            </div> */}
            {/*
             * 4. Marks Obtained
             * 5. Total Marks
             */}
            {/* <div className="marksContainer">
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
            </div> */}
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

            <div style={{ marginTop: "10px", marginBottom: "30px" }}>
              <Typography>Date of Result Declaration</Typography>
              <DatePicker
                disabled={this.state.disabled}
                onChange={(e) => this.onChangeDate(e)}
                value={
                  typeof this.state.dateOfDeclaration === "string" &&
                  this.state.dateOfDeclaration !== ""
                    ? new Date(this.state.dateOfDeclaration)
                    : this.state.dateOfDeclaration
                }
                format={"dd-MM-y"}
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
              ></DatePicker>
              {this.state.errorDod && (
                <div style={{ color: "red" }}>
                  <Typography>Please select the Date of Declaration</Typography>
                </div>
              )}
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
          <div style={{ opacity: "0.7", fontSize: "12px" }}>
            (Document size must be less than 1MB)
          </div>
          <Table>
            <TableBody>
              <div>
                {/* UG Marksheet */}
                {this.state.ug.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.ug.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.ug.name}
                          onChange={this.onFileChange}
                        />
                        {(() => {
                          if (this.state.errorFileSize) {
                            this.state.ug.error = false;
                            return (
                              <div className="docsError">
                                File size exceeded than 1 MB
                              </div>
                            );
                          } else if (this.state.ug.error) {
                            return (
                              <div className="docsError">
                                Please upload file
                              </div>
                            );
                          }
                        })()}

                        {/* {this.state.errorFileSize ? (
                          <div className="docsError">File size exceeded than 10 MB</div>
                        ) : (
                          ""
                        )}

                        {this.state.ug.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )} */}

                        {this.state.documentsUploaded
                          .filter((doc) => doc.type === this.state.ug.name)
                          .map((doc, id) => (
                            <div key={id}>
                              <div className="docsPreviewDiv">
                                <div className="docsPreviewFilename">
                                  {doc.originalName.slice(0, 10) + "...  "}
                                </div>
                                <DocViewer
                                  data={{
                                    filename: doc.filename,
                                    contentType: doc.contentType,
                                    originalName: doc.originalName,
                                  }}
                                />
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
                          ))}
                      </div>
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </div>
                ) : (
                  " "
                )}

                {this.state.ugCertificate.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.ugCertificate.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.ugCertificate.name}
                          onChange={this.onFileChange}
                        />
                        {(() => {
                          if (this.state.errorFileSize) {
                            this.state.ugCertificate.error = false;
                            return (
                              <div className="docsError">
                                File size exceeded than 10 MB
                              </div>
                            );
                          } else if (this.state.ugCertificate.error) {
                            return (
                              <div className="docsError">
                                Please upload file
                              </div>
                            );
                          }
                        })()}

                        {/* {this.state.errorFileSize ? (
                          <div className="docsError">File size exceeded than 10 MB</div>
                        ) : (
                          ""
                        )}

                        {this.state.ug.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )} */}

                        {this.state.documentsUploaded
                          .filter(
                            (doc) => doc.type === this.state.ugCertificate.name
                          )
                          .map((doc, id) => (
                            <div key={id}>
                              <div className="docsPreviewDiv">
                                <div className="docsPreviewFilename">
                                  {doc.originalName.slice(0, 10) + "...  "}
                                </div>
                                <DocViewer
                                  data={{
                                    filename: doc.filename,
                                    contentType: doc.contentType,
                                    originalName: doc.originalName,
                                  }}
                                />
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
                          ))}
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

          <div style={{ marginBottom: "30px" }}>
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
                  this.onNext();
                }}
              >
                Next
              </Button>
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
}
