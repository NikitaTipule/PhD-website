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
export default class phdCordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      email: "",
      mobile: "",
      personalInfo: "",
      personalInfoStatus: "verified",
      personalInfoRemark: "",

      academicsUG: "",
      academicsUGStatus: "pending",
      academicsUGRemark: "",

      academicsPG: "",
      academicsPGStatus: "pending",
      academicsPGRemark: "",

      entranceDetails: "",
      entranceDetailsStatus: "pending",
      entranceDetailsRemark: "",

      documentsUploaded: [],

      open: false,
      confirmAlert: false,

      remarks: "",
      redirect: false,
      token: "",
      verification: "",
    };
  }

  async componentDidMount() {
    // console.log(this.props.location.state.details);
    if (localStorage.getItem("phd-website-jwt")) {
      await this.setState({
        token: localStorage.getItem("phd-website-jwt"),
      });
      try {
        axios
          .get(BACKEND_URL + "/students/" + this.props.location.state.details, {
            headers: { "phd-website-jwt": this.state.token },
          })
          .then((res) => {
            // console.log(res.data);
            this.setState({
              email: res.data.user.email,
              mobile: res.data.user.mobile,
              personalInfo: res.data.user.personalInfo,
              personalInfoStatus: res.data.user.personalInfo.verification,
              personalInfoRemark: res.data.user.personalInfo.remarks,

              academicsUG: res.data.user.academicsUG,
              academicsUGStatus: res.data.user.academicsUG.verification,
              academicsUGRemark: res.data.user.academicsUG.remarks,

              academicsPG: res.data.user.academicsPG,
              academicsPGStatus: res.data.user.academicsPG.verification,
              academicsPGRemark: res.data.user.academicsPG.remarks,

              entranceDetails: res.data.user.entranceDetails,
              entranceDetailsStatus: res.data.user.entranceDetails.verification,
              entranceDetailsRemark: res.data.user.entranceDetails.remarks,

              documentsUploaded: res.data.user.documentsUploaded,

              remarks: res.data.user.remarks,
            });
            console.log(this.state.documentsUploaded);
          });
      } catch (error) {
        console.log(error.response);
      }
    }
  }
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleSubmit = async (event) => {
    this.setState({
      remarks: this.state.remarks,
    });
    // console.log(this.state.remarks);

    this.setState({
      redirect: !this.state.redirect,
    });
    const data = {
      studentId: this.props.location.state.details,
      personalInfoRemark: this.state.personalInfoRemark,
      personalInfoStatus: this.state.personalInfoStatus,
      academicsUgRemark: this.state.academicsUgRemark,
      academicsUgStatus: this.state.academicsUgStatus,
      academicsPGRemark: this.state.academicsPGRemark,
      academicsPGStatus: this.state.academicsPGStatus,
      entranceDetails: this.state.entranceDetails,
      entranceDetailsStatus: this.state.entranceDetailsStatus,
      documentsUploaded: this.state.documentsUploaded,
      remarks: this.state.remarks,
    };
    // await console.log(data);
    axios
      .post(BACKEND_URL + "/students/verify/info", data, {
        headers: { "phd-website-jwt": this.state.token },
      })
      .then((res) => {
        console.log("verification details submitted");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response?.data?.error || "error while submitting");
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeVerify = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.redirect) {
      // return <Redirect to="/coordinator" />;
      console.log(this.props.location.state.details);
      console.log(this.props.location.state.cordId);
      this.props.history.push({
        pathname: "/coordinator",
        // search: `/${id}`,
        // state: { details: this.props.location.state.details },
      });
    }
    const { step } = this.state;

    switch (step) {
      case 1:
        return (
          <>
            <NavBar loggedin={true} />
            <div className="container">
              <Sidebar user="Coordinator" />
              <div style={{ marginTop: "77px" }}>
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
                              Personal Details
                            </div>
                          </div>
                          <tbody>
                            <tr class="row1">
                              <td class="first data">Name</td>
                              <td class="data">
                                {this.state.personalInfo.name}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Father/Husband's Name</td>
                              <td class="data">
                                {this.state.personalInfo.middleName}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Gender</td>
                              <td class="data">
                                {this.state.personalInfo.gender}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">DOB</td>
                              <td class="data">
                                {("" + this.state.personalInfo.dob).slice(
                                  0,
                                  10
                                )}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Email</td>
                              <td class="data">{this.state.email}</td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Mobile No</td>
                              <td class="data">{this.state.mobile}</td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Nationality</td>
                              <td class="data">
                                {this.state.personalInfo.nationality}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Category</td>
                              <td class="data">
                                {this.state.personalInfo.category}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Aadhar Card Number</td>
                              <td class="data">
                                {this.state.personalInfo.aadhar}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Permanent Address</td>
                              <td class="data">
                                {this.state.personalInfo.address}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Physically Disable</td>
                              <td class="data">
                                {this.state.personalInfo.physicallyDisabled}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Applying to department</td>
                              <td class="data">
                                {this.state.personalInfo.department}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />

                        <div className="title">Documents Uploaded</div>
                      </div>
                      <div style={{ justifyContent: "left" }}>
                        {this.state.documentsUploaded.map((doc, id) => (
                          <div key={doc.id}>
                            {(doc.type === "Applicant's Photo" ||
                              doc.type === "Applicant's Signature" ||
                              doc.type === "Nationality Certificate" ||
                              doc.type === "Caste Certificate" ||
                              doc.type === "Caste Validity" ||
                              doc.type === "Non-Creamy Layer Certificate" ||
                              doc.type === "EWS Certificate") && (
                              <div className="field2">
                                <div className="documents" key={doc.id}>
                                  <div className="docFieldName">
                                    {doc.type + "  :"}
                                  </div>
                                  <div className="iconMobile">
                                    {/* <div>{id}</div> */}
                                    <div
                                      className="previewIcon"
                                      onClick={() =>
                                        viewDoc({
                                          filename: doc.filename,
                                          contentType: doc.contentType,
                                          originalName: doc.originalName,
                                        })
                                      }
                                    >
                                      <ArrowCircleDown />
                                    </div>
                                  </div>
                                  <div className="icon">
                                    <div>
                                      <div className="verify">
                                        <div style={{ width: "100%" }}>
                                          <div
                                            className="radios"
                                            onChange={(e) =>
                                              this.onChangeVerify(e, id)
                                            }
                                          >
                                            {/* <div>
                                      <input
                                        type="radio"
                                        value="pending"
                                        name={"verification" + id}
                                        defaultChecked={doc.verification === "pending"}
                                        onChange={() => {
                                          var copy = [...this.state.documentsUploaded];
                                          copy[id].verification = "pending";
                                          this.setState({ documentsUploaded: copy });
                                        }}
                                        className="radio"
                                      />
                                      Pending
                                    </div> */}
                                            <div>
                                              <input
                                                type="radio"
                                                value="mod_req"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification === "mod_req"
                                                }
                                                onChange={() => {
                                                  var copy = [
                                                    ...this.state
                                                      .documentsUploaded,
                                                  ];
                                                  copy[id].verification =
                                                    "mod_req";
                                                  this.setState({
                                                    documentsUploaded: copy,
                                                  });
                                                }}
                                                className="radio"
                                              />{" "}
                                              Not Verified
                                            </div>
                                            <div>
                                              <input
                                                type="radio"
                                                value="verified"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification ===
                                                  "verified"
                                                }
                                                onChange={() => {
                                                  var copy = [
                                                    ...this.state
                                                      .documentsUploaded,
                                                  ];
                                                  copy[id].verification =
                                                    "verified";
                                                  this.setState({
                                                    documentsUploaded: copy,
                                                  });
                                                }}
                                                className="radio"
                                              />{" "}
                                              Verified
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <Divider sx={{ marginTop: "5px", marginBottom: "7px" }} />
                      <div className="field1">
                        <div style={{ width: "55%" }}>
                          <TextField
                            onChange={this.handleChange}
                            value={this.state.personalInfoRemark}
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
                                    value="pending"
                                    name="personalInfoStatus"
                                    checked={
                                      this.state.personalInfoStatus ===
                                      "pending"
                                    }
                                    onChange={this.onChangeVerify}
                                    className="radio"
                                  />
                                  pending
                                </div>

                                <div>
                                  <input
                                    type="radio"
                                    value="verified"
                                    name="personalInfoStatus"
                                    checked={
                                      this.state.personalInfoStatus ===
                                      "verified"
                                    }
                                    onChange={this.onChangeVerify}
                                    className="radio"
                                  />{" "}
                                  verified
                                </div>
                              </div>
                              <br />
                              <div style={{ alignContent: "center" }}>
                                <Button
                                  variant="contained"
                                  size="large"
                                  style={{ alignSelf: "center" }}
                                  onClick={this.nextStep}
                                >
                                  Save and next
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
      case 2:
        return (
          <>
            <NavBar loggedin={true} />
            <div className="container">
              <Sidebar user="Coordinator" />
              <div style={{ marginTop: "77px" }}>
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
                              UG Details
                            </div>
                          </div>
                          <tbody>
                            <tr class="row1">
                              <td class="first data">University/Institute</td>
                              <td class="data">
                                {this.state.academicsUG.institute}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Nomenclaure of Degree</td>
                              <td class="data">
                                {this.state.academicsUG.degree}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Specialization</td>
                              <td class="data">
                                {this.state.academicsUG.specialization}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Marks Obtained</td>
                              <td class="data">
                                {this.state.academicsUG.totalAggregate}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Total Marks</td>
                              <td class="data">
                                {this.state.academicsUG.totalMarks}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">CGPA</td>
                              <td class="data">
                                {this.state.academicsUG.cgpa10}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Percentage</td>
                              <td class="data">
                                {this.state.academicsUG.percentageMarks}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Date of Declaration</td>
                              <td class="data">
                                {(
                                  "" + this.state.academicsUG.dateOfDeclaration
                                ).slice(0, 10)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />

                        <div className="title">Documents Uploaded</div>
                      </div>
                      <div style={{ justifyContent: "left" }}>
                        {this.state.documentsUploaded.map((doc, id) => (
                          <div key={doc.id}>
                            {doc.type === "UG Marksheet" && (
                              <div className="field2">
                                <div className="documents" key={doc.id}>
                                  <div className="docFieldName">
                                    {doc.type + "  :"}
                                  </div>
                                  <div className="iconMobile">
                                    {/* <div>{id}</div> */}
                                    <div
                                      className="previewIcon"
                                      onClick={() =>
                                        viewDoc({
                                          filename: doc.filename,
                                          contentType: doc.contentType,
                                          originalName: doc.originalName,
                                        })
                                      }
                                    >
                                      <ArrowCircleDown />
                                    </div>
                                  </div>
                                  <div className="icon">
                                    <div>
                                      <div className="verify">
                                        <div style={{ width: "100%" }}>
                                          <div
                                            className="radios"
                                            onChange={(e) =>
                                              this.onChangeVerify(e, id)
                                            }
                                          >
                                            {/* <div>
                                      <input
                                        type="radio"
                                        value="pending"
                                        name={"verification" + id}
                                        defaultChecked={doc.verification === "pending"}
                                        onChange={() => {
                                          var copy = [...this.state.documentsUploaded];
                                          copy[id].verification = "pending";
                                          this.setState({ documentsUploaded: copy });
                                        }}
                                        className="radio"
                                      />
                                      Pending
                                    </div> */}
                                            <div>
                                              <input
                                                type="radio"
                                                value="mod_req"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification === "mod_req"
                                                }
                                                onChange={() => {
                                                  var copy = [
                                                    ...this.state
                                                      .documentsUploaded,
                                                  ];
                                                  copy[id].verification =
                                                    "mod_req";
                                                  this.setState({
                                                    documentsUploaded: copy,
                                                  });
                                                }}
                                                className="radio"
                                              />{" "}
                                              Not Verified
                                            </div>
                                            <div>
                                              <input
                                                type="radio"
                                                value="verified"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification ===
                                                  "verified"
                                                }
                                                onChange={() => {
                                                  var copy = [
                                                    ...this.state
                                                      .documentsUploaded,
                                                  ];
                                                  copy[id].verification =
                                                    "verified";
                                                  this.setState({
                                                    documentsUploaded: copy,
                                                  });
                                                }}
                                                className="radio"
                                              />{" "}
                                              Verified
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <Divider sx={{ marginTop: "5px", marginBottom: "7px" }} />
                      <div className="field1">
                        <div style={{ width: "55%" }}>
                          <TextField
                            onChange={this.handleChange}
                            value={this.state.academicsUGRemark}
                            variant="outlined"
                            multiline
                            minRows={3}
                            type="text"
                            name="academicsUGRemark"
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
                                    value="pending"
                                    name="academicsUGStatus"
                                    checked={
                                      this.state.academicsUGStatus === "pending"
                                    }
                                    onChange={this.onChangeVerify}
                                    className="radio"
                                  />
                                  pending
                                </div>

                                <div>
                                  <input
                                    type="radio"
                                    value="verified"
                                    name="academicsUGStatus"
                                    checked={
                                      this.state.academicsUGStatus ===
                                      "verified"
                                    }
                                    onChange={this.onChangeVerify}
                                    className="radio"
                                  />{" "}
                                  verified
                                </div>
                              </div>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ alignContent: "center", marginLeft: "30%" }}>
                      <Button
                        variant="outlined"
                        size="large"
                        style={{
                          alignSelf: "center",
                          marginRight: "10px",
                          maxWidth: "250px",
                          minWidth: "250px",
                        }}
                        onClick={this.nextStep}
                      >
                        Back
                      </Button>

                      <Button
                        variant="contained"
                        size="large"
                        style={{
                          alignSelf: "center",
                          marginRight: "10px",
                          maxWidth: "250px",
                          minWidth: "250px",
                        }}
                        onClick={this.nextStep}
                      >
                        Save and next
                      </Button>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <NavBar loggedin={true} />
            <div className="container">
              <Sidebar user="Coordinator" />
              <div style={{ marginTop: "77px" }}>
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
                              PG Details
                            </div>
                          </div>
                          <tbody>
                            <tr class="row1">
                              <td class="first data">University/Institute</td>
                              <td class="data">
                                {this.state.academicsPG.institute}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Nomenclaure of Degree</td>
                              <td class="data">
                                {this.state.academicsPG.degree}
                              </td>
                            </tr>

                            <tr class="row1">
                              <td class="first data">Marks Obtained</td>
                              <td class="data">
                                {this.state.academicsPG.totalAggregate}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Total Marks</td>
                              <td class="data">
                                {this.state.academicsPG.totalMarks}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">CGPA</td>
                              <td class="data">
                                {this.state.academicsPG.cgpa10}
                              </td>
                            </tr>
                            <tr class="row1">
                              <td class="first data">Percentage</td>
                              <td class="data">
                                {this.state.academicsPG.percentageMarks}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />

                        <div className="title">Documents Uploaded</div>
                      </div>
                      <div style={{ justifyContent: "left" }}>
                        {this.state.documentsUploaded.map((doc, id) => (
                          <div key={doc.id}>
                            {doc.type === "PG Marksheet" && (
                              <div className="field2">
                                <div className="documents" key={doc.id}>
                                  <div className="docFieldName">
                                    {doc.type + "  :"}
                                  </div>
                                  <div className="iconMobile">
                                    {/* <div>{id}</div> */}
                                    <div
                                      className="previewIcon"
                                      onClick={() =>
                                        viewDoc({
                                          filename: doc.filename,
                                          contentType: doc.contentType,
                                          originalName: doc.originalName,
                                        })
                                      }
                                    >
                                      <ArrowCircleDown />
                                    </div>
                                  </div>
                                  <div className="icon">
                                    <div>
                                      <div className="verify">
                                        <div style={{ width: "100%" }}>
                                          <div
                                            className="radios"
                                            onChange={(e) =>
                                              this.onChangeVerify(e, id)
                                            }
                                          >
                                            {/* <div>
                                        <input
                                          type="radio"
                                          value="pending"
                                          name={"verification" + id}
                                          defaultChecked={doc.verification === "pending"}
                                          onChange={() => {
                                            var copy = [...this.state.documentsUploaded];
                                            copy[id].verification = "pending";
                                            this.setState({ documentsUploaded: copy });
                                          }}
                                          className="radio"
                                        />
                                        Pending
                                      </div> */}
                                            <div>
                                              <input
                                                type="radio"
                                                value="mod_req"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification === "mod_req"
                                                }
                                                onChange={() => {
                                                  var copy = [
                                                    ...this.state
                                                      .documentsUploaded,
                                                  ];
                                                  copy[id].verification =
                                                    "mod_req";
                                                  this.setState({
                                                    documentsUploaded: copy,
                                                  });
                                                }}
                                                className="radio"
                                              />{" "}
                                              Not Verified
                                            </div>
                                            <div>
                                              <input
                                                type="radio"
                                                value="verified"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification ===
                                                  "verified"
                                                }
                                                onChange={() => {
                                                  var copy = [
                                                    ...this.state
                                                      .documentsUploaded,
                                                  ];
                                                  copy[id].verification =
                                                    "verified";
                                                  this.setState({
                                                    documentsUploaded: copy,
                                                  });
                                                }}
                                                className="radio"
                                              />{" "}
                                              Verified
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {/* Verify + Remarks start */}
                      <Divider sx={{ marginTop: "5px", marginBottom: "7px" }} />
                      <div className="field1">
                        <div style={{ width: "55%" }}>
                          <TextField
                            onChange={this.handleChange}
                            value={this.state.academicsPGRemark}
                            variant="outlined"
                            multiline
                            minRows={3}
                            type="text"
                            name="academicsPGRemark"
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
                                    value="pending"
                                    name="academicsPGStatus"
                                    checked={
                                      this.state.academicsPGStatus === "pending"
                                    }
                                    onChange={this.onChangeVerify}
                                    className="radio"
                                  />
                                  pending
                                </div>
                                {/* <div>
                                    <input
                                      type="radio"
                                      value="mod_req"
                                      name="entranceDetailsStatus"
                                      checked={
                                        this.state.entranceDetailsStatus === "mod_req"
                                      }
                                      onChange={this.onChangeVerify}
                                      className="radio"
                                    />{" "}
                                    mod_req
                                  </div> */}
                                <div>
                                  <input
                                    type="radio"
                                    value="verified"
                                    name="academicsPGStatus"
                                    checked={
                                      this.state.academicsPGStatus ===
                                      "verified"
                                    }
                                    onChange={this.onChangeVerify}
                                    className="radio"
                                  />{" "}
                                  verified
                                </div>
                              </div>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ alignContent: "center", marginLeft: "30%" }}>
                      <Button
                        variant="outlined"
                        size="large"
                        style={{
                          alignSelf: "center",
                          marginRight: "10px",
                          maxWidth: "250px",
                          minWidth: "250px",
                        }}
                        onClick={this.nextStep}
                      >
                        Back
                      </Button>

                      <Button
                        variant="contained"
                        size="large"
                        style={{
                          alignSelf: "center",
                          marginRight: "10px",
                          maxWidth: "250px",
                          minWidth: "250px",
                        }}
                        onClick={this.nextStep}
                      >
                        Save and next
                      </Button>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <NavBar loggedin={true} />
            <div className="container">
              <Sidebar user="Coordinator" />
              <div style={{ marginTop: "77px" }}>
                <div>
                  <div>
                    <div></div>
                    <div>
                      <div className="title"> Entrance Exam Details</div>
                      <div style={{ alignItems: "left", textAlign: "left" }}>
                        {this.state.entranceDetails.isInterestedCoepRPET && (
                          <div className="field1">
                            <div className="fieldName">
                              Want to appear for COEP's Reasearch Program
                              Eligibility Test (RPET)
                            </div>
                          </div>
                        )}
                        {this.state.entranceDetails.givenGate && (
                          <div className="field1">
                            <div className="fieldName">Gate</div>
                            <div>
                              <div>{this.state.entranceDetails.Gate.score}</div>
                              <div>
                                {(
                                  "" +
                                  this.state.entranceDetails.Gate
                                    .lastDateOfValidation
                                ).slice(0, 10)}
                              </div>
                            </div>
                          </div>
                        )}
                        {this.state.entranceDetails
                          .isInterestedCoepEntrance && (
                          <div className="field1">
                            <div className="fieldName">
                              Want to appear for COEP entrance exam
                            </div>
                          </div>
                        )}
                        {this.state.entranceDetails.givenPet && (
                          <div className="field1">
                            <div className="fieldName">SPPU ET 2021</div>
                            <div>
                              <div>
                                {this.state.entranceDetails.sppuPet.details}
                              </div>
                              <div>
                                {this.state.entranceDetails.sppuPet.year}
                              </div>
                            </div>
                          </div>
                        )}

                        {/*Verify + Remark Start*/}
                        <Divider
                          sx={{ marginTop: "5px", marginBottom: "7px" }}
                        />
                        <div className="field1">
                          <div style={{ width: "55%" }}>
                            <TextField
                              onChange={this.handleChange}
                              value={this.state.entranceDetailsRemark}
                              variant="outlined"
                              multiline
                              minRows={3}
                              type="text"
                              name="entranceDetailsRemark"
                              label="Remark"
                              fullWidth
                            ></TextField>
                          </div>
                          <div className="icon">
                            <div>
                              <div className="verify">
                                <div style={{ width: "100%" }}>
                                  <div className="radios">
                                    <div>
                                      <input
                                        type="radio"
                                        value="pending"
                                        name="entranceDetailsStatus"
                                        checked={
                                          this.state.entranceDetailsStatus ===
                                          "pending"
                                        }
                                        onChange={this.onChangeVerify}
                                        className="radio"
                                      />
                                      pending
                                    </div>
                                    {/* <div>
                                    <input
                                      type="radio"
                                      value="mod_req"
                                      name="entranceDetailsStatus"
                                      checked={
                                        this.state.entranceDetailsStatus === "mod_req"
                                      }
                                      onChange={this.onChangeVerify}
                                      className="radio"
                                    />{" "}
                                    mod_req
                                  </div> */}
                                    <div>
                                      <input
                                        type="radio"
                                        value="verified"
                                        name="entranceDetailsStatus"
                                        checked={
                                          this.state.entranceDetailsStatus ===
                                          "verified"
                                        }
                                        onChange={this.onChangeVerify}
                                        className="radio"
                                      />{" "}
                                      verified
                                    </div>
                                  </div>
                                  <br />
                                  <Button
                                    variant="contained"
                                    size="large"
                                    style={{ alignSelf: "center" }}
                                    onClick={this.handleSubmit}
                                  >
                                    Done
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  }
}
