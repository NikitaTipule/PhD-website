import { React, Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavBar from "../components/Navbar/Navbar";
import "../CSS/studentHome.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Sidebar from "../components/Sidebar";
import pic from "../images/logo1.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { withRouter } from "react-router-dom";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "100%",
    borderStyle: "solid",
    backgroundColor: "#BEBEBE",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: "25%",
    borderStyle: "solid",
    backgroundColor: "#E8E8E8",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 10,
  },
  declareHead: {
    fontSize: 11,
    marginTop: 10,
  },
  declare: {
    fontSize: 11,
  },
  place: {
    fontSize: 11,
    marginTop: 25,
  },
  date: {
    fontSize: 11,
    textAlign: "left",
  },
  sign: {
    fontSize: 11,
    textAlign: "right",
  },
  view: {
    width: "80%",
    height: "80",
    padding: 0,
    marginBottom: 5,
    backgroundColor: "white",
  },
  image: {
    objectFit: "cover",
  },
});

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
            console.log(user);
            // Get the verification status of documents
            let dv = 0,
              dp = 0,
              dm = 0;
            this.setState({ docVerification: "pending" });
            user.documentsUploaded.map((doc) => {
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

            this.setState({
              pdfName: user.personalInfo.name,
              pdfEmail: user.personalInfo.email,
              appId: user.applicationId,
              aadhar: user.personalInfo.aadhar,
              middleName: user.personalInfo.middleName,
              gender: user.personalInfo.gender,
              category: user.personalInfo.category,
              physicallyDisabled: user.personalInfo.physicallyDisabled,
              dob: user.personalInfo.dob,
              mobile: user.mobile,
              cgpaUG: user.academicsUG.cgpa10,
              degreeUG: user.academicsUG.degree,
              instituteUG: user.academicsUG.institute,
              specialUG: user.academicsUG.specialization,
              cgpaPG: user.academicsPG.cgpa10,
              degreePG: user.academicsPG.degree,
              institutePG: user.academicsPG.institute,
              percentPG: user.academicsPG.percentageMarks,
              scoreGATE: user.entranceDetails?.Gate?.score,
              name: user.name,
              email: user.email,
              mis: user.mis,
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
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  render() {
    const MyDoc = () => (
      <Document>
        <Page style={styles.body}>
          <View style={styles.view}>
            <Image style={styles.image} src={pic} alt="image" />
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Personal Details</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Candidate's Full name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.pdfName}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Father's Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.middleName}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Application ID</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.appId}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Aadhar</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.aadhar}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Mail id</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.email}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Gender</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.gender}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Category</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.category}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Physically Disabled?</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {this.state.physicallyDisabled}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Date of Birth</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.dob}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Mobile Number</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.mobile}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Academics UG</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>CGPA</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.cgpaUG}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Degree</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.degreeUG}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Institute</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.instituteUG}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Specialization</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.specialUG}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Academics PG</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>CGPA</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.cgpaPG}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Degree</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.degreePG}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Institute</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.institutePG}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Percentage Marks</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.percentPG}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Entrance Details</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Score</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.scoreGATE}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>
          </View>
          <Text style={styles.declareHead}>Declaration:</Text>
          <Text style={styles.declare}>
            I have read all the rules of admission and after understanding these
            rules, I have filled this application form for admission to phD in
            COEP for the academic year 2020-21. The information given by me in
            this application is true to the best of my knowledge and belief. At
            any later state, if it is found that I have furnished wrong
            information and/or submitted false certificate(s), I am aware that
            my admission stands cancelled and fees paid by me will be forfeited.
            Further, I will be subject to legal and/or penal action as per the
            provisions of the law.
          </Text>
          <Text style={styles.place}>Place :</Text>
          <Text style={styles.date}>Date :</Text>
          <Text style={styles.sign}>Signature of Candidate</Text>
        </Page>
      </Document>
    );

    return (
      <div>
        <NavBar loggedin={true} />

        {/*         
        Sidebar
         */}
        <div className="menu">
          {this.state.menu ? (
            <MenuIcon
              onClick={() => {
                this.setState({ menu: false });
              }}
            />
          ) : (
            <CloseIcon
              onClick={() => {
                this.setState({ menu: true });
              }}
            />
          )}
        </div>
        <div className="container">
          {!this.state.menu && <Sidebar className="mob" user="Candidate" />}
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
              <PDFDownloadLink document={<MyDoc />} fileName="Application.pdf">
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
                  Download Application
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." : "Download now!"
                  }
                </button>
              </PDFDownloadLink>
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
                  <div className="col col-2" data-label="Customer Name">
                    Academics PG
                  </div>
                  <div className="col col-3" data-label="Amount">
                    {this.state.PGremarks.length
                      ? this.state.PGremarks
                      : "None"}
                  </div>
                  <div
                    className="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.PGverification}
                  </div>
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 3, entire: "no" },
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
                  <div className="col col-2" data-label="Customer Name">
                    Academics UG
                  </div>
                  <div className="col col-3" data-label="Amount">
                    {this.state.UGremarks.length
                      ? this.state.UGremarks
                      : "None"}
                  </div>
                  <div
                    className="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.UGverification}
                  </div>
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 2, entire: "no" },
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
                  <div className="col col-2" data-label="Customer Name">
                    Document Upload
                  </div>
                  <div className="col col-3" data-label="Amount">
                    {this.state.DOCremarks}
                  </div>
                  <div
                    className="col col-4"
                    data-label="Payment Status"
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
                  <div className="col col-2" data-label="Customer Name">
                    Entrance Details
                  </div>
                  <div className="col col-3" data-label="Amount">
                    {this.state.ENTremarks.length
                      ? this.state.ENTremarks
                      : "None"}
                  </div>
                  <div
                    className="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.ENTverification}
                  </div>
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 4, entire: "no" },
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
                  <div className="col col-2" data-label="Customer Name">
                    Fee Details
                  </div>
                  <div className="col col-3" data-label="Amount">
                    {this.state.FEEremarks.length
                      ? this.state.FEEremarks
                      : "None"}
                  </div>
                  <div
                    className="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.FEEverification}
                  </div>
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 5, entire: "no" },
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
                  <div className="col col-2" data-label="Customer Name">
                    Personal Info
                  </div>
                  <div className="col col-3" data-label="Amount">
                    {this.state.PIremarks.length
                      ? this.state.PIremarks
                      : "None"}
                  </div>
                  <div
                    className="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.PIverification}
                  </div>
                  <div
                    className="col col-5 editButton"
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/admissionForm",
                        state: { step: 1, entire: "no" },
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
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(StudentHome);
