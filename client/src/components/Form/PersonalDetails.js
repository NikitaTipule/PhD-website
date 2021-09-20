import React, { Component } from "react";
import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import DatePicker from "react-date-picker";
import DropDown from "react-dropdown";
import SweetAlert from "react-bootstrap-sweetalert";
import "react-dropdown/style.css";

export default class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      middleName: "",
      gender: "",
      dob: "",
      splitAt: "",
      email: "",
      mobile: "",
      nationality: "",
      category: "",
      aadhar: "",
      address: "",
      physicallyDisabled: "",
      department: "",
      confirmAlert: false,
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

  onSubmit = (event) => {
    // event.preventDefault();
    // event.persist();
    this.setState({ confirmAlert: !this.state.confirmAlert });
  };

  confirmData = (event) => {
    // event.preventDefault();
    // event.persist();
    this.props.nextStep();
    const personalData = {
      name: this.state.name,
      middleName: this.state.middleName,
      gender: this.state.gender,
      dob: this.state.dob,
      email: this.state.email,
      mobile: this.state.mobile,
      nationality: this.state.nationality,
      category: this.state.category,
      aadhar: this.state.aadhar,
      address: this.state.address,
      physicallyDisabled: this.state.physicallyDisabled,
      department: this.state.department,
    };
    console.log(personalData);
  };

  onCancel = () => {
    this.setState({
      confirmAlert: !this.state.confirmAlert,
    });
    console.log(this.props);
    // this.props.props.history.goBack();
  };

  render() {
    const dropdown_options = ["General", "OBC", "ST", "SC", "NT"];
    const department_options = [
      "Computer Science",
      "Electrical",
      "ENTC",
      "Mechanical",
      "Civil",
      "Production",
      "Metallergy",
    ];

    return (
      <div
        style={{
          alignItems: "center",
          textAlign: "left",
          margin: "30px 10% 0 10%",
        }}
      >
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
              <div style={{ alignItems: "left", textAlign: "left" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "left",
                  }}
                >
                  <div>
                    <Typography>Name : </Typography>
                  </div>
                  <div>{this.state.name}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Father/Husband's Name :</Typography>
                  </div>
                  <div>{this.state.middleName}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Gender :</Typography>
                  </div>
                  <div>{this.state.gender}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>DOB :</Typography>
                  </div>
                  <div>{this.state.dob.toLocaleString().slice(0, 10)}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Email :</Typography>
                  </div>
                  <div>{this.state.email}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Mobile No :</Typography>
                  </div>
                  <div>{this.state.mobile}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Nationality :</Typography>
                  </div>
                  <div>{this.state.nationality}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Category :</Typography>
                  </div>
                  <div>{this.state.category}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Aadhar Card Number :</Typography>
                  </div>
                  <div>{this.state.aadhar}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "left",
                  }}
                >
                  <div style={{ alignContent: "left" }}>
                    <Typography style={{ alignContent: "left" }}>
                      Permanent Address :
                    </Typography>
                  </div>
                  <div>{this.state.address}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div>
                    <Typography>Physically Disable :</Typography>
                  </div>
                  <div>{this.state.physicallyDisabled}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Applying to department :</Typography>
                  </div>
                  <div>{this.state.department}</div>
                </div>
              </div>
            )}
          </SweetAlert>
        </div>
        <div
          style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}
        >
          Personal Details
        </div>
        <div className={"Form"}>
          <form onSubmit={this.onSubmit}>
            {/* 1. Name  */}
            <div style={{ marginBottom: "12px" }}>
              <Typography>Name</Typography>
              <TextField
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.name}
                name="name"
                label="Name"
                variant="outlined"
                required
                style={{ marginTop: "8px" }}
              />
            </div>
            {/* 2. Father's Name/Husband's name  */}
            <div style={{ marginBottom: "12px" }}>
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
            </div>
            {/*
             * 3. Gender
             * 4. DOB
             */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
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
                  <Typography>Gender</Typography>
                  <div style={{ marginTop: "4px" }}>
                    <input
                      type="radio"
                      value="Male"
                      name="gender"
                      checked={this.state.gender === "Male"}
                      onChange={this.onChangeGender}
                      style={{ marginLeft: "20px" }}
                    />
                    Male
                    <input
                      type="radio"
                      value="Female"
                      name="gender"
                      checked={this.state.gender === "Female"}
                      onChange={this.onChangeGender}
                      style={{ marginLeft: "30px" }}
                    />{" "}
                    Female
                    <input
                      type="radio"
                      value="Other"
                      name="gender"
                      checked={this.state.gender === "Other"}
                      onChange={this.onChangeGender}
                      style={{ marginLeft: "30px" }}
                    />{" "}
                    Other
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", marginLeft: "4%" }}>
                <Typography>DOB</Typography>
                <DatePicker
                  onChange={(e) => this.onChangeDate(e)}
                  value={this.state.dob}
                  format={"dd-MM-y"}
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                ></DatePicker>
              </div>
            </div>
            {/*
             *   5. Email
             *   6. Mobile Number
             */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
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
              </div>
              <div style={{ width: "100%", marginLeft: "4%" }}>
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
              </div>
            </div>
            {/*
             * 7. Nationality
             * 8. Category
             */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
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
              </div>
              <div style={{ width: "100%", marginLeft: "4%" }}>
                <Typography style={{ marginBottom: "13px" }}>
                  Category
                </Typography>
                <DropDown
                  options={dropdown_options}
                  onChange={this.onChangeCategory}
                  placeholder="Select category"
                />
              </div>
            </div>
            {/*
             * 9. Aadhar Number
             */}
            <div style={{ marginTop: "10px" }}>
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
            </div>
            {/*
             * 11. Physically Disable
             * 12. Application in which department
             */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "10px",
                paddingBottom: "10px",
                justifyContent: "center",
              }}
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
                </div>
              </div>
              <div style={{ width: "100%", marginLeft: "4%" }}>
                <Typography style={{ marginBottom: "13px" }}>
                  Application in which Department
                </Typography>
                <DropDown
                  options={department_options}
                  onChange={this.onChangeDepartment}
                  placeholder="Select Department"
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
