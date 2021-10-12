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

export default class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmAlert: false,
      name: "",
      middleName: "",
      gender: "",
      dob: "",
      email: "",
      mobile: "",
      nationality: "",
      category: "",
      aadhar: "",
      address: "",
      physicallyDisabled: "",
      department: "",

      errorName: false,
      errorMiddleName: false,
      errorGender: false,
      errorDob: false,
      errorEmail: false,
      errorMobile: false,
      errorNationality: false,
      errorCategory: false,
      errorAadhar: false,
      errorAddress: false,
      errorPhysicallyDisabled: false,
      errorDepartment: false,

      token: localStorage.getItem("phd-website-jwt"),
    };
  }

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

  validateData = () => {
    this.state.name.length < 1
      ? this.setState({ errorName: true })
      : this.setState({ errorName: false });

    this.state.middleName.length < 1
      ? this.setState({ errorMiddleName: true })
      : this.setState({ errorMiddleName: false });

    this.state.gender === ""
      ? this.setState({ errorGender: true })
      : this.setState({ errorGender: false });

    this.state.dob === ""
      ? this.setState({ errorDob: true })
      : this.setState({ errorDob: false });

    this.state.email.length < 10 ||
    this.state.email.indexOf("@") > this.state.email.indexOf(".") ||
    this.state.email.indexOf("@") < 1
      ? this.setState({ errorEmail: true })
      : this.setState({ errorEmail: false });

    this.state.mobile.length === 10 && /^\d+$/.test(this.state.mobile)
      ? this.setState({ errorMobile: false })
      : this.setState({ errorMobile: true });

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

  onSubmit = async (event) => {
    await this.validateData();

    if (
      this.state.errorName === false &&
      this.state.errorMiddleName === false &&
      this.state.errorGender === false &&
      this.state.errorEmail === false &&
      this.state.errorMobile === false &&
      this.state.errorNationality === false &&
      this.state.errorCategory === false &&
      this.state.errorAadhar === false &&
      this.state.errorAddress === false &&
      this.state.errorPhysicallyDisabled === false &&
      this.state.errorDepartment === false
    ) {
      this.setState({ confirmAlert: !this.state.confirmAlert });
      this.props.data.personalInfo.name = this.state.name;
      this.props.data.personalInfo.middleName = this.state.middleName;
      this.props.data.personalInfo.gender = this.state.gender;
      this.props.data.personalInfo.dob = this.state.dob;
      this.props.data.personalInfo.email = this.state.email;
      this.props.data.personalInfo.mobile = this.state.mobile;
      this.props.data.personalInfo.nationality = this.state.nationality;
      this.props.data.personalInfo.category = this.state.category;
      this.props.data.personalInfo.aadhar = this.state.aadhar;
      this.props.data.personalInfo.address = this.state.address;
      this.props.data.personalInfo.physicallyDisabled =
        this.state.physicallyDisabled;
      this.props.data.personalInfo.department = this.state.department;
    }
  };

  confirmData = (event) => {
    const personalInfo = {
      personalInfo: this.props.data.personalInfo,
    };

    try {
      console.log(personalInfo);
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

    this.props.nextStep();
  };

  onCancel = (event) => {
    this.setState({
      confirmAlert: !this.state.confirmAlert,
    });
  };

  render() {
    const dropdown_options = ["General", "OBC", "ST", "SC", "NT"];
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

    return (
      <div className="container">
        {/* Confirmation Alert */}
        <div>
          <SweetAlert
            title={"Personal Details"}
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
                <div className="popUpField">
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
                </div>
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
        <div className="formContainer">Personal Details</div>
        <div className={"Form"}>
          <form onSubmit={this.onSubmit}>
            {/* 1. Name  */}
            <div className="formField">
              <Typography>Name</Typography>
              <TextField
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.name}
                name="name"
                label="Name"
                variant="outlined"
                required="true"
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
                      type="radio"
                      value="Male"
                      name="gender"
                      checked={this.state.gender === "Male"}
                      onChange={this.onChangeGender}
                      className="maleRadio"
                    />
                    Male
                    <input
                      type="radio"
                      value="Female"
                      name="gender"
                      checked={this.state.gender === "Female"}
                      onChange={this.onChangeGender}
                      className="femaleOtherRadio"
                    />{" "}
                    Female
                    <input
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
            <div className="formEmailNumber">
              <div style={{ width: "100%" }}>
                <Typography>Email</Typography>
                <TextField
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
            </div>
            {/*
             * 7. Nationality
             * 8. Category
             */}
            <div className="formEmailNumber">
              <div style={{ width: "100%" }}>
                <Typography>Nationality</Typography>
                <TextField
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
                  options={dropdown_options}
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
            {/*
             * 9. Aadhar Number
             */}
            <div style={{ marginTop: "13px" }}>
              <Typography style={{ marginBottom: "4px" }}>
                Aadhar Card Number
              </Typography>
              <TextField
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
            <div
              // style={{
              //   display: "flex",
              //   flexDirection: "row",
              //   paddingTop: "10px",
              //   paddingBottom: "10px",
              //   justifyContent: "center",
              // }}
              className="formEmailNumber"
            >
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
                      type="radio"
                      value="Yes"
                      name="physicallyDisabled"
                      checked={this.state.physicallyDisabled === "Yes"}
                      onChange={this.onChangeDisability}
                      style={{ marginLeft: "20px" }}
                    />
                    Yes
                    <input
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
              </div>
              <div className="formNumber">
                <Typography style={{ marginBottom: "13px" }}>
                  Application in which Department
                </Typography>
                <DropDown
                  options={department_options}
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
