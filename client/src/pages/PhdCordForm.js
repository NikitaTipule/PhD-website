import React, { Component } from "react";
import Divider from "@mui/material/Divider";
// import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import Button from "@mui/material/Button";
import "./DisplayData.css";
import { TextField } from "@mui/material";
import { BACKEND_URL } from "../config";
import axios from "axios";
import NavBar from "../components/Navbar/Navbar";
import DocViewer from "./DocViewer";
import Sidebar from "../components/Sidebar";
// import { flexbox } from "@mui/system";

export default class phdCordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      email: "",
      mobile: "",
      personalInfo: "",
      personalInfoStatus: "pending",
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

      appId: null,
      role: localStorage.getItem("phd-website-role"),
    };
  }

  async componentDidMount() {
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
            const user = res.data.user;
            this.setState({
              email: user.email,
              mobile: user.mobile,
              personalInfo: user.personalInfo,
              personalInfoStatus: user.personalInfo.verification,
              personalInfoRemark: user.personalInfo.remarks,

              academicsUG: user.academicsUG,
              academicsUGStatus: user.academicsUG.verification,
              academicsUGRemark: user.academicsUG.remarks,

              academicsPG: user.academicsPG,
              academicsPGStatus: user.academicsPG.verification,
              academicsPGRemark: user.academicsPG.remarks,

              entranceDetails: user.entranceDetails,
              entranceDetailsStatus: user.entranceDetails.givenGate
                ? user.entranceDetails.verification
                : "verified",
              entranceDetailsRemark: user.entranceDetails.remarks,
              gateMarksheet: user.entranceDetails.documentsUploaded,

              documentsUploaded: user.documentsUploaded,

              remarks: user.remarks,

              appId: user?.applicationId ? user.applicationId : null,
            });
          });
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  prevStephome = () => {
    this.props.history.push({
      pathname: "/coordinator",
      // search: `/${id}`,
      state: { details: this.props.location.state.cordId },
    });
  };

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
    const data = {
      studentId: this.props.location.state.details,
      personalInfo: {
        status: this.state.personalInfoStatus,
        remarks: this.state.personalInfoRemark,
      },
      academicsUG: {
        status: this.state.academicsUGStatus,
        remarks: this.state.academicsUGRemark,
      },
      academicsPG: {
        status: this.state.academicsPGStatus,
        remarks: this.state.academicsPGRemark,
      },
      entranceDetails: {
        status: this.state.entranceDetailsStatus,
        remarks: this.state.entranceDetailsRemark,
      },
      documentsUploaded: this.state.documentsUploaded,
      remarks: this.state.remarks,
    };

    axios
      .post(BACKEND_URL + "/students/verify/info", data, {
        headers: { "phd-website-jwt": this.state.token },
      })
      .then((res) => {
        this.setState({
          redirect: !this.state.redirect,
        });
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
    this.setState({ [event.target.name]: event.target.value });
  };

  personInfoDocTypes = [
    "Applicant's Photo",
    "Applicant's Signature",
    "Nationality Certificate",
    "Caste Certificate",
    "Caste Validity",
    "Non-Creamy Layer Certificate",
    "EWS Certificate",
    "Proof of DOB",
    "Proof of Physical Disability",
    "Proof of Employment",
    "Domicile Certificate",
  ];

  academicsUGDocTypes = ["UG Marksheet", "UG Degree Certificate"];

  academicsPGDocTypes = ["PG Marksheet", "PG Degree Certificate"];

  entranceDetailsDocTypes = ["GATE Marksheet"];

  onChangeStatus = (id, status) => {
    var copy = [...this.state.documentsUploaded];
    copy[id].verification = status;
    let sectionDocTypes = null;
    let sectionField = "";
    if (this.personInfoDocTypes.includes(copy[id].type)) {
      sectionDocTypes = this.personInfoDocTypes;
      sectionField = "personalInfoStatus";
    } else if (this.academicsUGDocTypes.includes(copy[id].type)) {
      sectionDocTypes = this.academicsUGDocTypes;
      sectionField = "academicsUGStatus";
    } else if (this.academicsPGDocTypes.includes(copy[id].type)) {
      sectionDocTypes = this.academicsPGDocTypes;
      sectionField = "academicsPGStatus";
    } else if (this.entranceDetailsDocTypes.includes(copy[id].type)) {
      sectionDocTypes = this.entranceDetailsDocTypes;
      sectionField = "entranceDetailsStatus";
    }

    if (!sectionDocTypes) return;
    const getSectionStatus = (sectionDocTypes) => {
      let pending = false;
      for (let doc of copy) {
        if (sectionDocTypes.includes(doc.type)) {
          if (doc.verification === "mod_req") return "mod_req";
          if (doc.verification === "pending") pending = true;
        }
      }
      return pending ? "pending" : "verified";
    };
    this.setState({
      documentsUploaded: copy,
      [sectionField]: getSectionStatus(sectionDocTypes),
    });
  };

  render() {
    if (this.state.redirect) {
      // return <Redirect to="/coordinator" />;
      this.props.history.push({
        pathname: "/coordinator",
        state: { details: this.props.location.state.cordId },
      });
    }

    const { step } = this.state;

    switch (step) {
      case 1:
        return (
          <>
            {/* Personal Details Display   */}
            <NavBar loggedin={true} />
            <div className="container">
              <Sidebar
                user={this.state.role === "admin" ? "Admin" : "Coordinator"}
              />
              <div>
                <div>
                  <div>
                    <div>
                      <div className="container1">
                        <table className="tb">
                          <div className="type">
                            <div
                              className="h"
                              style={{ color: "white", width: "200%" }}
                            >
                              Personal Details
                            </div>
                          </div>
                          <tbody>
                            <tr className="row1">
                              <td className="first data">Application ID</td>
                              <td className="data">
                                {this.state.appId ? this.state.appId : ""}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Name</td>
                              <td className="data">
                                {this.state.personalInfo.name}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                Father/Husband's Name
                              </td>
                              <td className="data">
                                {this.state.personalInfo.middleName}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Mother's Name</td>
                              <td className="data">
                                {this.state.personalInfo.motherName}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Gender</td>
                              <td className="data">
                                {this.state.personalInfo.gender}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">DOB</td>
                              <td className="data">
                                {("" + this.state.personalInfo.dob).slice(
                                  0,
                                  10
                                )}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Email</td>
                              <td className="data">{this.state.email}</td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Mobile No</td>
                              <td className="data">{this.state.mobile}</td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Nationality</td>
                              <td className="data">
                                {this.state.personalInfo.nationality}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Category</td>
                              <td className="data">
                                {this.state.personalInfo.category}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Aadhar Id</td>
                              <td className="data">
                                {this.state.personalInfo.aadhar}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Permanent Address</td>
                              <td className="data">
                                {this.state.personalInfo.address}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                Physically Challenged(PH)
                              </td>
                              <td className="data">
                                {this.state.personalInfo.physicallys}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                Applying to department
                              </td>
                              <td className="data">
                                {this.state.personalInfo.department}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Employed</td>
                              <td className="data">
                                {this.state.personalInfo.employed}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                MH State Candidature
                              </td>
                              <td className="data">
                                {this.state.personalInfo.domicile}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />

                        {/* Personal Details Documents   */}
                        <div className="title">Documents Uploaded</div>
                      </div>
                      <div style={{ justifyContent: "left" }}>
                        {this.state.documentsUploaded.map((doc, id) => (
                          <div key={doc.id}>
                            {this.personInfoDocTypes.includes(doc.type) && (
                              <div className="field2">
                                <div className="documents" key={doc.id}>
                                  <div
                                    className="docFieldName"
                                    style={{ width: "300px" }}
                                  >
                                    {doc.type + "  :"}
                                  </div>
                                  <div
                                    className="iconMobile"
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      margin: "auto",
                                      paddingBottom: "60px",
                                    }}
                                  >
                                    {/* <div>{id}</div> */}
                                    <div>Preview</div>
                                    <div style={{ paddingLeft: "10px" }}>
                                      <DocViewer
                                        data={{
                                          filename: doc.filename,
                                          contentType: doc.contentType,
                                          originalName: doc.originalName,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="icon">
                                    <div>
                                      {/* Verification Component for documents  */}
                                      <div className="verify">
                                        <div style={{ width: "100%" }}>
                                          <div
                                            className="radios"
                                            onChange={(e) =>
                                              this.onChangeVerify(e, id)
                                            }
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              margin: "auto",
                                              align: "center",
                                            }}
                                          >
                                            <div>
                                              <input
                                                type="radio"
                                                value="mod_req"
                                                className="radio"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification === "mod_req"
                                                }
                                                onChange={() =>
                                                  this.onChangeStatus(
                                                    id,
                                                    "mod_req"
                                                  )
                                                }
                                              />
                                              {"\n"}
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
                                                onChange={() =>
                                                  this.onChangeStatus(
                                                    id,
                                                    "verified"
                                                  )
                                                }
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
                      {/* Remark and verification for personal Details   */}
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
                          {/* Verification Component for documents  */}
                          <div className="verify">
                            <div style={{ width: "100%" }}>
                              <div className="radios">
                                <div>
                                  <input
                                    type="radio"
                                    name="personalInfoStatus"
                                    checked={
                                      this.state.personalInfoStatus ===
                                      "mod_req"
                                    }
                                    className="radio"
                                  />
                                  Not Verified
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    name="personalInfoStatus"
                                    checked={
                                      this.state.personalInfoStatus ===
                                      "verified"
                                    }
                                    className="radio"
                                  />
                                  Verified
                                </div>
                              </div>
                              <br />
                              {/* Save and Next - Personal Details */}
                              <div style={{ alignContent: "center" }}>
                                <Button
                                  variant="outlined"
                                  size="large"
                                  style={{
                                    alignSelf: "center",
                                    marginRight: "10px",
                                    maxWidth: "250px",
                                    minWidth: "250px",
                                  }}
                                  onClick={this.prevStephome}
                                >
                                  Back
                                </Button>
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
              <Sidebar
                user={this.state.role === "admin" ? "Admin" : "Coordinator"}
              />
              {/* Display details of UG   */}
              <div>
                <div>
                  <div>
                    <div>
                      <div className="container1">
                        <table className="tb">
                          <div className="type">
                            <div
                              className="h"
                              style={{ color: "white", width: "200%" }}
                            >
                              UG Details
                            </div>
                          </div>
                          <tbody>
                            <tr className="row1">
                              <td className="first data">
                                University/Institute
                              </td>
                              <td className="data">
                                {this.state.academicsUG.institute}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                Nomenclaure of Degree
                              </td>
                              <td className="data">
                                {this.state.academicsUG.degree}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Branch</td>
                              <td className="data">
                                {this.state.academicsUG.specialization}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">CGPA</td>
                              <td className="data">
                                {this.state.academicsUG.cgpa10}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Percentage</td>
                              <td className="data">
                                {this.state.academicsUG.percentageMarks}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                Date of Declaration
                              </td>
                              <td className="data">
                                {(
                                  "" + this.state.academicsUG.dateOfDeclaration
                                ).slice(0, 10)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />

                        {/* Verification for documents */}
                        <div className="title">Documents Uploaded</div>
                      </div>
                      <div style={{ justifyContent: "left" }}>
                        {this.state.documentsUploaded.map((doc, id) => (
                          <div key={doc.id}>
                            {(doc.type === "UG Marksheet" ||
                              doc.type === "UG Degree Certificate") && (
                              <div className="field2">
                                <div className="documents" key={doc.id}>
                                  <div
                                    className="docFieldName"
                                    style={{ width: "300px" }}
                                  >
                                    {doc.type + "  :"}
                                  </div>
                                  <div
                                    className="iconMobile"
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      margin: "auto",
                                      paddingBottom: "60px",
                                    }}
                                  >
                                    {/* <div>{id}</div> */}
                                    <div>Preview</div>
                                    <div style={{ paddingLeft: "10px" }}>
                                      <DocViewer
                                        data={{
                                          filename: doc.filename,
                                          contentType: doc.contentType,
                                          originalName: doc.originalName,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="icon">
                                    <div>
                                      {/* Verification Component for documents  */}
                                      <div className="verify">
                                        <div style={{ width: "100%" }}>
                                          <div
                                            className="radios"
                                            onChange={(e) =>
                                              this.onChangeVerify(e, id)
                                            }
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              margin: "auto",
                                              align: "center",
                                            }}
                                          >
                                            <div>
                                              <input
                                                type="radio"
                                                value="mod_req"
                                                className="radio"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification === "mod_req"
                                                }
                                                onChange={() =>
                                                  this.onChangeStatus(
                                                    id,
                                                    "mod_req"
                                                  )
                                                }
                                              />
                                              {"\n"}
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
                                                onChange={() =>
                                                  this.onChangeStatus(
                                                    id,
                                                    "verified"
                                                  )
                                                }
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

                      {/* Remark and Verification for UG  */}
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
                                    value="mod_req"
                                    name="academicsUGStatus"
                                    checked={
                                      this.state.academicsUGStatus === "mod_req"
                                    }
                                    className="radio"
                                  />
                                  Not Verified
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
                                    className="radio"
                                  />{" "}
                                  Verified
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
                        onClick={this.prevStep}
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
              <Sidebar
                user={this.state.role === "admin" ? "Admin" : "Coordinator"}
              />
              {/* Display PG data  */}
              <div>
                <div>
                  <div>
                    <div></div>
                    <div>
                      <div className="container1">
                        <table className="tb">
                          <div className="type">
                            <div
                              className="h"
                              style={{ color: "white", width: "200%" }}
                            >
                              PG Details
                            </div>
                          </div>
                          <tbody>
                            <tr className="row1">
                              <td className="first data">
                                University/Institute
                              </td>
                              <td className="data">
                                {this.state.academicsPG.institute}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                Nomenclature of Degree
                              </td>
                              <td className="data">
                                {this.state.academicsPG.degree}
                              </td>
                            </tr>

                            <tr className="row1">
                              <td className="first data">Branch</td>
                              <td className="data">
                                {this.state.academicsPG.branch}
                              </td>
                            </tr>

                            <tr className="row1">
                              <td className="first data">Specialization</td>
                              <td className="data">
                                {this.state.academicsPG.specialization}
                              </td>
                            </tr>

                            <tr className="row1">
                              <td className="first data">Status of PG</td>
                              <td className="data">
                                {this.state.academicsPG.status}
                              </td>
                            </tr>

                            {this.state.academicsPG.status === "Passed" && (
                              <tr className="row1">
                                <td className="first data">CGPA</td>
                                <td className="data">
                                  {this.state.academicsPG.cgpa10}
                                </td>
                              </tr>
                            )}
                            {this.state.academicsPG.status === "Passed" && (
                              <tr className="row1">
                                <td className="first data">Percentage</td>
                                <td className="data">
                                  {this.state.academicsPG.percentageMarks}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <br />

                        {/* Display documents of PG  */}
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
                                    <DocViewer
                                      data={{
                                        filename: doc.filename,
                                        contentType: doc.contentType,
                                        originalName: doc.originalName,
                                      }}
                                    />
                                  </div>
                                  <div className="icon">
                                    <div>
                                      {/* Verification component for documents  */}
                                      <div className="verify">
                                        <div style={{ width: "100%" }}>
                                          <div
                                            className="radios"
                                            onChange={(e) =>
                                              this.onChangeVerify(e, id)
                                            }
                                          >
                                            <div>
                                              <input
                                                type="radio"
                                                value="mod_req"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification === "mod_req"
                                                }
                                                onChange={() =>
                                                  this.onChangeStatus(
                                                    id,
                                                    "mod_req"
                                                  )
                                                }
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
                                                onChange={() =>
                                                  this.onChangeStatus(
                                                    id,
                                                    "verified"
                                                  )
                                                }
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

                      <div style={{ justifyContent: "left" }}>
                        {this.state.documentsUploaded.map((doc, id) => (
                          <div key={doc.id}>
                            {doc.type === "PG Degree Certificate" && (
                              <div className="field2">
                                <div className="documents" key={doc.id}>
                                  <div className="docFieldName">
                                    {doc.type + "  :"}
                                  </div>
                                  <div className="iconMobile">
                                    {/* <div>{id}</div> */}
                                    <DocViewer
                                      data={{
                                        filename: doc.filename,
                                        contentType: doc.contentType,
                                        originalName: doc.originalName,
                                      }}
                                    />
                                  </div>
                                  <div className="icon">
                                    <div>
                                      {/* Verification component for documents  */}
                                      <div className="verify">
                                        <div style={{ width: "100%" }}>
                                          <div
                                            className="radios"
                                            onChange={(e) =>
                                              this.onChangeVerify(e, id)
                                            }
                                          >
                                            <div>
                                              <input
                                                type="radio"
                                                value="mod_req"
                                                name={"verification" + id}
                                                defaultChecked={
                                                  doc.verification === "mod_req"
                                                }
                                                onChange={() =>
                                                  this.onChangeStatus(
                                                    id,
                                                    "mod_req"
                                                  )
                                                }
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
                                                onChange={() =>
                                                  this.onChangeStatus(
                                                    id,
                                                    "verified"
                                                  )
                                                }
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
                                    value="mod_req"
                                    name="academicsPGStatus"
                                    checked={
                                      this.state.academicsPGStatus === "mod_req"
                                    }
                                    className="radio"
                                  />{" "}
                                  Not Verified
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    value="verified"
                                    name="academicsPGStatus"
                                    checked={
                                      this.state.academicsPGStatus ===
                                      "verified"
                                    }
                                    className="radio"
                                  />{" "}
                                  Verified
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
                        onClick={this.prevStep}
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
              <Sidebar
                user={this.state.role === "admin" ? "Admin" : "Coordinator"}
              />
              {/* Display Entrance Exam data  */}
              <div style={{ marginTop: "30px" }}>
                <div>
                  <div>
                    <div className="container1">
                      {/* <div className="title"> Entrance Exam Details</div> */}
                      <div style={{ alignItems: "left", textAlign: "left" }}>
                        <table className="tb">
                          <div className="type">
                            <div
                              className="h"
                              style={{ color: "white", width: "200%" }}
                            >
                              Entrance Exam Details
                            </div>
                          </div>
                          <tbody>
                            <tr className="row1">
                              <td className="first data">
                                Want to appear for COEP Tech's Reasearch Program
                                Eligibility Test (RPET)
                              </td>
                              <td className="data">
                                {this.state.entranceDetails.isInterestedCoepRPET
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">Given GATE</td>
                              <td className="data">
                                {this.state.entranceDetails.givenGate
                                  ? "Yes"
                                  : "No"}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">GATE Discipline</td>
                              <td className="data">
                                {this.state.entranceDetails.Gate.discipline}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">GATE Category</td>
                              <td className="data">
                                {this.state.entranceDetails.Gate.category}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                GATE Score out of 1000
                              </td>
                              <td className="data">
                                {this.state.entranceDetails.Gate.score}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                GATE marks out of 100
                              </td>
                              <td className="data">
                                {this.state.entranceDetails.Gate.marks}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">GATE Qualified</td>
                              <td className="data">
                                {this.state.entranceDetails.Gate.gateQualified}
                              </td>
                            </tr>
                            <tr className="row1">
                              <td className="first data">
                                GATE Score Valid Upto
                              </td>
                              <td className="data">
                                {(
                                  "" +
                                  this.state.entranceDetails.Gate
                                    .lastDateOfValidation
                                ).slice(0, 10)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <br />

                        <div className="title">Documents Uploaded</div>
                        <div style={{ justifyContent: "left" }}>
                          {this.state.documentsUploaded.map((doc, id) => (
                            <div key={doc.id}>
                              {doc.type === "GATE Marksheet" && (
                                <div className="field2">
                                  <div className="documents" key={doc.id}>
                                    <div className="docFieldName">
                                      {doc.type + "  :"}
                                    </div>
                                    <div className="iconMobile">
                                      <DocViewer
                                        data={{
                                          filename: doc.filename,
                                          contentType: doc.contentType,
                                          originalName: doc.originalName,
                                        }}
                                      />
                                    </div>
                                    <div className="icon">
                                      <div>
                                        {/* Document verification   */}
                                        <div className="verify">
                                          <div style={{ width: "100%" }}>
                                            <div
                                              className="radios"
                                              onChange={(e) =>
                                                this.onChangeVerify(e, id)
                                              }
                                            >
                                              <div>
                                                <input
                                                  type="radio"
                                                  value="mod_req"
                                                  name={"verification" + id}
                                                  defaultChecked={
                                                    doc.verification ===
                                                    "mod_req"
                                                  }
                                                  onChange={() =>
                                                    this.onChangeStatus(
                                                      id,
                                                      "mod_req"
                                                    )
                                                  }
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
                                                  onChange={() =>
                                                    this.onChangeStatus(
                                                      id,
                                                      "verified"
                                                    )
                                                  }
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
                      </div>
                      {/*Verify + Remark Start*/}
                      <Divider sx={{ marginTop: "5px", marginBottom: "7px" }} />
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
                                      value="mod_req"
                                      name="entranceDetailsStatus"
                                      checked={
                                        this.state.entranceDetailsStatus ===
                                        "mod_req"
                                      }
                                      className="radio"
                                    />{" "}
                                    Not Verified
                                  </div>
                                  <div>
                                    <input
                                      type="radio"
                                      value="verified"
                                      name="entranceDetailsStatus"
                                      checked={
                                        this.state.entranceDetailsStatus ===
                                        "verified"
                                      }
                                      className="radio"
                                    />{" "}
                                    Verified
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
          </>
        );
      default:
        return <></>;
    }
  }
}
