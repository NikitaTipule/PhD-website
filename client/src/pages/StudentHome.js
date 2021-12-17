import { React, Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavBar from "../components/Navbar/Navbar";
import { Button } from "@material-ui/core";
import PersonalDetails from "../components/Form/PersonalDetails";
import { Link } from "react-router-dom";
import "../CSS/studentHome.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Sidebar from "../components/Sidebar";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
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
});

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            let docver = "verified";
            res.data.user.documentsUploaded.map(
              (status) =>
                // docrem=status.remarks.length?status.remarks:"None"
                //console.log(status.verification)
                (docver = status.verification === "pending" ? "pending" : "")
            );
            this.setState({
              pdfName: res.data.user.personalInfo.name,
              pdfEmail: res.data.user.personalInfo.email,
              middleName: res.data.user.personalInfo.middleName,
              gender: res.data.user.personalInfo.gender,
              category: res.data.user.personalInfo.category,
              physicallyDisabled: res.data.user.personalInfo.physicallyDisabled,
              dob: res.data.user.personalInfo.dob,
              mobile: res.data.user.personalInfo.mobile,
              cgpaUG: res.data.user.academicsUG.cgpa10,
              degreeUG: res.data.user.academicsUG.degree,
              instituteUG: res.data.user.academicsUG.institute,
              specialUG: res.data.user.academicsUG.specialization,
              cgpaPG: res.data.user.academicsPG.cgpa10,
              degreePG: res.data.user.academicsPG.degree,
              institutePG: res.data.user.academicsPG.institute,
              percentPG: res.data.user.academicsPG.percentageMarks,
              scoreGATE: res.data.user.entranceDetails.Gate.score,
              name: res.data.user.name,
              email: res.data.user.email,
              mis: res.data.user.mis,
              PGverification: res.data.user.academicsPG.verification,
              PGremarks: res.data.user.academicsPG.remarks,
              UGverification: res.data.user.academicsUG.verification,
              UGremarks: res.data.user.academicsUG.remarks,
              DOCverification: docver,
              DOCremarks: "None",
              ENTverification: res.data.user.entranceDetails.verification,
              ENTremarks: res.data.user.entranceDetails.remarks,
              FEEverification: res.data.user.feeDetails.verification,
              FEEremarks: res.data.user.feeDetails.remarks,
              PIverification: res.data.user.personalInfo.verification,
              PIremarks: res.data.user.personalInfo.remarks,
            });
            console.log(res);
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
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Personal Details</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Candidate's Full name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.pdfName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Father's Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.middleName}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Mail id</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.email}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Gender</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.gender}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Category</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.category}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Physically Disabled?</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.physicallyDisabled}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date of Birth</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.dob}</Text>
              </View>
              <View style={styles.tableCol}>
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
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>CGPA</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.cgpaUG}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Degree</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.degreeUG}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Institute</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.instituteUG}</Text>
              </View>
              <View style={styles.tableCol}>
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
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>CGPA</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.cgpaPG}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Degree</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.degreePG}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Institute</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{this.state.institutePG}</Text>
              </View>
              <View style={styles.tableCol}>
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
              <View style={styles.tableCol}>
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
        </Page>
      </Document>
    );
    return (
      <div>
        <NavBar loggedin={true} />

        <div className="container">
          <Sidebar user="Candidate" />
          <div>
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
                      Nikita Sopan Tipule
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="grid-item">
                    <p style={{ fontSize: "20px" }}>
                      <b style={{ fontWeight: 600 }}>Email : </b>
                      {"   "}
                      student@gamil.com
                    </p>
                  </Grid>
                </Grid>
              </div>
            </div>

            {/* <div  style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:"30px"}}>
                      <Link to ={{pathname: '/admissionform'}}>
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
                            Fill  Application  Form
                        </button>
                        </Link>
                    </div> */}
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
            <div class="container-verification">
              <ul class="responsive-table">
                <li class="table-header">
                  <div class="col col-2">
                    <b>Field</b>
                  </div>
                  <div class="col col-3">
                    <b>Remarks</b>
                  </div>
                  <div class="col col-4">
                    <b>Status</b>
                  </div>
                </li>
                <li class="table-row">
                  <div class="col col-2" data-label="Customer Name">
                    Academics PG
                  </div>
                  <div class="col col-3" data-label="Amount">
                    {this.state.PGremarks.length
                      ? this.state.PGremarks
                      : "None"}
                  </div>
                  <div
                    class="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.PGverification}
                  </div>
                </li>
                <li class="table-row">
                  <div class="col col-2" data-label="Customer Name">
                    Academics UG
                  </div>
                  <div class="col col-3" data-label="Amount">
                    {this.state.UGremarks.length
                      ? this.state.UGremarks
                      : "None"}
                  </div>
                  <div
                    class="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.UGverification}
                  </div>
                </li>
                <li class="table-row">
                  <div class="col col-2" data-label="Customer Name">
                    Document Upload
                  </div>
                  <div class="col col-3" data-label="Amount">
                    {this.state.DOCremarks}
                  </div>
                  <div
                    class="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.DOCverification.length
                      ? this.state.DOCverification
                      : "verified"}
                  </div>
                </li>
                <li class="table-row">
                  <div class="col col-2" data-label="Customer Name">
                    Entrance Details
                  </div>
                  <div class="col col-3" data-label="Amount">
                    {this.state.ENTremarks.length
                      ? this.state.ENTremarks
                      : "None"}
                  </div>
                  <div
                    class="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.ENTverification}
                  </div>
                </li>
                <li class="table-row">
                  <div class="col col-2" data-label="Customer Name">
                    Fee Details
                  </div>
                  <div class="col col-3" data-label="Amount">
                    {this.state.FEEremarks.length
                      ? this.state.FEEremarks
                      : "None"}
                  </div>
                  <div
                    class="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.FEEverification}
                  </div>
                </li>
                <li class="table-row">
                  <div class="col col-2" data-label="Customer Name">
                    Personal Info
                  </div>
                  <div class="col col-3" data-label="Amount">
                    {this.state.PIremarks.length
                      ? this.state.PIremarks
                      : "None"}
                  </div>
                  <div
                    class="col col-4"
                    data-label="Payment Status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {this.state.PIverification}
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

export default StudentHome;
