import { React, Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavBar from "../components/Navbar/Navbar";
import "../CSS/studentHome.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Sidebar from "../components/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { withRouter } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import downloadApplicationPDF from "../components/ApplicationPDF";

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      name: "",
      email: "",
      pdfName: "",
      pdfEmail: "",
      middleName: "",
      gender: "",
      PGverification: "",
      PGremarks: "",
      UGverification: "",
      UGremarks: "",
      DOCverification: "",
      DOCremarks: "",
      ENTverification: "",
      ENTremarks: "",
      FEEverification: "",
      FEEremarks: "",
      PIverification: "",
      PIremarks: "",
      appId: null,
      isInterestedCoepRPET: false,
      isInterestedCoepEntrance: false,
      givenGate: false,
      givenPet: false,
      gateDiscipline: "",
      gateCategory: "",
      gateScore: "",
      gateLastDateOfValidation: "",
      petDetails: "",
      petYear: "",
      full_completed: false,
      editable: true,
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("phd-website-jwt")) {
      await this.setState({
        token: localStorage.getItem("phd-website-jwt"),
      });
      try {
        axios
          .get(BACKEND_URL + "/students/me", {
            headers: { "phd-website-jwt": this.state.token },
          })
          .then((res) => {
            const user = res.data.user;
            //console.log(user);
            // Get the verification status of documents
            let dv = 0,
              dp = 0,
              dm = 0;
            this.setState({ docVerification: "pending" });
            user.documentsUploaded.forEach((doc) => {
              if (doc.verification === "mod_req") {
                dm = dm + 1;
              } else if (doc.verification === "pending") {
                dp = dp + 1;
              } else {
                dv = dv + 1;
              }
            });
            if (dm > 0) {
              this.setState({ docVerification: "mod_req" });
            } else if (dp === 0 && dm === 0) {
              this.setState({ docVerification: "verified" });
            }
            if (user.documentsUploaded.length === 0) {
              this.setState({ docVerification: "pending" });
            }

            if (
              user.personalInfo.completed &&
              user.academicsUG.completed &&
              user.academicsPG.completed &&
              user.entranceDetails.completed &&
              user.feeDetails.completed
            ) {
              this.setState({ full_completed: true });
            }
            //console.log("Full completed: ",this.state.full_completed)
            this.setState({
              pdfName: user.personalInfo.name,
              pdfEmail: user.personalInfo.email,
              appId: user.applicationId ? user.applicationId : null,
              aadhar: user.personalInfo.aadhar,
              middleName: user.personalInfo.middleName,
              gender: user.personalInfo.gender,
              category: user.personalInfo.category,
              physicallyDisabled: user.personalInfo.physicallyDisabled,
              dob: user.personalInfo.dob
                ? user.personalInfo.dob.slice(0, 10)
                : user.personalInfo.dob,
              mobile: user.mobile,
              cgpaUG: user.academicsUG.cgpa10,
              percentUG: user.academicsUG.percentageMarks,
              degreeUG: user.academicsUG.degree,
              instituteUG: user.academicsUG.institute,
              specialUG: user.academicsUG.specialization,
              specialPG: user.academicsPG.specialization,
              cgpaPG: user.academicsPG.cgpa10,
              degreePG: user.academicsPG.degree,
              institutePG: user.academicsPG.institute,
              percentPG: user.academicsPG.percentageMarks,
              scoreGATE: user.entranceDetails?.Gate?.score,
              name: user.name,
              email: user.email,
              mis: user.mis,
              isInterestedCoepRPET: user.entranceDetails?.isInterestedCoepRPET,
              isInterestedCoepEntrance:
                user.entranceDetails?.isInterestedCoepEntrance,
              PGverification: user.academicsPG.verification,
              PGremarks: user.academicsPG.remarks,
              UGverification: user.academicsUG.verification,
              UGremarks: user.academicsUG.remarks,
              DOCremarks: "None",
              ENTverification: user.entranceDetails.verification,
              ENTremarks: user.entranceDetails.remarks,
              FEEverification: user.feeDetails.verification,
              FEEremarks: user.feeDetails.remarks,
              PIverification: user.personalInfo.verification,
              PIremarks: user.personalInfo.remarks,
              givenGate: user.entranceDetails?.givenGate,
              givenPet: user.entranceDetails?.givenPet,
              gateDiscipline: user.entranceDetails?.Gate?.discipline,
              gateCategory: user.entranceDetails?.Gate?.category,
              gateScore: user.entranceDetails?.Gate?.score,
              gateLastDateOfValidation:
                user.entranceDetails?.Gate?.lastDateOfValidation,
              petDetails: user.entranceDetails?.sppuPet?.details,
              petYear: user.entranceDetails?.sppuPet?.year,
              editable: user.editable,
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar loggedin={true} />
        {/*         
        Sidebar
         */}
        <div className="menu">
          {!this.state.menu ? (
            <MenuIcon
              onClick={() => {
                this.setState({ menu: true });
              }}
            />
          ) : (
            <CloseIcon
              onClick={() => {
                this.setState({ menu: false });
              }}
            />
          )}
        </div>
        <div className="container">
          <MobileView>
            {this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </MobileView>
          <BrowserView>
            {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
          </BrowserView>
          <div style={{ width: "100%", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 className="textBetween">Student Information</h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="box">
                <Grid container className="container-box">
                  <Grid item xs={12} md={6} className="grid-item">
                    <p style={{ fontSize: "20px" }}>
                      <b style={{ fontWeight: 600 }}>Name : </b>
                      {"   "}
                      {this.state.name}
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="grid-item">
                    <p style={{ fontSize: "20px" }}>
                      <b style={{ fontWeight: 600 }}>Email : </b>
                      {"   "}
                      {this.state.email}
                    </p>
                  </Grid>
                  {this.state.appId ? (
                    <Grid item xs={12} md={6} className="grid-item">
                      <p style={{ fontSize: "20px" }}>
                        <b style={{ fontWeight: 600 }}>Application ID : </b>
                        {"   "}
                        {this.state.appId}
                      </p>
                    </Grid>
                  ) : (
                    ""
                  )}
                  {this.state.editable ? (
                    <Grid item xs={12} md={6} className="grid-item">
                      <p style={{ fontSize: "20px" }}>
                        <b style={{ fontWeight: 600 }}>Profile Status : </b>
                        {"   "}
                        {"Editable"}
                      </p>
                    </Grid>
                  ) : (
                    <Grid item xs={12} md={6} className="grid-item">
                      <p style={{ fontSize: "20px" }}>
                        <b style={{ fontWeight: 600 }}>Profile Status : </b>
                        {"   "}
                        {"Locked"}
                      </p>
                    </Grid>
                  )}
                </Grid>
              </div>
            </div>

            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <Link to={{ pathname: "/admissionform" }}>
                <button
                  style={{
                    // marginTop: "20px",
                    // marginBottom: "30px",
                    padding: "5px",
                    cursor: "pointer",
                    width: "300px",
                    height: "40px",
                    fontSize: "20px",
                    backgroundColor: "cadetblue",
                    color: "white",
                    borderRadius: "10px",
                  }}
                  onClick={this.FillForm}
                >
                  {" "}
                  Fill Application Form
                </button>
              </Link>
            </div> */}

            {/*
             *Download application button
             */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <button
                style={{
                  // marginTop: "20px",
                  // marginBottom: "30px",
                  padding: "5px",
                  cursor: "pointer",
                  width: "300px",
                  height: "40px",
                  fontSize: "20px",
                  backgroundColor: "cadetblue",
                  color: "white",
                  borderRadius: "10px",
                }}
                onClick={() => downloadApplicationPDF(null, this.state.token)}
              >
                Download Application
              </button>
            </div>

            {/*
             * Table for status & remark
             */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <h1 className="textBetween">Verification Status</h1>
            </div>

            <div className="container-verification">
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-2">
                    <b>Field</b>
                  </div>
                  <div className="col col-3">
                    <b>Remarks</b>
                  </div>
                  <div className="col col-4">
                    <b>Status</b>
                  </div>
                  <div className="col col-5">
                    <b>Edit</b>
                  </div>
                </li>
                <li className="table-row">
                  <div className="col col-2" data-label="Field">
                    Personal Info
                  </div>
                  <div className="col col-3" data-label="Remark">
                    {this.state.PIremarks.length
                      ? this.state.PIremarks
                      : "None"}
                  </div>
                  {this.state.PIverification === "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                    style={{ color: "red" }}
                  >
                    Modification Required
                  </div>
                  }

                  {this.state.PIverification !== "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                  >
                    {this.state.PIverification}
                  </div>
                  }
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 1 },
                      });
                    }}
                  >
                    <EditIcon
                      sx={{ color: "cadetblue" }}
                      className="editIcon"
                    />
                  </div>
                </li>
                <li className="table-row">
                  <div className="col col-2" data-label="Field">
                    Academics UG
                  </div>
                  <div className="col col-3" data-label="Remark">
                    {this.state.UGremarks.length
                      ? this.state.UGremarks
                      : "None"}
                  </div>
                  {this.state.UGverification === "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                    style={{ color: "red" }}
                  >
                    Modification Required
                  </div>
                  }

                  {this.state.UGverification !== "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                  >
                    {this.state.UGverification}
                  </div>
                  }
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 2 },
                      });
                    }}
                  >
                    <EditIcon
                      sx={{ color: "cadetblue" }}
                      className="editIcon"
                    />
                  </div>
                </li>

                <li className="table-row">
                  <div className="col col-2" data-label="Field">
                    Academics PG
                  </div>
                  <div className="col col-3" data-label="Remark">
                    {this.state.PGremarks.length
                      ? this.state.PGremarks
                      : "None"}
                  </div>
                  {this.state.PGverification === "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                    style={{ color: "red" }}
                  >
                    Modification Required
                  </div>
                  }

                  {this.state.PGverification !== "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                  >
                    {this.state.PGverification}
                  </div>
                  }
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 3 },
                      });
                    }}
                  >
                    <EditIcon
                      sx={{ color: "cadetblue" }}
                      className="editIcon"
                    />
                  </div>
                </li>

                {/* <li className="table-row">
                  <div className="col col-2" data-label="Field">
                    Document Upload
                  </div>
                  <div className="col col-3" data-label="Remark">
                    {this.state.DOCremarks}
                  </div>
                  <div
                    className="col col-4"
                    data-label="Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.docVerification === "mod_req"
                      ? "Modification Required"
                      : this.state.docVerification}
                  </div>
                  <div className="col col-5">
                    <EditIcon />
                  </div>
                </li> */}
                <li className="table-row">
                  <div className="col col-2" data-label="Field">
                    Entrance Details
                  </div>
                  <div className="col col-3" data-label="Remark">
                    {this.state.ENTremarks.length
                      ? this.state.ENTremarks
                      : "None"}
                  </div>
                  {this.state.ENTverification === "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                    style={{ color: "red" }}
                  >
                    Modification Required
                  </div>
                  }

                  {this.state.ENTverification !== "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                  >
                    {this.state.ENTverification}
                  </div>
                  }
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 4 },
                      });
                    }}
                  >
                    <EditIcon
                      sx={{ color: "cadetblue" }}
                      className="editIcon"
                    />
                  </div>
                </li>
                <li className="table-row">
                  <div className="col col-2" data-label="Field">
                    Fee Details
                  </div>
                  <div className="col col-3" data-label="Remark">
                    {this.state.FEEremarks.length
                      ? this.state.FEEremarks
                      : "None"}
                  </div>
                  {this.state.FEEverification === "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                    style={{ color: "red" }}
                  >
                    Modification Required
                  </div>
                  }

                  {this.state.FEEverification !== "mod_req" && 
                  
                  <div
                    className="col col-4"
                    data-label="Status"
                  >
                    {this.state.FEEverification}
                  </div>
                  }
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 5 },
                      });
                    }}
                  >
                    <EditIcon
                      sx={{ color: "cadetblue" }}
                      className="editIcon"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <button
                disabled={!(this.state.editable && this.state.full_completed)}
                style={{
                  // marginTop: "20px",
                  // marginBottom: "30px",
                  padding: "5px",
                  cursor: "pointer",
                  width: "300px",
                  height: "40px",
                  fontSize: "20px",
                  backgroundColor: "cadetblue",
                  color: "white",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  if (this.state.full_completed) {
                    this.props.history.push({
                      pathname: "/admissionForm",
                      state: { step: 10 },
                    });
                  } else {
                    alert("Please fill all information");
                  }
                }}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(StudentHome);
