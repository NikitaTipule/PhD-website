import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import DatePicker from "react-date-picker";
import DropDown from "react-dropdown";
import SweetAlert from "react-bootstrap-sweetalert";
import "react-dropdown/style.css";
import "./PersonalDetails.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { Table, TableBody } from "@material-ui/core";
import { docType } from "../../phdAdmDetails";
import DocViewer from "../../pages/DocViewer";
import VisibilityIcon from "@mui/icons-material/Visibility";
//import e from "cors";

export default class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmAlert: false,

      //document collection
      photo: { name: docType.photo, error: false, display: true },
      sign: { name: docType.sign, error: false, display: true },
      c_certificate: {
        name: docType.c_certificate,
        error: false,
        display: false,
      },
      c_validity: { name: docType.c_validity, error: false, display: false },
      c_ncl: { name: docType.c_ncl, error: false, display: false },
      ews: { name: docType.ews, error: false, display: false },
      nationality_c: {
        name: docType.nationality_c,
        error: false,
        display: true,
      },
      doc_physicallyDisable: {
        name: docType.doc_physicallyDisable,
        error: false,
        display: false,
      },

      name: "",
      middleName: "",
      gender: "",
      dob: "",
      // email: "",
      // mobile: "",
      motherName: "",
      nationality: "",
      category: "",
      aadhar: "",
      address: "",
      physicallyDisabled: "",
      department: "",

      remarks: "",
      verification: "",

      documentsUploaded: [],
      editable: "",

      disabled: false,

      errorName: false,
      errorMiddleName: false,
      errorGender: false,
      errorDob: false,
      errorMotherName: false,
      // errorEmail: false,
      // errorMobile: false,
      errorNationality: false,
      errorCategory: false,
      errorAadhar: false,
      errorAddress: false,
      errorPhysicallyDisabled: false,
      errorDepartment: false,

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

  // FUNCTION FOR HANDLE CHANGE
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  onChangeDate = (event) => {
    this.setState({
      dob: event,
    });
  };

  onChangeCategory = (event) => {
    this.setState({
      category: event.value,
    });

    // var c_certificate = { ...this.state.c_certificate };
    // var c_validity = { ...this.state.c_validity };
    // var c_ncl = { ...this.state.c_ncl };
    // var ews = { ...this.state.ews };

    // if (
    //   this.state.category === "SC" ||
    //   this.state.category === "ST" ||
    //   this.state.category === "OBC" ||
    //   this.state.category === "NT" ||
    //   this.state.category === "VJNT"
    // ) {
    //   c_certificate.display = true;
    //   this.setState({ c_certificate: c_certificate });
    //   c_validity.display = true;
    //   this.setState({ c_validity: c_validity });
    // } else {
    //   c_certificate.display = false;
    //   this.setState({ c_certificate: c_certificate });
    //   c_validity.display = false;
    //   this.setState({ c_validity: c_validity });
    // }

    // if (
    //   this.state.category === "OBC" ||
    //   this.state.category === "NT" ||
    //   this.state.category === "VJNT"
    // ) {
    //   c_ncl.display = true;
    //   this.setState({ c_ncl: c_ncl });
    // } else {
    //   c_ncl.display = false;
    //   this.setState({ c_ncl: c_ncl });
    // }

    // if (this.state.category === "EWS") {
    //   ews.display = true;
    //   this.setState({ ews: ews });
    // } else {
    //   ews.display = false;
    //   this.setState({ ews: ews });
    // }
  };

  onChangeDisability = (event) => {
    this.setState({
      physicallyDisabled: event.target.value,
    });
  };

  onChangeDepartment = (event) => {
    this.setState({
      department: event.value,
    });
  };

  // VALIDATE DATA
  validateData = () => {
    if (this.state.documentsUploaded.some((e) => e.type === docType.photo)) {
      this.setState({
        photo: {
          name: this.state.photo.name,
          error: false,
          display: this.state.photo.display,
        },
      });
    } else {
      this.setState({
        photo: {
          name: this.state.photo.name,
          error: true,
          display: this.state.photo.display,
        },
      });
    }

    if (this.state.documentsUploaded.some((e) => e.type === docType.sign)) {
      this.setState({
        sign: {
          name: this.state.sign.name,
          error: false,
          display: this.state.sign.display,
        },
      });
    } else {
      this.setState({
        sign: {
          name: this.state.sign.name,
          error: true,
          display: this.state.sign.display,
        },
      });
    }

    if (
      this.state.documentsUploaded.some((e) => e.type === docType.nationality_c)
    ) {
      this.setState({
        nationality_c: {
          name: this.state.nationality_c.name,
          error: false,
          display: this.state.nationality_c.display,
        },
      });
    } else {
      this.setState({
        nationality_c: {
          name: this.state.nationality_c.name,
          error: true,
          display: this.state.nationality_c.display,
        },
      });
    }

    if (this.state.c_certificate.display) {
      if (
        this.state.documentsUploaded.some(
          (e) => e.type === docType.c_certificate
        )
      ) {
        this.setState({
          c_certificate: {
            name: this.state.c_certificate.name,
            error: false,
            display: this.state.c_certificate.display,
          },
        });
      } else {
        this.setState({
          c_certificate: {
            name: this.state.c_certificate.name,
            error: true,
            display: this.state.c_certificate.display,
          },
        });
      }
    }

    if (this.state.c_validity.display) {
      if (
        this.state.documentsUploaded.some((e) => e.type === docType.c_validity)
      ) {
        this.setState({
          c_validity: {
            name: this.state.c_validity.name,
            error: false,
            display: this.state.c_validity.display,
          },
        });
      } else {
        this.setState({
          c_validity: {
            name: this.state.c_validity.name,
            error: true,
            display: this.state.c_validity.display,
          },
        });
      }
    }

    if (this.state.c_ncl.display) {
      if (this.state.documentsUploaded.some((e) => e.type === docType.c_ncl)) {
        this.setState({
          c_ncl: {
            name: this.state.c_ncl.name,
            error: false,
            display: this.state.c_ncl.display,
          },
        });
      } else {
        this.setState({
          c_ncl: {
            name: this.state.c_ncl.name,
            error: true,
            display: this.state.c_ncl.display,
          },
        });
      }
    }

    if (this.state.doc_physicallyDisable.display) {
      if (
        this.state.documentsUploaded.some(
          (e) => e.type === docType.doc_physicallyDisable
        )
      ) {
        this.setState({
          doc_physicallyDisable: {
            name: this.state.doc_physicallyDisable.name,
            error: false,
            display: this.state.doc_physicallyDisable.display,
          },
        });
      } else {
        this.setState({
          doc_physicallyDisable: {
            name: this.state.doc_physicallyDisable.name,
            error: true,
            display: this.state.doc_physicallyDisable.display,
          },
        });
      }
    }

    if (this.state.ews.display) {
      if (this.state.documentsUploaded.some((e) => e.type === docType.ews)) {
        this.setState({
          ews: {
            name: this.state.ews.name,
            error: false,
            display: this.state.ews.display,
          },
        });
      } else {
        this.setState({
          ews: {
            name: this.state.ews.name,
            error: true,
            display: this.state.ews.display,
          },
        });
      }
    }

    this.state.name.length < 1
      ? this.setState({ errorName: true })
      : this.setState({ errorName: false });

    this.state.middleName.length < 1
      ? this.setState({ errorMiddleName: true })
      : this.setState({ errorMiddleName: false });

    this.state.motherName.length < 1
      ? this.setState({ errorMotherName: true })
      : this.setState({ errorMotherName: false });

    this.state.gender === ""
      ? this.setState({ errorGender: true })
      : this.setState({ errorGender: false });

    this.state.dob === ""
      ? this.setState({ errorDob: true })
      : this.setState({ errorDob: false });

    // this.state.email.length < 10 ||
    // this.state.email.indexOf("@") > this.state.email.indexOf(".") ||
    // this.state.email.indexOf("@") < 1
    //   ? this.setState({ errorEmail: true })
    //   : this.setState({ errorEmail: false });

    // this.state.mobile.length === 10 && /^\d+$/.test(this.state.mobile)
    //   ? this.setState({ errorMobile: false })
    //   : this.setState({ errorMobile: true });

    var n = this.state.nationality.replace(/ /g, "");

    n === ""
      ? this.setState({ errorNationality: true })
      : this.setState({ errorNationality: false });

    this.state.category === ""
      ? this.setState({ errorCategory: true })
      : this.setState({ errorCategory: false });

    this.state.aadhar.length === 12 && /^\d+$/.test(this.state.aadhar)
      ? this.setState({ errorAadhar: false })
      : this.setState({ errorAadhar: true });

    var a = this.state.address.replace(/ /g, "");
    a === ""
      ? this.setState({ errorAddress: true })
      : this.setState({ errorAddress: false });

    this.state.physicallyDisabled === ""
      ? this.setState({ errorPhysicallyDisabled: true })
      : this.setState({ errorPhysicallyDisabled: false });

    this.state.department === ""
      ? this.setState({ errorDepartment: true })
      : this.setState({ errorDepartment: false });
  };

  // NEXT CONFIRM CANCEL
  onNext = async (event) => {
    if (this.state.disabled) {
      this.props.entire === "no"
        ? this.props.nextStep(5)
        : this.props.nextStep(1);
    } else {
      await this.validateData();
      if (
        !this.state.doc_physicallyDisable.error &&
        !this.state.nationality_c.error &&
        !this.state.photo.error &&
        !this.state.sign.error &&
        !this.state.c_certificate.error &&
        !this.state.c_validity.error &&
        !this.state.c_ncl.error &&
        !this.state.ews.error &&
        this.state.errorName === false &&
        this.state.errorMiddleName === false &&
        this.state.errorGender === false &&
        this.state.errorMotherName === false &&
        // this.state.errorEmail === false &&
        // this.state.errorMobile === false &&
        this.state.errorNationality === false &&
        this.state.errorCategory === false &&
        this.state.errorAadhar === false &&
        this.state.errorAddress === false &&
        this.state.errorPhysicallyDisabled === false &&
        this.state.errorDepartment === false
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
        this.setState({ open: !this.state.open });
        this.setState({ confirmAlert: !this.state.confirmAlert });
        this.props.data.personalInfo.name = this.state.name;
        this.props.data.personalInfo.middleName = this.state.middleName;
        this.props.data.personalInfo.gender = this.state.gender;
        this.props.data.personalInfo.dob = this.state.dob;
        this.props.data.personalInfo.motherName = this.state.motherName;
        // this.props.data.personalInfo.email = this.state.email;
        // this.props.data.personalInfo.mobile = this.state.mobile;
        this.props.data.personalInfo.nationality = this.state.nationality;
        this.props.data.personalInfo.category = this.state.category;
        this.props.data.personalInfo.aadhar = this.state.aadhar;
        this.props.data.personalInfo.address = this.state.address;
        this.props.data.personalInfo.physicallyDisabled =
          this.state.physicallyDisabled;
        this.props.data.personalInfo.department = this.state.department;
      }
    }
  };

  onBack = (event) => {
    this.props.entire === "no"
      ? this.props.prevStep(1)
      : this.props.prevStep(1);
  };

  confirmData = (event) => {
    const personalInfo = {
      personalInfo: this.props.data.personalInfo,
    };

    try {
      axios
        .post(BACKEND_URL + "/students/edit/info", personalInfo, {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((res) => {
          console.log("Personal Info Added");
        });
    } catch (err) {
      console.log(err);
    }

    this.props.entire === "no"
      ? this.props.nextStep(5)
      : this.props.nextStep(1);
  };

  onCancel = (event) => {
    this.setState({
      confirmAlert: !this.state.confirmAlert,
    });
  };

  // COMPONENTDIDMOUNT
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
            res.data.user.personalInfo &&
              this.setState({
                name: res.data.user.personalInfo.name
                  ? res.data.user.personalInfo.name
                  : "",
                middleName: res.data.user.personalInfo.middleName
                  ? res.data.user.personalInfo.middleName
                  : "",
                // email: res.data.user.personalInfo.email
                //   ? res.data.user.personalInfo.email
                //   : "",
                gender: res.data.user.personalInfo.gender
                  ? res.data.user.personalInfo.gender
                  : "",
                motherName: res.data.user.personalInfo.motherName
                  ? res.data.user.personalInfo.motherName
                  : "",
                // mobile: res.data.user.personalInfo.mobile
                //   ? res.data.user.personalInfo.mobile
                //   : "",
                nationality: res.data.user.personalInfo.nationality
                  ? res.data.user.personalInfo.nationality
                  : "",
                category: res.data.user.personalInfo.category
                  ? res.data.user.personalInfo.category
                  : "",
                aadhar: res.data.user.personalInfo.aadhar
                  ? res.data.user.personalInfo.aadhar
                  : "",
                dob: res.data.user.personalInfo.dob
                  ? res.data.user.personalInfo.dob
                  : "",
                physicallyDisabled: res.data.user.personalInfo
                  .physicallyDisabled
                  ? res.data.user.personalInfo.physicallyDisabled
                  : "",
                department: res.data.user.personalInfo.department
                  ? res.data.user.personalInfo.department
                  : "",
                address: res.data.user.personalInfo.address
                  ? res.data.user.personalInfo.address
                  : "",
                remarks: res.data.user.personalInfo.remarks
                  ? res.data.user.personalInfo.remarks
                  : "",
                verification: res.data.user.personalInfo.verification
                  ? res.data.user.personalInfo.verification
                  : "",
              });
            this.setState({ editable: res.data.user.editable });
            res.data.user.editable &&
            (res.data.user.personalInfo.verification === "mod_req" ||
              res.data.user.personalInfo.verification === "pending")
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
    var copy;
    const dropdown_options = [
      "General",
      "OBC",
      "ST",
      "SC",
      "NT",
      "VJNT",
      "EWS",
    ];
    const department_options = [
      "Civil Engineering",
      "Computer Engineering",
      "Electrical Engineering",
      "Electronics & Telecommunication Engineering",
      "Instrumentation & Control Engineering",
      "Mechanical Engineering",
      "Metallurgical Engineering",
      "Production Engineering",
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
      <div className="personal_container" style={{ marginTop: "90px" }}>
        {/* Confirmation Alert */}
        <div>
          <SweetAlert
            title={"Personal Details"}
            show={this.state.confirmAlert}
            onConfirm={this.confirmData}
            onCancel={this.onCancel}
            customButtons={
              <React.Fragment>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="neutral"
                    size="large"
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
              <div className="popUpContainer">
                <div className="popUpField">
                  <div>
                    <Typography>Name : </Typography>
                  </div>
                  <div>{this.state.name}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Father/Husband's Name :</Typography>
                  </div>
                  <div>{this.state.middleName}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Mother's Name :</Typography>
                  </div>
                  <div>{this.state.motherName}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Gender :</Typography>
                  </div>
                  <div>{this.state.gender}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>DOB :</Typography>
                  </div>
                  <div>{this.state.dob.toLocaleString().slice(0, 10)}</div>
                </div>
                {/* <div className="popUpField">
                  <div>
                    <Typography>Email :</Typography>
                  </div>
                  <div>{this.state.email}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Mobile No :</Typography>
                  </div>
                  <div>{this.state.mobile}</div>
                </div> */}
                <div className="popUpField">
                  <div>
                    <Typography>Nationality :</Typography>
                  </div>
                  <div>{this.state.nationality}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Category :</Typography>
                  </div>
                  <div>{this.state.category}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Aadhar Card Number :</Typography>
                  </div>
                  <div>{this.state.aadhar}</div>
                </div>
                {this.state.address.length >= 45 && (
                  <div>
                    <div>
                      <Typography>Permanent Address :</Typography>
                    </div>
                    <div>{this.state.address}</div>
                  </div>
                )}
                {this.state.address.length < 45 && (
                  <div className="popUpField">
                    <div>
                      <Typography>Permanent Address :</Typography>
                    </div>
                    <div>{this.state.address}</div>
                  </div>
                )}
                <div className="popUpField">
                  <div>
                    <Typography>Physically Disable :</Typography>
                  </div>
                  <div>{this.state.physicallyDisabled}</div>
                </div>
                <div className="popUpField">
                  <div>
                    <Typography>Applying to department :</Typography>
                  </div>
                  <div>{this.state.department}</div>
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

        {/* Personal Details complete form  */}
        <div className="formContainer">Personal Details</div>
        <div className={"Form"}>
          <form>
            {/* 1. Name  */}
            <div className="formField">
              <Typography>Name</Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.name}
                name="name"
                label="Name"
                variant="outlined"
                required={true}
                style={{ marginTop: "8px" }}
              />
              {this.state.errorName && (
                <div style={{ color: "red" }}>
                  <Typography>Name is required field</Typography>
                </div>
              )}
            </div>
            {/* 2. Father's Name/Husband's name  */}
            <div className="formField">
              <Typography>Father/Husband's Name</Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.middleName}
                name="middleName"
                label="Middle Name"
                variant="outlined"
                required
                style={{ marginTop: "8px" }}
              />
              {this.state.errorMiddleName && (
                <div style={{ color: "red" }}>
                  <Typography>Middle Name is required field</Typography>
                </div>
              )}
            </div>

            {/**
             * Mother's Name
             */}
            <div className="formField">
              <Typography>Mother's Name</Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.motherName}
                name="motherName"
                label="Mother's Name"
                variant="outlined"
                required
                style={{ marginTop: "8px" }}
              />
              {this.state.errorMotherName && (
                <div style={{ color: "red" }}>
                  <Typography>Mother's Name is required field</Typography>
                </div>
              )}
            </div>

            {/*
             * 3. Gender
             * 4. DOB
             */}
            <div className="formGenderDob">
              <div className="formGender">
                <div style={{ width: "100%" }}>
                  <Typography>Gender</Typography>
                  <div className="radios">
                    <input
                      disabled={this.state.disabled}
                      type="radio"
                      value="Male"
                      name="gender"
                      checked={this.state.gender === "Male"}
                      onChange={this.onChangeGender}
                      className="maleRadio"
                    />
                    Male
                    <input
                      disabled={this.state.disabled}
                      type="radio"
                      value="Female"
                      name="gender"
                      checked={this.state.gender === "Female"}
                      onChange={this.onChangeGender}
                      className="femaleOtherRadio"
                    />{" "}
                    Female
                    <input
                      disabled={this.state.disabled}
                      type="radio"
                      value="Other"
                      name="gender"
                      checked={this.state.gender === "Other"}
                      onChange={this.onChangeGender}
                      className="femaleOtherRadio"
                    />{" "}
                    Other
                  </div>
                  {this.state.errorGender && (
                    <div style={{ color: "red" }}>
                      <Typography>Please select Gender</Typography>
                    </div>
                  )}
                </div>
              </div>

              <div className="formDob">
                <Typography>DOB</Typography>
                <DatePicker
                  disabled={this.state.disabled}
                  onChange={(e) => this.onChangeDate(e)}
                  value={this.state.dob}
                  format={"dd-MM-y"}
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                  className="formDatePicker"
                ></DatePicker>
                {this.state.errorGender && (
                  <div style={{ color: "red" }}>
                    <Typography>Please select date of birth</Typography>
                  </div>
                )}
              </div>
            </div>
            {/*
             *   5. Email
             *   6. Mobile Number
             */}
            {/* <div className="formEmailNumber">
              <div style={{ width: "100%" }}>
                <Typography>Email</Typography>
                <TextField
                  disabled={this.state.disabled}
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                  label="Email"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
                {this.state.errorEmail && (
                  <div style={{ color: "red" }}>
                    <Typography>Invalid Email Id</Typography>
                  </div>
                )}
              </div>
              <div className="formNumber">
                <Typography>Mobile Number</Typography>
                <TextField
                  disabled={this.state.disabled}
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.mobile}
                  name="mobile"
                  label="Mobile Number"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
                {this.state.errorMobile && (
                  <div style={{ color: "red" }}>
                    <Typography>
                      Please enter a valid 10 digit mobile number
                    </Typography>
                  </div>
                )}
              </div>
            </div> */}

            {/*
             * 7. Nationality
             * 8. Category
             */}
            <div className="formEmailNumber">
              <div style={{ width: "100%" }}>
                <Typography>Nationality</Typography>
                <TextField
                  disabled={this.state.disabled}
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.nationality}
                  name="nationality"
                  label="Nationality"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
                {this.state.errorNationality && (
                  <div style={{ color: "red" }}>
                    <Typography>Nationality is required field</Typography>
                  </div>
                )}
              </div>
              <div className="formNumber">
                <Typography style={{ marginBottom: "13px" }}>
                  Category
                </Typography>
                <DropDown
                  disabled={this.state.disabled}
                  options={dropdown_options}
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                  placeholder="Select category"
                />
                {this.state.errorCategory && (
                  <div style={{ color: "red" }}>
                    <Typography>Please select category</Typography>
                  </div>
                )}
              </div>
            </div>

            {/**
             * Changes in document collection as per category selection
             * */}
            <div style={{ display: "none" }}>
              {this.state.category === "SC" ||
              this.state.category === "ST" ||
              this.state.category === "OBC" ||
              this.state.category === "NT" ||
              this.state.category === "VJNT"
                ? (this.state.c_certificate.display = true)
                : (this.state.c_certificate.display = false)}
              {this.state.category === "SC" ||
              this.state.category === "ST" ||
              this.state.category === "OBC" ||
              this.state.category === "NT" ||
              this.state.category === "VJNT"
                ? (this.state.c_validity.display = true)
                : (this.state.c_validity.display = false)}
              {this.state.category === "NT" ||
              this.state.category === "OBC" ||
              this.state.category === "VJNT"
                ? (this.state.c_ncl.display = true)
                : (this.state.c_ncl.display = false)}
              {this.state.category === "EWS"
                ? (this.state.ews.display = true)
                : (this.state.ews.display = false)}
            </div>

            {/*
             * 9. Aadhar Number
             */}
            <div style={{ marginTop: "13px" }}>
              <Typography style={{ marginBottom: "4px" }}>
                Aadhar Card Number
              </Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.aadhar}
                name="aadhar"
                label="Aadhar Card Number"
                variant="outlined"
                required
              />
              {this.state.errorAadhar && (
                <div style={{ color: "red" }}>
                  <Typography>Invalid Aadhar Card Number</Typography>
                </div>
              )}
            </div>

            {/*
             * 10. Permanent Address
             */}
            <div style={{ marginTop: "10px" }}>
              <Typography style={{ marginBottom: "4px" }}>
                Permanent Address
              </Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.address}
                name="address"
                label="Permanent Address"
                variant="outlined"
                multiline
                minRows={3}
                required
              />
              {this.state.errorAddress && (
                <div style={{ color: "red" }}>
                  <Typography>Address is required field</Typography>
                </div>
              )}
            </div>

            {/*
             * 11. Physically Disable
             * 12. Application in which department
             */}
            <div className="formEmailNumber">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "100%" }}>
                  <Typography>Physically Disable</Typography>
                  <div style={{ marginTop: "4px" }}>
                    <input
                      disabled={this.state.disabled}
                      type="radio"
                      value="Yes"
                      name="physicallyDisabled"
                      checked={this.state.physicallyDisabled === "Yes"}
                      onChange={this.onChangeDisability}
                      style={{ marginLeft: "20px" }}
                    />
                    Yes
                    <input
                      disabled={this.state.disabled}
                      type="radio"
                      value="No"
                      name="physicallyDisabled"
                      checked={this.state.physicallyDisabled === "No"}
                      onChange={this.onChangeDisability}
                      style={{ marginLeft: "30px" }}
                    />{" "}
                    No
                  </div>
                  {this.state.errorPhysicallyDisabled && (
                    <div style={{ color: "red" }}>
                      <Typography>Please select correct option</Typography>
                    </div>
                  )}
                </div>

                {/* Document of physical disability needed or not */}
                {this.state.physicallyDisabled === "Yes"
                  ? (this.state.doc_physicallyDisable.display = true)
                  : (this.state.doc_physicallyDisable.display = false)}
              </div>
              <div className="formNumber">
                <Typography style={{ marginBottom: "13px" }}>
                  Application in which Department
                </Typography>
                <DropDown
                  disabled={this.state.disabled}
                  options={department_options}
                  value={this.state.department}
                  onChange={this.onChangeDepartment}
                  placeholder="Select Department"
                />
                {this.state.errorDepartment && (
                  <div style={{ color: "red" }}>
                    <Typography>Please select Department</Typography>
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
                {/* Photo */}
                {this.state.photo.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.photo.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.photo.name}
                          onChange={this.onFileChange}
                        />
                        {this.state.photo.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === this.state.photo.name) {
                            return (
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

                {/* Sign */}
                {this.state.sign.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.sign.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.sign.name}
                          onChange={this.onFileChange}
                        />
                        {this.state.sign.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === this.state.sign.name) {
                            return (
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

                {/* Nationality */}
                {this.state.nationality_c.display ? (
                  <div>
                    <div className="field">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>{this.state.nationality_c.name}</div>
                        <div style={{ opacity: "0.8", fontSize: "13px" }}>
                          <div style={{ marginLeft: "3px" }}>
                            Any one of these:
                          </div>
                          <ul style={{ marginTop: "0px" }}>
                            <li>Leaving Certificate with mention of Indian</li>
                            <li>Passport Certificate</li>
                            <li>Birth Certificate</li>
                            <li>Domicile Certificate of Maharashtra</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.nationality_c.name}
                          onChange={this.onFileChange}
                        />
                        {this.state.nationality_c.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === this.state.nationality_c.name) {
                            return (
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

                {/* Caste Certificate  */}
                {this.state.c_certificate.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.c_certificate.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.c_certificate.name}
                          onChange={this.onFileChange}
                        />
                        {this.state.c_certificate.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === this.state.c_certificate.name) {
                            return (
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

                {/* Caste Validity  */}
                {this.state.c_validity.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.c_validity.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.c_validity.name}
                          onChange={this.onFileChange}
                        />
                        {this.state.c_validity.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === this.state.c_validity.name) {
                            return (
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

                {/* NCL  */}
                {this.state.c_ncl.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.c_ncl.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.c_ncl.name}
                          onChange={this.onFileChange}
                        />
                        {this.state.c_ncl.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === this.state.c_ncl.name) {
                            return (
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

                {/* EWS  */}
                {this.state.ews.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.ews.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.ews.name}
                          onChange={this.onFileChange}
                        />
                        {this.state.ews.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === this.state.ews.name) {
                            return (
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

                {/* Physically Disable  */}
                {this.state.doc_physicallyDisable.display ? (
                  <div>
                    <div className="field">
                      <div>{this.state.doc_physicallyDisable.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={this.state.doc_physicallyDisable.name}
                          onChange={this.onFileChange}
                        />
                        {this.state.doc_physicallyDisable.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (
                            doc.type === this.state.doc_physicallyDisable.name
                          ) {
                            return (
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

          {/**
           * Next Button
           */}
          <div style={{ marginBottom: "30px", marginTop: "30px" }}>
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

          {/**
           * End
           */}
        </div>
      </div>
    );
  }
}
