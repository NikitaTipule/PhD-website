import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import { TextField, Typography } from "@material-ui/core";

const styles = (theme) => ({
  field: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "row",
    fontSize: "18px",
    alignItems: "center",
    width: "100%",
  },
  fieldName: {
    fontSize: "20px",
    fontWeight: "500",
    width: "40%",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  icon: {
    marginLeft: "10px",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
});

class VerificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      middleName: "",
      gender: "",
      dob: "",
      email: "",
      mobile: "",
    };
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <div style={{ marginTop: "4px" }}>
            <input
              type="radio"
              value="Male"
              name="gender"
              checked={this.state.gender === "Male"}
              onChange={this.onChangeGender}
              style={{ marginLeft: "20px" }}
            />
            Pending
            <input
              type="radio"
              value="Female"
              name="gender"
              checked={this.state.gender === "Female"}
              onChange={this.onChangeGender}
              style={{ marginLeft: "30px" }}
            />{" "}
            Modification-Required
            <input
              type="radio"
              value="Other"
              name="gender"
              checked={this.state.gender === "Other"}
              onChange={this.onChangeGender}
              style={{ marginLeft: "30px" }}
            />{" "}
            Verified
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
      name: "Pragati Narote",
      middleName: "Ajeetkumar",
      gender: "Female",
      dob: "11-09-2001",
      email: "pragatinarote@gmail.com",
      mobile: "8888888888",
      nationality: "Indian",
      category: "NT",
      aadhar: "8979 8798 9864",
      address: "Kalewadi, Pune",
      physicallyDisabled: "No",
      department: "Electrical",

      university: "COEP",
      nomanclaure: "BTECH",
      specialization: "Electrical",
      marksObtained: "600",
      totalMarks: "1000",
      cgpa: "8.3",
      percentage: "78",
      dateOfDeclaration: "22-09-2010",

      pguniversity: "COEP",
      pgnomanclaure: "MTech",
      pgmarksObtained: "700",
      pgtotalMarks: "1000",
      pgcgpa: "8.2",
      pgpercentage: "82",
      optionsSelected: [
        "Want to appear for COEP's Reasearch Program Eligibility Test (RPET)",
        "Gate",
        "Want to appear for COEP entrance exam",
        "SPPU ET 2021",
      ],

      DUINumber: "",
      amount: "",
      open: false,
      confirmAlert: false,
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          alignItems: "center",
          textAlign: "left",
          margin: "30px 10% 0 10%",
        }}
      >
        {/* Personal Details  */}
        <div className={classes.title}>Personal Details</div>

        <div style={{ alignItems: "left", textAlign: "left" }}>
          <div className={classes.field}>
            <div className={classes.fieldName}>Name :</div>
            <div>{this.state.name}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Father/Husband's Name :</div>
            <div>{this.state.middleName}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Gender :</div>
            <div>{this.state.gender}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>DOB :</div>
            <div>{this.state.dob.toLocaleString().slice(0, 10)}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Email :</div>
            <div>{this.state.email}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Mobile No :</div>
            <div>{this.state.mobile}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Nationality :</div>
            <div>{this.state.nationality}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Category :</div>
            <div>{this.state.category}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Aadhar Card Number :</div>
            <div>{this.state.aadhar}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Permanent Address :</div>
            <div>{this.state.address}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Physically Disable :</div>
            <div>{this.state.physicallyDisabled}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Applying to department :</div>
            <div>{this.state.department}</div>
          </div>
        </div>

        <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

        {/* UG Details  */}
        <div className={classes.title}>UG Details</div>

        <div style={{ alignItems: "left", textAlign: "left" }}>
          <div className={classes.field}>
            <div className={classes.fieldName}>University/Institute :</div>
            <div>{this.state.university}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Nomanclaure of Degree :</div>
            <div>{this.state.nomanclaure}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Specialization :</div>
            <div>{this.state.specialization}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Marks Obtained :</div>
            <div>{this.state.marksObtained}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Total Marks :</div>
            <div>{this.state.totalMarks}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>CGPA :</div>
            <div>{this.state.cgpa}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Percentage :</div>
            <div>{this.state.percentage}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Date of Declaration :</div>
            <div>{this.state.dateOfDeclaration}</div>
          </div>
        </div>

        <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />

        {/* PG Details    */}
        <div className={classes.title}>PG Details</div>

        <div style={{ alignItems: "left", textAlign: "left" }}>
          <div className={classes.field}>
            <div className={classes.fieldName}>University/Institute :</div>
            <div>{this.state.pguniversity}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Nomanclaure of Degree :</div>
            <div>{this.state.pgnomanclaure}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Marks Obtained :</div>
            <div>{this.state.pgmarksObtained}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Total Marks :</div>
            <div>{this.state.pgtotalMarks}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>CGPA :</div>
            <div>{this.state.pgcgpa}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Percentage :</div>
            <div>{this.state.pgpercentage}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>
              Details Regarding Entrance Exams :
            </div>
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

        <div className={classes.title}>Documents Uploaded</div>

        <div style={{ alignItems: "left", textAlign: "left" }}>
          <div className={classes.field}>
            <div className={classes.fieldName}>Photo :</div>
            <div>photo.png</div>
            <div className={classes.icon}>
              <div>
                <ArrowCircleDown />
              </div>
              <div>
                <VerificationComponent />
              </div>
            </div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Signature :</div>
            <div>signature.pdf</div>
            <div className={classes.icon}>
              <div>
                <ArrowCircleDown />
              </div>
              <div>
                <VerificationComponent />
              </div>
            </div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>UG Marksheet :</div>
            <div>ugMarksheet</div>
            <div className={classes.icon}>
              <div>
                <ArrowCircleDown />
              </div>
              <div>
                <VerificationComponent />
              </div>
            </div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>PG Marksheet :</div>
            <div>pgMarksheet</div>
            <div className={classes.icon}>
              <div>
                <ArrowCircleDown />
              </div>
              <div>
                <VerificationComponent />
              </div>
            </div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Caste Validity :</div>
            <div>casteValidity</div>
            <div className={classes.icon}>
              <div>
                <ArrowCircleDown />
              </div>
              <div>
                <VerificationComponent />
              </div>
            </div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Caste Certificate :</div>
            <div>casteCertificate</div>
            <div className={classes.icon}>
              <div>
                <ArrowCircleDown />
              </div>
              <div>
                <VerificationComponent />
              </div>
            </div>
          </div>
        </div>

        <Divider sx={{ marginTop: "25px", marginBottom: "10px" }} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DisplayData);
