import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import Button from "@mui/material/Button";
import "./DisplayData.css";
import { TextField } from "@mui/material";
import { BACKEND_URL } from "../config";
import axios from "axios";
import NavBar from "../components/Navbar/Navbar";
import viewDoc from "./DocViewer";
import Sidebar from "../components/Sidebar";
export default class AccountFormNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.student.name,
      utrDuNumber: this.props.student.feeDetails.utrDuNumber,
      amount: this.props.student.feeDetails.amount,
      bank: this.props.student.feeDetails.bank,
      documentsUploaded: this.props.student.feeDetails.docUploaded,
      remarks: this.props.student.feeDetails.remarks,
      transactionTime: this.props.student.feeDetails.transactionTime,
      verification: this.props.student.feeDetails.verification,
      category: this.props.student.personalInfo.category,

      // name: "sldkfj",
      // utrDuNumber: "lskjdf",
      // amount: "sdf",
      // bank: "gdfg",
      // documentsUploaded: "dfg",
      // remarks: "dgfgfdg",
      // transactionTime: "dfgdfg",
      // verification: "dgdgfdg",
      // category: "dgffdff",

      //   open: false,
      //   confirmAlert: false,

      //   remarks: "",
      redirect: false,
      token: "",
      //verification: "",
    };
  }
  async componentDidMount() {
    // console.log(this.props);
    console.log(this.props);
    // console.log(this.state.documentsUploaded);

    if (localStorage.getItem("phd-website-jwt")) {
      this.setState({
        token: localStorage.getItem("phd-website-jwt"),
      });
    }
  }

  handleSubmit = async (event) => {
    this.setState({
      remarks: this.state.remarks,
    });
    // console.log(this.state.remarks);

    this.setState({
      redirect: !this.state.redirect,
    });
    const data = {
      studentId: this.props.student._id,
      verification: this.state.verification,
      remarks: this.state.remarks,
    };
    // await console.log(data);
    axios
      .post(BACKEND_URL + "/students/verify/fee", data, {
        headers: { "phd-website-jwt": this.state.token },
      })
      .then((res) => {
        console.log("verification details submitted");
        this.props.updateStudent(
          data.verification,
          data.remarks,
          this.props.student.index,
          this.props.department
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response?.data?.error || "error while submitting");
      });
  };

  handleBack = () => {
    console.log(this.props.department);
    this.props.updateStudent(
      this.props.student.feeDetails.verification,
      this.props.student.feeDetails.remarks,
      this.props.student.index,
      this.props.department
    );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      remarks: event.target.value,
    });
  };

  onChangeVerify = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      verification: event.target.value,
    });
  };

  render() {
    // if (this.state.redirect) {
    //   // return <Redirect to="/coordinator" />;
    //   console.log(this.props.student);
    //   console.log(this.props.location.state.cordId);
    //   this.props.history.push({
    //     pathname: "/account",
    //     // search: `/${id}`,
    //     // state: { details: this.props.student },
    //   });
    // }
    // const { step } = this.state;

    return (
      <>
        <NavBar loggedin={true} />
        <div className="container">
          <Sidebar user="Coordinator" />
          <div>
            <div>
              <div>
                <div></div>
                <div>
                  <div class="container1">
                    <table class="tb">
                      <div className="type">
                        <div
                          class="h"
                          style={{ color: "white", width: "200%" }}
                        >
                          Payments Details
                        </div>
                      </div>
                      <tbody>
                        <tr class="row1">
                          <td class="first data">Name</td>
                          <td class="data">{this.state.name}</td>
                        </tr>
                        <tr class="row1">
                          <td class="first data">Category</td>
                          <td class="data">{this.state.category}</td>
                        </tr>
                        <tr class="row1">
                          <td class="first data">Amount Paid</td>
                          <td class="data">{this.state.amount}</td>
                        </tr>
                        <tr class="row1">
                          <td class="first data">UTR/Du Number</td>
                          <td class="data">{this.state.utrDuNumber}</td>
                        </tr>
                        <tr class="row1">
                          <td class="first data">Date of Payment</td>
                          <td class="data">
                            {this.state.transactionTime.slice(0, 10)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br />

                    <div className="title">Documents Uploaded</div>
                  </div>
                  <div style={{ justifyContent: "left" }}>
                    <div>
                      <div className="field2">
                        <div className="documents" style={{ display: "flex" }}>
                          <div className="docFieldName">
                            Payment Receipt :{" "}
                            {this.state.documentsUploaded.originalName}
                          </div>
                          <div className="iconMobile">
                            <div
                              className="previewIcon"
                              onClick={() =>
                                viewDoc({
                                  filename:
                                    this.state.documentsUploaded.filename,
                                  contentType:
                                    this.state.documentsUploaded.contentType,
                                  originalName:
                                    this.state.documentsUploaded.originalName,
                                })
                              }
                            >
                              <ArrowCircleDown />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Divider
                    sx={{
                      marginTop: "5px",
                      marginBottom: "7px",
                      paddingBottom: "5px",
                    }}
                  />
                  <div className="field1">
                    <div style={{ width: "55%" }}>
                      <TextField
                        onChange={this.handleChange}
                        value={this.state.remarks}
                        variant="outlined"
                        multiline
                        minRows={3}
                        type="text"
                        name="personalInfoRemark"
                        label="Remark"
                        fullWidth
                      ></TextField>
                    </div>
                  </div>
                  <div className="icon">
                    <div>
                      <div className="verify">
                        <div style={{ width: "100%" }}>
                          <div className="radios">
                            <div>
                              <input
                                type="radio"
                                value="mod_req"
                                name="personalInfoStatus"
                                checked={this.state.verification === "mod_req"}
                                onChange={this.onChangeVerify}
                                className="radio"
                              />
                              Not Verified
                            </div>

                            <div>
                              <input
                                type="radio"
                                value="verified"
                                name="personalInfoStatus"
                                checked={this.state.verification === "verified"}
                                onChange={this.onChangeVerify}
                                className="radio"
                              />{" "}
                              Verified
                            </div>
                          </div>
                          <br />
                          <div
                            style={{
                              alignContent: "center",
                            }}
                          >
                            <Button
                              variant="contained"
                              size="large"
                              style={{
                                alignSelf: "center",
                                marginRight: "20px",
                              }}
                              onClick={this.handleBack}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              size="large"
                              style={{ alignSelf: "center" }}
                              onClick={this.handleSubmit}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </>
    );
  }
}
