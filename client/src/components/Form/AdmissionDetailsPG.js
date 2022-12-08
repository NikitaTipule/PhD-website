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
import DocViewer from "../../pages/DocViewer";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import DropDown from "react-dropdown";

export default class AdmissionDetailsPG extends Component {
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
      confirmAlert: false,
      otherSpecialization: "",
      branch : "",
      otherBranch : "",

      status: "",
      errorStatus: false,

      pg: { name: docType.pg, error: false, display: true },

      pg_degree_certificate: {name: docType.pg_degree_certificate, error: false, display: true},

      remarks: "",
      verification: "",

      editable: "",
      disabled: false,

      errorUniversity: false,
      errorNomenclature: false,
      errorOtherNomenclature: false,
      errorBranch: false,
      errorOtherBranch: false,
      errorSpecialization: false,
      errorOtherSpecialization: false,
      //errorMarksObtained: false,
      //errorTotalMarks: false,
      errorCGPA: false,
      errorPercentage: false,
      errorFileSize: false,

      documentsUploaded: [],

      token: localStorage.getItem("phd-website-jwt"),
    };
  }

  onChangeBranch = (event) => {
    this.setState({
      branch: event.value
    })
  }

  onChangeStatus = (event) => {
    this.setState({
      status: event.target.value
    })
  }

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

    if(this.state.selectedFile !== undefined && this.state.selectedFile.size > 1000000)
    {
      this.state.errorFileSize = true
    }

    else{
      this.state.errorFileSize = false
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

        //console.log(this.state.documentsUploaded);
      })
      .catch((err) => console.log(err.response || "error"));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateData = () => {
    if(this.state.status === "Passed"){
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
  
      if (this.state.documentsUploaded.some((e) => e.type === docType.pg_degree_certificate)) {
        this.setState({
          pg_degree_certificate: {
            name: this.state.pg_degree_certificate.name,
            error: false,
            display: this.state.pg_degree_certificate.display,
          },
        });
      } else {
        this.setState({
          pg_degree_certificate: {
            name: this.state.pg_degree_certificate.name,
            error: true,
            display: this.state.pg_degree_certificate.display,
          },
        });
      }
    }
    

    this.state.status === ""
      ? this.setState({ errorStatus: true})
      : this.setState({ errorStatus: false});

    this.state.university.replace(/ /g, "") === ""
      ? this.setState({ errorUniversity: true })
      : this.setState({ errorUniversity: false });

    this.state.nomenclature.replace(/ /g, "") === ""
      ? this.setState({ errorNomenclature: true })
      : this.setState({ errorNomenclature: false });

    this.state.otherNomenclature.replace(/ /g, "") === ""
      ? this.setState({ errorOtherNomenclature: true })
      : this.setState({ errorOtherNomenclature: false });

    this.state.otherSpecialization.replace(/ /g, "") === ""
      ? this.setState({ errorOtherSpecialization: true })
      : this.setState({ errorOtherSpecialization: false });

    this.state.branch.replace(/ /g, "") === ""
      ? this.setState({ errorBranch: true })
      : this.setState({ errorBranch: false });

    this.state.otherBranch.replace(/ /g, "") === ""
      ? this.setState({ errorOtherBranch: true })
      : this.setState({ errorOtherBranch: false });

    this.state.specialization.replace(/ /g, "") === ""
      ? this.setState({ errorSpecialization: true })
      : this.setState({ errorSpecialization: false });

    // /^\d+$/.test(this.state.marksObtained) &&
    // parseInt(this.state.marksObtained) < parseInt(this.state.totalMarks)
    //   ? this.setState({ errorMarksObtained: false })
    //   : this.setState({ errorMarksObtained: true });

    // /^\d+$/.test(this.state.totalMarks) &&
    // parseInt(this.state.marksObtained) < parseInt(this.state.totalMarks)
    //   ? this.setState({ errorTotalMarks: false })
    //   : this.setState({ errorTotalMarks: true });

    if(this.state.status === "Passed"){
      !isNaN(parseFloat(this.state.cgpa)) &&
      isFinite(this.state.cgpa) &&
      parseInt(this.state.cgpa) < 10
        ? this.setState({ errorCGPA: false })
        : this.setState({ errorCGPA: true });
    }
    
    if(this.state.status === "Passed"){
      !isNaN(parseFloat(this.state.percentage)) &&
      isFinite(this.state.percentage) &&
      parseInt(this.state.percentage) < 100
        ? this.setState({ errorPercentage: false })
        : this.setState({ errorPercentage: true });
    }
  };

  onSubmit = async (event) => {
    if (this.state.disabled) {
      this.props.nextStep(1);
    } else {
      await this.validateData();
      if (
        this.state.pg.error === false &&
        this.state.errorFileSize === false &&
        this.state.errorUniversity === false &&
        ((this.state.errorBranch === false &&
          this.state.branch !== "OTHER") ||
          (this.state.branch === "OTHER" &&
            this.state.otherBranch)) &&
        ((this.state.errorSpecialization === false &&
          this.state.specialization !== "OTHER") ||
          (this.state.specialization === "OTHER" &&
            this.state.otherSpecialization)) &&
        ((this.state.errorNomenclature === false &&
          this.state.nomenclature !== "OTHER") ||
          (this.state.nomenclature === "OTHER" &&
            this.state.otherNomenclature)) &&
        //this.state.errorMarksObtained === false &&
        //this.state.errorTotalMarks === false &&
        this.state.errorCGPA === false &&
        this.state.errorPercentage === false &&
        this.state.errorStatus === false
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

        this.props.data.academicsPG.status = this.state.status;

        if (this.state.nomenclature === "OTHER") {
          this.props.data.academicsPG.degree =
            this.state.nomenclature + " " + this.state.otherNomenclature;
        } else {
          this.props.data.academicsPG.degree = this.state.nomenclature;
        }

        if (this.state.specialization === "OTHER") {
          this.props.data.academicsPG.specialization =
            this.state.specialization + " " + this.state.otherSpecialization;
        } else {
          this.props.data.academicsPG.specialization =
            this.state.specialization;
        }

        if (this.state.branch === "OTHER") {
          this.props.data.academicsPG.branch =
            this.state.branch + " " + this.state.otherBranch;
        } else {
          this.props.data.academicsPG.branch =
            this.state.branch;
        }

        //this.props.data.academicsPG.degree = this.state.nomenclature + " " + this.state.otherNomenclature;
        //this.props.data.academicsPG.specialization = this.state.specialization + " " + this.state.otherSpecialization;
        // this.props.data.academicsPG.totalAggregate = this.state.marksObtained;
        // this.props.data.academicsPG.totalMarks = this.state.totalMarks;
        if(this.state.status === "Passed"){
          this.props.data.academicsPG.cgpa10 = this.state.cgpa;
        }
        else{
          this.props.data.academicsPG.cgpa10 = "";
        }
        if(this.state.status === "Passed"){
          this.props.data.academicsPG.percentageMarks = this.state.percentage;
        }
        else{
          this.props.data.academicsPG.percentageMarks = "";
        }
        this.props.data.academicsPG.completed = true;
      }
    }
  };

  onBack = (event) => {
    this.props.prevStep(1);
  };

  confirmData = (event) => {
    this.props.nextStep(1);

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
                nomenclature: res.data.user.academicsPG.degree
                  ? res.data.user.academicsPG.degree
                  : "",
                specialization: res.data.user.academicsPG.specialization
                  ? res.data.user.academicsPG.specialization
                  : "",

                branch: res.data.user.academicsPG.branch
                  ? res.data.user.academicsPG.branch
                  : "",

                // marksObtained: res.data.user.academicsPG.totalAggregate
                //   ? res.data.user.academicsPG.totalAggregate
                //   : "",
                // totalMarks: res.data.user.academicsPG.totalMarks
                //   ? res.data.user.academicsPG.totalMarks
                //   : "",
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

                status: res.data.user.academicsPG.status
                  ? res.data.user.academicsPG.status
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
    const dropdown_options_nomenclature = [
      "M.E./ M.Tech",
      // "M.C.A.",
      // "M.Sc.",
      "M.Planning",
      "M.Arch",
      // "M.B.A.",
      // "Post Graduate Degree in Humanities, Social Sciences and Liberal Arts",
      "OTHER",
    ];

    const dropdown_options_branch = [
      "Civil Engineering",
      "Computer Engineering",
      "Electrical Engineering",
      "Electronics & Telecommunication Engineering",
      "Instrumentation & Control Engineering",
      "Mechanical Engineering",
      "Metallurgical Engineering",
      "Manufacturing Engineering and Industrial Management",
      // "Chemical Engineering",
      // "Agricultural Engineering",
      // "M.C.A. Mathematics",
      // "M.Sc. Mathematics",
      // "M.Sc. in Basic and Applied Sciences",
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
                    <Typography>Status of PG Exam : </Typography>
                  </div>
                  <div>{this.state.status}</div>
                </div>
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
                    {this.state.branch} {this.state.otherBranch}
                  </div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Specialization Branch:</Typography>
                  </div>
                  {this.state.specialization !== "" && (
                    <div>
                      {this.state.specialization} {this.state.otherSpecialization}
                    </div>
                  )}
                  {this.state.specialization === "" && (
                    <div>
                      { "None" }
                    </div>
                  )}
                  
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
                {this.state.status === "Passed" && (
                  <div className="popUpField">
                    <div>
                      <Typography>CGPA :</Typography>
                    </div>
                    <div>{this.state.cgpa}</div>
                  </div>
                )
                }
                
                {this.state.status === "Passed" && (
                  <div className="popUpField">
                    <div>
                      <Typography>Percentage :</Typography>
                    </div>
                    <div>{this.state.percentage}%</div>
                  </div>
                )}
                
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

            {/* Status of PG exam - appearing or passed */}
            <div style={{ marginBottom: "12px" }}>
              <div className="formGenderDob">
                <div className="formGender">
                  <div style={{ width: "100%" }}>
                    <Typography>Status of PG Exam</Typography>
                    <div className="radios">
                      <input
                        disabled={this.state.disabled}
                        type="radio"
                        value="Appearing"
                        name="status"
                        checked={this.state.status === "Appearing"}
                        onChange={this.onChangeStatus}
                        className="maleRadio"
                      />
                      Appearing
                      <input
                        disabled={this.state.disabled}
                        type="radio"
                        value="Passed"
                        name="status"
                        checked={this.state.status === "Passed"}
                        onChange={this.onChangeStatus}
                        className="maleRadio"
                      />
                      Passed
                    </div>
                    {this.state.errorStatus && (
                      <div style={{ color: "red" }}>
                        <Typography>Please select Status of PG Exam</Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

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
                placeholder="Select nomenclature of Degree"
              />

              {this.state.errorNomenclature && (
                <div style={{ color: "red" }}>
                  <Typography>Please select Nomenclature</Typography>
                </div>
              )}

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
                          <Typography>
                            Please enter other nomenclature
                          </Typography>
                        </div>
                      )}
                    </div>
                  );
                }
              })()}
            </div>
            
            {/* BRANCH AND OTHER BRANCH FIELD */}
            <div style={{ marginTop: "3px", paddingTop: "15px" }}>
              <Typography style={{ marginBottom: "12px" }}>
                  Branch
              </Typography>
              <DropDown
                disabled={this.state.disabled}
                options={dropdown_options_branch}
                name="branch"
                value={this.state.branch}
                onChange={this.onChangeBranch}
                placeholder="Select Branch"
                required
              />

              {this.state.errorBranch && (
                <div style={{ color: "red" }}>
                  <Typography>Please select Branch</Typography>
                </div>
              )}


              {
                this.state.branch === "OTHER" && (
                  
                    <div>
                      <Typography>
                        Please enter your other branch
                      </Typography>
                      <TextField
                        className="mb-3"
                        fullWidth
                        required
                        onChange={this.handleChange}
                        value={this.state.otherBranch}
                        name="otherBranch"
                        label="Other Branch Field"
                        variant="outlined"
                        style={{ marginTop: "8px" }}
                      />
                      {this.state.errorOtherBranch && (
                        <div style={{ color: "red" }}>
                          <Typography>
                            Please enter other branch
                          </Typography>
                        </div>
                      )}
                    </div>
                  )
                }
              

            </div>
            
            {/* 3. Specialization Branch  */}
            <div style={{ marginBottom: "12px" }}>
              <Typography style={{paddingTop: "15px"}}>Specialization Branch</Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.specialization}
                name="specialization"
                label="Enter specialization branch"
                variant="outlined"
                style={{ marginTop: "8px" }}
                required
              />
              {this.state.errorSpecialization && (
                <div style={{ color: "red" }}>
                  <Typography>
                    Specialization Branch is required field
                  </Typography>
                </div>
              )}
            </div>

            {/* 3. Specialization Branch  */}
            {/* <div className="formNumber" style={{ marginLeft: "0%" }}>
              <Typography style={{ marginBottom: "12px", paddingTop: "15px" }}>
                Specialization Branch
              </Typography>
              <DropDown
                disabled={this.state.disabled}
                options={dropdown_options_specialization}
                name="specialization"
                value={this.state.specialization}
                onChange={this.onChangeSpecialization}
                placeholder="Select specialization branch"
              />
              {this.state.errorSpecialization && (
                <div style={{ color: "red" }}>
                  <Typography>Please select Specialization</Typography>
                </div>
              )}

              {(() => {
                if (
                  this.state.errorSpecialization && (
                    <div style={{ color: "red" }}>
                      <Typography>Please select specialization</Typography>
                    </div>
                  )
                ) {
                }
                if (this.state.specialization === "OTHER") {
                  return (
                    <div>
                      <Typography>
                        Please enter your other specialization
                      </Typography>
                      <TextField
                        className="mb-3"
                        fullWidth
                        required
                        onChange={this.handleChange}
                        value={this.state.otherSpecialization}
                        name="otherSpecialization"
                        label="Other Specialization Field"
                        variant="outlined"
                        style={{ marginTop: "8px" }}
                      />
                      {this.state.errorOtherSpecialization && (
                        <div style={{ color: "red" }}>
                          <Typography>
                            Please enter other specialization
                          </Typography>
                        </div>
                      )}
                    </div>
                  );
                }
              })()}
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
            {this.state.status==="Passed" && (
              <div>
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
                      required
                    />
                    {this.state.errorCGPA && (
                      <div style={{ color: "red" }}>
                        <Typography>Please enter valid CGPA</Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {this.state.status==="Passed" && (
              <div>
                <div className="marksContainer">
                  <div>
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
              </div>
            )}

            
          </form>

          {/**
           *
           * Document Collection Component
           *
           */}
           {this.state.status === "Passed" && 
           (
          <div>
            <div
              className="formContainer"
              style={{ marginTop: "30px", fontSize: "21px" }}
            >
              Documents Required
            </div>
            <div style={{ opacity: "0.7", fontSize: "12px" }}>
              (document size must be less than 1MB)
            </div>
          </div>
           )
          }
          {this.state.status === "Passed" && 
          (
          <Table>
            <TableBody>
              <div>
                {/* PG Marksheet */}
                {this.state.pg.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.pg.name}{" (Compulsory) "}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.pg.name}
                          onChange={this.onFileChange}
                        />
              {(() => {
                if (this.state.errorFileSize)
                {
                  this.state.pg.error = false
                  return(<div className="docsError">File size exceeded than 10 MB</div>)
                }
                else if (this.state.pg.error) {
                  return(<div className="docsError">Please upload file</div>)
                }
              })()}
                        {/* {this.state.pg.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )} */}
                        {this.state.documentsUploaded
                          .filter((doc) => doc.type === this.state.pg.name)
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
              {this.state.status === "Passed" && (
              <div>
                {/* PG Degree Certificate */}
                {this.state.pg.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.pg_degree_certificate.name}{" (Optional) "}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.pg_degree_certificate.name}
                          onChange={this.onFileChange}
                        />
              {(() => {
                if (this.state.errorFileSize)
                {
                  this.state.pg_degree_certificate.error = false
                  return(<div className="docsError">File size exceeded than 10 MB</div>)
                }
              })()}
                        {/* {this.state.pg.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )} */}
                        {this.state.documentsUploaded
                          .filter((doc) => doc.type === this.state.pg_degree_certificate.name)
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
              )}
            </TableBody>
          </Table>
          )}
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
