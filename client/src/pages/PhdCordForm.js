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

class phdCordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          });
      } catch (error) {
        console.log(error.response);
      }
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
    return (
      <>
        <NavBar />
        <div
          style={{
            
            margin: "30px 10% 30px 10%",
          }}
        >
          {/* Personal Details  */}
          <div className="title">Personal Details</div>
          <div>
            <div className="field1">
              <div className="fieldName">Name :</div>
              <div>{this.state.personalInfo.name}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Father/Husband's Name :</div>
              <div>{this.state.personalInfo.middleName}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Gender :</div>
              <div>{this.state.personalInfo.gender}</div>
            </div>
            <div className="field1">
              <div className="fieldName">DOB :</div>
              <div>{("" + this.state.personalInfo.dob).slice(0, 10)}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Email :</div>
              <div>{this.state.personalInfo.email}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Mobile No :</div>
              <div>{this.state.personalInfo.mobile}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Nationality :</div>
              <div>{this.state.personalInfo.nationality}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Category :</div>
              <div>{this.state.personalInfo.category}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Aadhar Card Number :</div>
              <div>{this.state.personalInfo.aadhar}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Permanent Address :</div>
              <div>{this.state.personalInfo.address}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Physically Disable :</div>
              <div>{this.state.personalInfo.physicallyDisabled}</div>
            </div>
            <div className="field1">
              <div className="fieldName">Applying to department :</div>
              <div>{this.state.personalInfo.department}</div>
            </div>

            {/* Verify + Remarks start */}
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
                              this.state.personalInfoStatus === "pending"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />
                          pending
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="mod_req"
                            name="personalInfoStatus"
                            checked={
                              this.state.personalInfoStatus === "mod_req"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          mod_req
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="verified"
                            name="personalInfoStatus"
                            checked={
                              this.state.personalInfoStatus === "verified"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Verify + Remark end */}
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          {/* UG Details  */}
          <div className="title">UG Details</div>
          <div style={{ alignItems: "left", textAlign: "left" }}>
            <div className="field1">
              <div className="fieldName">University/Institute :</div>
              <div>{this.state.academicsUG.institute}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Nomanclaure of Degree :</div>
              <div>{this.state.academicsUG.degree}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Specialization :</div>
              <div>{this.state.academicsUG.specialization}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Marks Obtained :</div>
              <div>{this.state.academicsUG.totalAggregate}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Total Marks :</div>
              <div>{this.state.academicsUG.totalMarks}</div>
            </div>

            <div className="field1">
              <div className="fieldName">CGPA :</div>
              <div>{this.state.academicsUG.cgpa10}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Percentage :</div>
              <div>{this.state.academicsUG.percentageMarks}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Date of Declaration :</div>
              <div>
                {("" + this.state.academicsUG.dateOfDeclaration).slice(0, 10)}
              </div>
            </div>

            {/*Verify + Remark Start*/}
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
                            checked={this.state.academicsUGStatus === "pending"}
                            onChange={this.onChangeVerify}
                            className="radio"
                          />
                          pending
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="mod_req"
                            name="academicsUGStatus"
                            checked={this.state.academicsUGStatus === "mod_req"}
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          mod_req
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="verified"
                            name="academicsUGStatus"
                            checked={
                              this.state.academicsUGStatus === "verified"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Verify + Remark end */}
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          {/* PG Details    */}
          <div className="title">PG Details</div>
          <div style={{ alignItems: "left", textAlign: "left" }}>
            <div className="field1">
              <div className="fieldName">University/Institute :</div>
              <div>{this.state.academicsPG.institute}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Nomanclaure of Degree :</div>
              <div>{this.state.academicsPG.degree}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Marks Obtained :</div>
              <div>{this.state.academicsPG.totalAggregate}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Total Marks :</div>
              <div>{this.state.academicsPG.totalMarks}</div>
            </div>

            <div className="field1">
              <div className="fieldName">CGPA :</div>
              <div>{this.state.academicsPG.cgpa10}</div>
            </div>

            <div className="field1">
              <div className="fieldName">Percentage :</div>
              <div>{this.state.academicsPG.percentageMarks}</div>
            </div>

            {/*Verify + Remark Start*/}
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
                            checked={this.state.academicsPGStatus === "pending"}
                            onChange={this.onChangeVerify}
                            className="radio"
                          />
                          pending
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="mod_req"
                            name="academicsPGStatus"
                            checked={this.state.academicsPGStatus === "mod_req"}
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          mod_req
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="verified"
                            name="academicsPGStatus"
                            checked={
                              this.state.academicsPGStatus === "verified"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Verify + Remark end */}
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          {/*Entrance Exam details*/}
          <div className="title"> Entrance Exam Details</div>
          <div style={{ alignItems: "left", textAlign: "left" }}>
            {this.state.entranceDetails.isInterestedCoepRPET && (
              <div className="field1">
                <div className="fieldName">
                  Want to appear for COEP's Reasearch Program Eligibility Test
                  (RPET)
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
                      "" + this.state.entranceDetails.Gate.lastDateOfValidation
                    ).slice(0, 10)}
                  </div>
                </div>
              </div>
            )}
            {this.state.entranceDetails.isInterestedCoepEntrance && (
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
                  <div>{this.state.entranceDetails.sppuPet.details}</div>
                  <div>{this.state.entranceDetails.sppuPet.year}</div>
                </div>
              </div>
            )}

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
                            value="pending"
                            name="entranceDetailsStatus"
                            checked={
                              this.state.entranceDetailsStatus === "pending"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />
                          pending
                        </div>
                        <div>
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
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="verified"
                            name="entranceDetailsStatus"
                            checked={
                              this.state.entranceDetailsStatus === "verified"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Verify + Remark end */}
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          <div className="title">Documents Uploaded</div>

          <div style={{ alignItems: "left", textAlign: "left" }}>
            {this.state.documentsUploaded.map((doc, id) => (
              <div className="field1" key={doc.id}>
                <div className="documents">
                  <div className="docFieldName">{doc.type + "  :"}</div>
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
                </div>

                {/* Verification of documents   */}
                <div className="icon">
                  <div>
                    <div className="verify">
                      <div style={{ width: "100%" }}>
                        <div
                          className="radios"
                          onChange={(e) => this.onChangeVerify(e, id)}
                        >
                          <div>
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
                          </div>
                          <div>
                            <input
                              type="radio"
                              value="mod_req"
                              name={"verification" + id}
                              defaultChecked={doc.verification === "mod_req"}
                              onChange={() => {
                                var copy = [...this.state.documentsUploaded];
                                copy[id].verification = "mod_req";
                                this.setState({ documentsUploaded: copy });
                              }}
                              className="radio"
                            />{" "}
                            Mod_req
                          </div>
                          <div>
                            <input
                              type="radio"
                              value="verified"
                              name={"verification" + id}
                              defaultChecked={doc.verification === "verified"}
                              onChange={() => {
                                var copy = [...this.state.documentsUploaded];
                                copy[id].verification = "verified";
                                this.setState({ documentsUploaded: copy });
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
            ))}
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

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
          />

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          <Button
            variant="contained"
            size="large"
            style={{ alignSelf: "center" }}
            onClick={this.handleSubmit}
          >
            Done
          </Button>
        </div>
      </>
    );
  }
}

export default phdCordForm;
