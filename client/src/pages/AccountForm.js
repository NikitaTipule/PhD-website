import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import Button from "@mui/material/Button";
import "./DisplayData.css";
import { TextField } from "@mui/material";
import { BACKEND_URL } from "../config";
import axios from "axios";
import NavBar from "../components/Navbar/Navbar";
import DocViewer from "./DocViewer";
import Sidebar from "../components/Sidebar";
export default class AccountFormNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appid: this.props.student.applicationId,
      name: this.props.student.name,
      utrDuNumber: this.props.student.feeDetails.utrDuNumber,
      amount: this.props.student.feeDetails.amount,
      bank: this.props.student.feeDetails.bank,
      documentsUploaded: this.props.student.feeDetails.docUploaded,
      remarks: this.props.student.feeDetails.remarks,
      transactionTime: this.props.student.feeDetails.transactionTime,
      verification: this.props.student.feeDetails.verification,
      category: this.props.student.personalInfo.category,
      token: "",
      //verification: "",
    };
  }
  async componentDidMount() {
    if (localStorage.getItem("phd-website-jwt")) {
      this.setState({
        token: localStorage.getItem("phd-website-jwt"),
      });
    }
  }

  handleSubmit = async (event) => {
    const data = {
      studentId: this.props.student._id,
      verification: this.state.verification,
      remarks: this.state.remarks,
    };
    axios
      .post(BACKEND_URL + "/students/verify/fee", data, {
        headers: { "phd-website-jwt": this.state.token },
      })
      .then((res) => {
        console.log("verification details submitted");
        this.props.updateStudent(
          data.verification,
          data.remarks,
          this.props.student.index
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response?.data?.error || "error while submitting");
      });
  };

  handleBack = () => {
    this.props.updateStudent(
      this.props.student.feeDetails.verification,
      this.props.student.feeDetails.remarks,
      this.props.student.index
    );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <>
        <NavBar loggedin={true} />
        <div className="container">
          <Sidebar user="Coordinator" />
          <div style={{ marginTop: "90px" }}>
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
                          <td class="first data">Application Id</td>
                          <td class="data">{this.state.appid}</td>
                        </tr>
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
                            <DocViewer
                              data={{
                                filename: this.state.documentsUploaded.filename,
                                contentType:
                                  this.state.documentsUploaded.contentType,
                                originalName:
                                  this.state.documentsUploaded.originalName,
                              }}
                            />
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
                        name="remarks"
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
                                name="verification"
                                checked={this.state.verification === "mod_req"}
                                onChange={this.handleChange}
                                className="radio"
                              />
                              Not Verified
                            </div>

                            <div>
                              <input
                                type="radio"
                                value="verified"
                                name="verification"
                                checked={this.state.verification === "verified"}
                                onChange={this.handleChange}
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
