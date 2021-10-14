import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import Button from "@mui/material/Button";
import "./DisplayData.css";
import { TextField } from "@mui/material";
import { Redirect } from "react-router";
import { BACKEND_URL } from "../config";
import axios from "axios";
import NavBar from "../components/Navbar/Navbar";

class VerificationComponent extends Component {
  onChangeVerify = (event) => {};

  render() {
    return (
      <div className="verify">
        <div style={{ width: "100%" }}>
          <div className="radios">
            <div>
              <input
                type="radio"
                value="Pending"
                name="verify"
                checked={this.props.status === "Pending"}
                onChange={this.onChangeVerify}
                className="radio"
              />
              Pending
            </div>
            <div>
              <input
                type="radio"
                value="Modification-Required"
                name="verify"
                checked={this.props.status === "Modification-Required"}
                onChange={this.onChangeVerify}
                className="radio"
              />{" "}
              Modification-Required
            </div>
            <div>
              <input
                type="radio"
                value="Verified"
                name="verify"
                checked={this.props.status === "Verified"}
                onChange={this.onChangeVerify}
                className="radio"
              />{" "}
              Verified
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class phdCordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      personalInfoStatus: "Pending",
      personalInfoRemark: "",

      university: "",
      nomanclaure: "",
      specialization: "",
      marksObtained: "",
      totalMarks: "",
      cgpa: "",
      percentage: "",
      dateOfDeclaration: "",
      academicsUGStatus: "Pending",
      academicsUGRemark: "",

      pguniversity: "",
      pgnomanclaure: "",
      pgmarksObtained: "",
      pgtotalMarks: "",
      pgcgpa: "",
      pgpercentage: "",
      academicsPGStatus: "Pending",
      academicsPGRemark: "",

      givenGate: false,
      givenPet: false,
      isInterestedCoepEntrance: false,
      isInterestedCoepRPET: false,
      gateScore: "",
      gateDate: "",
      petDetails: "",
      petYear: "",
      entranceDetailsStatus: "Pending",
      entranceDetailsRemark: "",

      open: false,
      confirmAlert: false,

      message: "",
      redirect: false,
      token: "",
      verification: "",
    };
  }

  async componentDidMount() {
    console.log(this.props.location.state.details);
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
            console.log(res.data);
            this.setState({
              name: res.data.user.personalInfo.name,
              middleName: res.data.user.personalInfo.middleName,
              gender: res.data.user.personalInfo.gender,
              dob: res.data.user.personalInfo.dob,
              email: res.data.user.email,
              mobile: res.data.user.personalInfo.mobile,
              nationality: res.data.user.personalInfo.nationality,
              category: res.data.user.personalInfo.category,
              aadhar: res.data.user.personalInfo.aadhar,
              address: res.data.user.personalInfo.address,
              physicallyDisabled: res.data.user.personalInfo.physicallyDisabled,
              department: res.data.user.personalInfo.department,

              university: res.data.user.academicsUG.institute,
              nomanclaure: res.data.user.academicsUG.degree,
              specialization: res.data.user.academicsUG.specialization,
              marksObtained: res.data.user.academicsUG.totalAggregate,
              totalMarks: res.data.user.academicsUG.totalMarks,
              cgpa: res.data.user.academicsUG.cgpa10,
              percentage: res.data.user.academicsUG.percentageMarks,
              dateOfDeclaration: res.data.user.academicsUG.dateOfDeclaration,

              pguniversity: res.data.user.academicsPG.institute,
              pgnomanclaure: res.data.user.academicsPG.degree,
              pgmarksObtained: res.data.user.academicsPG.totalAggregate,
              pgtotalMarks: res.data.user.academicsPG.totalMarks,
              pgcgpa: res.data.user.academicsPG.cgpa10,
              pgpercentage: res.data.user.academicsPG.percentageMarks,

              givenGate: res.data.user.entranceDetails.givenGate,
              givenPet: res.data.user.entranceDetails.givenPet,
              isInterestedCoepEntrance:
                res.data.user.entranceDetails.isInterestedCoepEntrance,
              isInterestedCoepRPET:
                res.data.user.entranceDetails.isInterestedCoepRPET,

              gateScore: res.data.user.entranceDetails.Gate.score,
              gateDate: res.data.user.entranceDetails.Gate.lastDateOfValidation,
              petDetails: res.data.user.entranceDetails.sppuPet.details,
              petYear: res.data.user.entranceDetails.sppuPet.year,

              message: res.data.user.remarks,
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    this.setState({
      message: this.state.message,
    });
    console.log(this.state.message);
    this.setState({
      redirect: !this.state.redirect,
    });
  };

  onChangeVerify = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.redirect) {
      // return <Redirect to="/coordinator" />;
      this.props.history.push({
        pathname: '/coordinator',
        // search: `/${id}`,
        state: { details: this.props.location.state.cordId }
      })
    }
    return (
      <>
        <NavBar />
        <div
          style={{
            alignItems: "center",
            textAlign: "left",
            margin: "30px 10% 30px 10%",
          }}
        >
          {/* Personal Details  */}
          <div className="title">Personal Details</div>

          <div style={{ alignItems: "left", textAlign: "left" }}>
            <div className="field">
              <div className="fieldName">Name :</div>
              <div>{this.state.name}</div>
            </div>

            <div className="field">
              <div className="fieldName">Father/Husband's Name :</div>
              <div>{this.state.middleName}</div>
            </div>

            <div className="field">
              <div className="fieldName">Gender :</div>
              <div>{this.state.gender}</div>
            </div>

            <div className="field">
              <div className="fieldName">DOB :</div>
              <div>{this.state.dob.toLocaleString().slice(0, 10)}</div>
            </div>

            <div className="field">
              <div className="fieldName">Email :</div>
              <div>{this.state.email}</div>
            </div>

            <div className="field">
              <div className="fieldName">Mobile No :</div>
              <div>{this.state.mobile}</div>
            </div>

            <div className="field">
              <div className="fieldName">Nationality :</div>
              <div>{this.state.nationality}</div>
            </div>

            <div className="field">
              <div className="fieldName">Category :</div>
              <div>{this.state.category}</div>
            </div>

            <div className="field">
              <div className="fieldName">Aadhar Card Number :</div>
              <div>{this.state.aadhar}</div>
            </div>

            <div className="field">
              <div className="fieldName">Permanent Address :</div>
              <div>{this.state.address}</div>
            </div>

            <div className="field">
              <div className="fieldName">Physically Disable :</div>
              <div>{this.state.physicallyDisabled}</div>
            </div>

            <div className="field">
              <div className="fieldName">Applying to department :</div>
              <div>{this.state.department}</div>
            </div>

            {/* Verify + Remarks start */}
            <Divider sx={{ marginTop: "5px", marginBottom: "7px" }} />
            <div className="field">
              <div style={{ width: "55%" }}>
                <TextField
                  onChange={this.handleChange}
                  value={this.state.personalInfoRemark}
                  variant="outlined"
                  multiline
                  minRows={3}
                  type="text"
                  name="personlInfoRemark"
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
                            value="Pending"
                            name="personalInfoStatus"
                            checked={
                              this.state.personalInfoStatus === "Pending"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />
                          Pending
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Modification-Required"
                            name="personalInfoStatus"
                            checked={
                              this.state.personalInfoStatus ===
                              "Modification-Required"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          Modification-Required
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Verified"
                            name="personalInfoStatus"
                            checked={
                              this.state.personalInfoStatus === "Verified"
                            }
                            onChange={this.onChangeVerify}
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
            {/* Verify + Remark end */}
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          {/* UG Details  */}
          <div className="title">UG Details</div>

          <div style={{ alignItems: "left", textAlign: "left" }}>
            <div className="field">
              <div className="fieldName">University/Institute :</div>
              <div>{this.state.university}</div>
            </div>

            <div className="field">
              <div className="fieldName">Nomanclaure of Degree :</div>
              <div>{this.state.nomanclaure}</div>
            </div>

            <div className="field">
              <div className="fieldName">Specialization :</div>
              <div>{this.state.specialization}</div>
            </div>

            <div className="field">
              <div className="fieldName">Marks Obtained :</div>
              <div>{this.state.marksObtained}</div>
            </div>

            <div className="field">
              <div className="fieldName">Total Marks :</div>
              <div>{this.state.totalMarks}</div>
            </div>

            <div className="field">
              <div className="fieldName">CGPA :</div>
              <div>{this.state.cgpa}</div>
            </div>

            <div className="field">
              <div className="fieldName">Percentage :</div>
              <div>{this.state.percentage}</div>
            </div>

            <div className="field">
              <div className="fieldName">Date of Declaration :</div>
              <div>{this.state.dateOfDeclaration}</div>
            </div>

            {/*Verify + Remark Start*/}
            <Divider sx={{ marginTop: "5px", marginBottom: "7px" }} />
            <div className="field">
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
                            value="Pending"
                            name="academicsUGStatus"
                            checked={this.state.academicsUGStatus === "Pending"}
                            onChange={this.onChangeVerify}
                            className="radio"
                          />
                          Pending
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Modification-Required"
                            name="academicsUGStatus"
                            checked={
                              this.state.academicsUGStatus ===
                              "Modification-Required"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          Modification-Required
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Verified"
                            name="academicsUGStatus"
                            checked={
                              this.state.academicsUGStatus === "Verified"
                            }
                            onChange={this.onChangeVerify}
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
            {/* Verify + Remark end */}
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          {/* PG Details    */}
          <div className="title">PG Details</div>

          <div style={{ alignItems: "left", textAlign: "left" }}>
            <div className="field">
              <div className="fieldName">University/Institute :</div>
              <div>{this.state.pguniversity}</div>
            </div>

            <div className="field">
              <div className="fieldName">Nomanclaure of Degree :</div>
              <div>{this.state.pgnomanclaure}</div>
            </div>

            <div className="field">
              <div className="fieldName">Marks Obtained :</div>
              <div>{this.state.pgmarksObtained}</div>
            </div>

            <div className="field">
              <div className="fieldName">Total Marks :</div>
              <div>{this.state.pgtotalMarks}</div>
            </div>

            <div className="field">
              <div className="fieldName">CGPA :</div>
              <div>{this.state.pgcgpa}</div>
            </div>

            <div className="field">
              <div className="fieldName">Percentage :</div>
              <div>{this.state.pgpercentage}</div>
            </div>

            {/*Verify + Remark Start*/}
            <Divider sx={{ marginTop: "5px", marginBottom: "7px" }} />
            <div className="field">
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
                            value="Pending"
                            name="academicsPGStatus"
                            checked={this.state.academicsPGStatus === "Pending"}
                            onChange={this.onChangeVerify}
                            className="radio"
                          />
                          Pending
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Modification-Required"
                            name="academicsPGStatus"
                            checked={
                              this.state.academicsPGStatus ===
                              "Modification-Required"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          Modification-Required
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Verified"
                            name="academicsPGStatus"
                            checked={
                              this.state.academicsPGStatus === "Verified"
                            }
                            onChange={this.onChangeVerify}
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
            {/* Verify + Remark end */}
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          <div className="title"> Entrance Exam Details</div>
          <div style={{ alignItems: "left", textAlign: "left" }}>
            {this.state.isInterestedCoepRPET && (
              <div className="field">
                <div className="fieldName">
                  Want to appear for COEP's Reasearch Program Eligibility Test
                  (RPET)
                </div>
              </div>
            )}
            {this.state.givenGate && (
              <div className="field">
                <div className="fieldName">Gate</div>
                <div>
                  <div>{this.state.gateScore}</div>
                  <div>{this.state.gateDate}</div>
                </div>
              </div>
            )}
            {this.state.isInterestedCoepEntrance && (
              <div className="field">
                <div className="fieldName">
                  Want to appear for COEP entrance exam
                </div>
              </div>
            )}
            {this.state.givenPet && (
              <div className="field">
                <div className="fieldName">SPPU ET 2021</div>
                <div>
                  <div>{this.state.petDetails}</div>
                  <div>{this.state.petYear}</div>
                </div>
              </div>
            )}

            {/*Verify + Remark Start*/}
            <Divider sx={{ marginTop: "5px", marginBottom: "7px" }} />
            <div className="field">
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
                            value="Pending"
                            name="entranceDetailsStatus"
                            checked={
                              this.state.entranceDetailsStatus === "Pending"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />
                          Pending
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Modification-Required"
                            name="entranceDetailsStatus"
                            checked={
                              this.state.entranceDetailsStatus ===
                              "Modification-Required"
                            }
                            onChange={this.onChangeVerify}
                            className="radio"
                          />{" "}
                          Modification-Required
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Verified"
                            name="entranceDetailsStatus"
                            checked={
                              this.state.entranceDetailsStatus === "Verified"
                            }
                            onChange={this.onChangeVerify}
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
            {/* Verify + Remark end */}
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          <div className="title">Documents Uploaded</div>

          <div style={{ alignItems: "left", textAlign: "left" }}>
            <div className="field">
              <div className="documents">
                <div className="docFieldName">Photo :</div>
                <div className="iconMobile">
                  <div>photo.png</div>
                  <div>
                    <ArrowCircleDown />
                  </div>
                </div>
              </div>
              <div className="icon">
                <div>
                  <VerificationComponent />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="documents">
                <div className="docFieldName">Signature :</div>
                <div className="iconMobile">
                  <div>signature.pdf</div>
                  <div>
                    <ArrowCircleDown />
                  </div>
                </div>
              </div>
              <div className="icon">
                <div>
                  <VerificationComponent />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="documents">
                <div className="docFieldName">UG Marksheet :</div>
                <div className="iconMobile">
                  <div>ugMarksheet</div>
                  <div>
                    <ArrowCircleDown />
                  </div>
                </div>
              </div>
              <div className="icon">
                <div>
                  <VerificationComponent />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="documents">
                <div className="docFieldName">PG Marksheet :</div>
                <div className="iconMobile">
                  <div>pgMarksheet</div>
                  <div>
                    <ArrowCircleDown />
                  </div>
                </div>
              </div>
              <div className="icon">
                <div>
                  <VerificationComponent />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="documents">
                <div className="docFieldName">Caste Validity :</div>
                <div className="iconMobile">
                  <div>casteValidity</div>
                  <div>
                    <ArrowCircleDown />
                  </div>
                </div>
              </div>
              <div className="icon">
                <div>
                  <VerificationComponent />
                </div>
              </div>
            </div>

            <div className="field">
              <div className="documents">
                <div className="docFieldName">Caste Certificate :</div>
                <div className="iconMobile">
                  <div>casteCertificate</div>
                  <div>
                    <ArrowCircleDown />
                  </div>
                </div>
              </div>
              <div className="icon">
                <div>
                  <VerificationComponent />
                </div>
              </div>
            </div>
          </div>

          <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

          <TextField
            onChange={this.handleChange}
            value={this.state.message}
            variant="outlined"
            multiline
            minRows={3}
            type="text"
            name="message"
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
