import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import Button from "@mui/material/Button";
import "./DisplayData.css";
import { TextField } from "@mui/material";
import { Redirect } from "react-router";
import { BACKEND_URL } from "../config";
import axios from "axios";

class VerificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: "",
    };
  }

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
                checked={this.state.verify === "Pending"}
                onChange={this.onChangeGender}
                className="radio"
              />
              Pending
            </div>
            <div>
              <input
                type="radio"
                value="Modification-Required"
                name="verify"
                checked={this.state.verify === "Modification-Required"}
                onChange={this.onChangeGender}
                className="radio"
              />{" "}
              Modification-Required
            </div>
            <div>
              <input
                type="radio"
                value="Verified"
                name="verify"
                checked={this.state.verify === "Verified"}
                onChange={this.onChangeGender}
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

class DisplayData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},

      message: "",
      redirect: false,
      token: "",
      verification: "",
    };
  }

  async componentDidMount() {
    console.log(this.props.id);
    if (localStorage.getItem("phd-website-jwt")) {
      await this.setState({
        token: localStorage.getItem("phd-website-jwt"),
      });
      try {
        axios
          .get(BACKEND_URL + "/students/" + this.props.id, {
            headers: { "phd-website-jwt": this.state.token },
          })
          .then((res) => {
            console.log(res.data);
            const details = res.data.user;
            this.setState({
              name: res.data.user.name,
              middleName: res.data.user.middleName,
              gender: res.data.user.gender,
              dob: res.data.user.personalInfo.dob,
              email: res.data.user.email,
              mobile: res.data.user.personalInfo.mobile,
              nationality: res.data.user.personalInfo.nationality,
              category: res.data.user.personalInfo.category,
              aadhar: res.data.user.personalInfo.aadhar,
              address: res.data.user.personalInfo.adressPermenant,
              physicallyDisabled: res.data.user.personalInfo.physicalDisability,
              department: res.data.user.personalInfo.department,

              university: res.data.user.academicsUG.institute,
              nomanclaure: res.data.user.academicsUG.degree,
              specialization: res.data.user.academicsUG.specialization,
              marksObtained: res.data.user.academicsUG.totalMarks,
              totalMarks: res.data.user.academicsUG.totalAggregate,
              cgpa: res.data.user.academicsUG.cgpa10,
              percentage: res.data.user.academicsUG.percentageMarks,
              dateOfDeclaration: res.data.user.academicsUG.dateOfDeclaration,

              pguniversity: res.data.user.academicsPG.institute,
              pgnomanclaure: res.data.user.academicsPG.degree,
              pgmarksObtained: res.data.user.academicsPG.totalMarks,
              pgtotalMarks: res.data.user.academicsPG.totalAggregate,
              pgcgpa: res.data.user.academicsPG.cgpa10,
              pgpercentage: res.data.user.academicsPG.percentageMarks,
              // optionsSelected: res.data.user.extranceDetails,

              // verification: res.data.user.verification,

              DUINumber: "DU9813891",
              amount: "1000",
              open: false,
              confirmAlert: false,

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

  render() {
    if (this.state.redirect) {
      return <Redirect to="/coordinator" />;
    }
    return (
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

          <div className="field">
            <div className="fieldName">Details Regarding Entrance Exams :</div>
            <div>
              {this.state.optionsSelected.map((str) => (
                <div style={{ padding: "0 0 0 25", fontSize: "17px" }}>
                  {str}
                </div>
              ))}
            </div>
          </div>
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

        {/* PG Details   
        <div className="title">Accounts Details</div>

        <div style={{ alignItems: "left", textAlign: "left" }}>
          <div className="field">
            <div className="fieldName">Amount Paid :</div>
            <div>{this.state.amount}/-</div>
          </div>

          <div className="field">
            <div className="fieldName">UTR/DU Number:</div>
            <div>{this.state.DUINumber}</div>
          </div>

          <div className="field">
            <div className="fieldName">Payment Receipt :</div>
            <div>casteCertificate</div>
            <div className="icon">
              <div>
                <ArrowCircleDown />
              </div>
              <div>
                <VerificationComponent />
              </div>
            </div>
          </div>
        </div> */}
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
    );
  }
}

export default DisplayData;
