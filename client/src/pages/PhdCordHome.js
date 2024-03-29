// import * as React from 'react';
import { React, Component } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import NavBar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import "../CSS/coHome.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Sidebar from "../components/Sidebar";
import InfoBox from "../components/InfoBox";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MobileView, BrowserView } from "react-device-detect";
import downloadApplicationPDF from "../components/ApplicationPDF";
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";

class PhdCordHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      name: "",
      email: "",
      mis: "",
      studentData: [],
      page: 0,
      rowsPerPage: 10,
      tableData: "pending",
      department: "",
      token: "",
      id: "",
      role: localStorage.getItem("phd-website-role"),
      isAllList: false,
      menu: false,
    };
  }

  async componentDidMount() {
    let id_phd = this.props.location.state?.details;
    if (id_phd) {
      this.setState({ id: id_phd });
    } else {
      this.setState({ isAllList: true });
    }

    const fetchData = () => {
      axios
        .get(BACKEND_URL + "/students/department/" + this.state.department, {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((response) => {
          this.setState({
            studentData: response.data,
          });
        })
        .catch((err) => console.log(err.message));
    };

    const token = localStorage.getItem("phd-website-jwt");
    if (token) {
      this.setState({ token: token });
      if (localStorage.getItem("phd-website-role") === "admin") {
        if (!id_phd) {
          this.setState({
            isAllList: true,
          });
          axios
            .get(BACKEND_URL + "/staff/me", {
              headers: { "phd-website-jwt": token },
            })
            .then((res) => {
              this.setState({
                name: res.data.user.name,
                email: res.data.user.email,
                mis: res.data.user.mis,
                department: "all",
              });
              fetchData();
            })
            .catch((err) => console.log(err.message));
        } else {
          axios
            .get(BACKEND_URL + "/phdCords/" + id_phd, {
              headers: { "phd-website-jwt": token },
            })
            .then((res) => {
              this.setState({
                name: res.data.user.name,
                email: res.data.user.email,
                mis: res.data.user.mis,
                department: res.data.user.department,
              });
              fetchData();
            })
            .catch((error) => console.log(error.message));
        }
      } else {
        axios
          .get(BACKEND_URL + "/staff/me", {
            headers: { "phd-website-jwt": token },
          })
          .then((res) => {
            this.setState({
              name: res.data.user.name,
              email: res.data.user.email,
              mis: res.data.user.mis,
              department: res.data.user.department,
            });
            fetchData();
          })
          .catch((error) => console.log(error.message));
      }
    }
  }

  upperColumns = [
    { id: "id", label: "Total Candidates" },
    { id: "verified", label: "Verified" },
    { id: "not_verified", label: "Not Verified" },
    { id: "Modification needed", label: "Modification Needed" },
  ];

  columns = [
    { id: "id", label: "No.", minWidth: 30 },
    { id: "name", label: "Name", minWidth: 120 },
    { id: "mobile", label: "Mobile No", minWidth: 40 },
    { id: "infoVerified", label: "Verification Status", minWidth: 70 },
    {
      id: "feeDetails.verification",
      label: "Fee Details",
      minWidth: 70,
    },
    { id: "iconDA", label: "Download Application", minWidth: 30 },
    { id: "icon", label: "", minWidth: 30 },
  ];

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: +event.target.value,
      page: 0,
    });
  };

  handleclick1 = (event) => {
    this.setState({
      tableData: "all",
    });
  };

  handleclick2 = (event) => {
    this.setState({
      tableData: "verified",
    });
  };

  handleclick3 = (event) => {
    this.setState({
      tableData: "pending",
    });
  };

  handleclick4 = (event) => {
    this.setState({
      tableData: "mod_req",
    });
  };

  oncellClick(id) {
    this.props.history.push({
      pathname: "/coform",
      // search: `/${id}`,
      state: { details: id, cordId: this.state.id },
    });
  }

  exportToExcel = () => {
    const otherData = [];
    this.state.studentData.forEach((student) => {
      const {
        name,
        email,
        mobile,
        personalInfo,
        academicsUG,
        academicsPG,
        entranceDetails,
        feeDetails,
        applicationId,
      } = student;

      const pg = {
        pg_degree: academicsPG?.degree || "",
        pg_branch: academicsPG?.branch || "",
        pg_specialization: academicsPG?.specialization || "",
        pg_institute: academicsPG?.institute || "",
        pg_percentageMarks: academicsPG?.percentageMarks || "",
        pg_cgpa: academicsPG?.cgpa10 || "",
      };
      const ug = {
        ug_institute: academicsUG?.institute || "",
        ug_degree: academicsUG?.degree || "",
        ug_specialization: academicsUG?.specialization || "",
        ug_cgpa: academicsUG?.cgpa10 || "",
        ug_percentageMarks: academicsUG?.percentageMarks || "",
        ug_dateOfDeclaration: academicsUG?.dateOfDeclaration || "",
      };

      const sheetEntranceDetails = {
        givenGate: entranceDetails?.givenGate || "",
        isInterestedCoepRPET: entranceDetails?.isInterestedCoepRPET || "",
        gate_discipline: entranceDetails?.Gate?.discipline || "",
        gate_category: entranceDetails?.Gate?.category || "",
        gate_score: entranceDetails?.Gate?.score || "",
        gate_marks: entranceDetails?.Gate?.marks || "",
        gate_lastDateOfValidation:
          entranceDetails?.Gate?.lastDateOfValidation || "",
        gateQualified: entranceDetails?.Gate?.gateQualified || "",
      };

      const sheetPersonalInfo = {
        nameInForm: personalInfo?.name || "",
        middleName: personalInfo?.middleName || "",
        gender: personalInfo?.gender || "",
        motherName: personalInfo?.motherName || "",
        nationality: personalInfo?.nationality || "",
        category: personalInfo?.category || "",
        aadhar: personalInfo?.aadhar || "",
        dob: personalInfo?.dob || "",
        ageYears: personalInfo?.ageYears || "",
        physicallyDisabled: personalInfo?.physicallyDisabled || "",
        employed: personalInfo?.employed || "",
        domicile: personalInfo?.domicile || "",
        department: personalInfo?.department || "",
        address: personalInfo?.address || "",
        adressCorrespondance: personalInfo?.adressCorrespondance || "",
      };
      const sheetFeeDetails = {
        fee_details: feeDetails.verification,
      };

      otherData.push({
        applicationId,
        name,
        email,
        mobile,
        ...sheetPersonalInfo,
        ...ug,
        ...pg,
        ...sheetEntranceDetails,
        ...sheetFeeDetails,
      });
    });

    const XLSX = require("xlsx");
    const workSheet = XLSX.utils.json_to_sheet(otherData);
    workSheet["!cols"] = [
      { wch: 30 },
      { wch: 30 },
      { wch: 25 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 20 },
      { wch: 40 },
      { wch: 5 },
      { wch: 20 },
      { wch: 10 },
      { wch: 30 },
      { wch: 5 },
      { wch: 25 },
      { wch: 15 },
      { wch: 30 },
      { wch: 5 },
      { wch: 25 },
      { wch: 10 },
      { wch: 10 },
      { wch: 5 },
      { wch: 15 },
      { wch: 30 },
      { wch: 5 },
      { wch: 15 },
      { wch: 5 },
      { wch: 5 },
      { wch: 15 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
    ];
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Students Data");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    const dept = this.state.department || "all";
    XLSX.writeFile(workBook, `Students-Data-${dept}.xlsx`);
  };

  render() {
    let counterTotal = 0;
    let counterVerified = 0;
    let counterNotVerified = 0;
    let counterModification = 0;
    let count = 0;
    for (let i = 0; i < this.state.studentData.length; i++) {
      counterTotal++;
      if (this.state.studentData[i].infoVerified === "verified") {
        counterVerified++;
      } else if (this.state.studentData[i].infoVerified === "pending") {
        counterNotVerified++;
      } else if (this.state.studentData[i].infoVerified === "mod_req") {
        counterModification++;
      }
    }

    return (
      <>
        <NavBar loggedin={true} />
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
            {this.state.menu && (
              <Sidebar
                className="mob"
                user={this.state.role === "admin" ? "Admin" : "Coordinator"}
              />
            )}
          </MobileView>
          <BrowserView>
            {!this.state.menu && (
              <Sidebar
                className="mob"
                user={this.state.role === "admin" ? "Admin" : "Coordinator"}
              />
            )}
          </BrowserView>
          <div>
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {this.state.isAllList ? (
                    <h1 className="textBetween">All Candidates List</h1>
                  ) : (
                    <h1 className="textBetween">Co-Ordinator Information</h1>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {!this.state.isAllList && (
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
                        <Grid item xs={12} md={6} className="grid-item">
                          <p style={{ fontSize: "20px" }}>
                            <b style={{ fontWeight: 600 }}>Mis : </b>
                            {"   "}
                            {this.state.mis}
                          </p>
                        </Grid>
                        <Grid item xs={12} md={6} className="grid-item">
                          <p style={{ fontSize: "20px" }}>
                            <b style={{ fontWeight: 600 }}>Department: </b>
                            {"   "}
                            {this.state.department}
                          </p>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "15px",
                  width: "100%",
                }}
              >
                <Button
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/student-stats",
                      state: { department: this.state.department },
                    });
                  }}
                  style={{
                    height: "40px",
                  }}
                  variant="contained"
                >
                  Incomplete Applications
                </Button>
              </div>
              <div className="info">
                <div
                  onClick={() => {
                    this.handleclick1();
                  }}
                >
                  <InfoBox
                    count={counterTotal}
                    tag="Total Candidates"
                    bgcolor="#24B08B"
                  />
                </div>
                <div
                  onClick={() => {
                    this.handleclick2();
                  }}
                >
                  <InfoBox
                    count={counterVerified}
                    tag="Verified"
                    bgcolor="#12CC2A"
                  />
                </div>
                <div
                  onClick={() => {
                    this.handleclick3();
                  }}
                >
                  <InfoBox
                    count={counterNotVerified}
                    tag="Not Verified"
                    bgcolor="#F9463E"
                  />
                </div>
                <div
                  onClick={() => {
                    this.handleclick4();
                  }}
                >
                  <InfoBox
                    count={counterModification}
                    tag="Modification"
                    bgcolor="#3E56F9"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "30px",
                  marginBottom: "50px",
                }}
              >
                <Paper
                  sx={{
                    width: "80vw",
                    "@media screen and (min-width: 1285px)": { width: "80vm" },
                    overflow: "hidden",
                  }}
                >
                  <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {this.columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align="center"
                              style={{
                                minWidth: column.minWidth,
                                backgroundColor: "ButtonHighlight",
                                color: "black",
                              }}
                            >
                              {column.label !== "" ? (
                                column.label
                              ) : (
                                <div onClick={() => this.exportToExcel()}>
                                  <CloudDownloadTwoToneIcon
                                    cursor={"pointer"}
                                  />
                                </div>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.studentData
                          .filter(
                            (student) =>
                              this.state.tableData === "all" ||
                              student.infoVerified === this.state.tableData
                          )
                          .slice(
                            this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage +
                              this.state.rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                                value={row.name}
                              >
                                {this.columns.map((column) => {
                                  const value = row[column.id];

                                  return (
                                    <TableCell key={column.id} align="center">
                                      {column.id === "infoVerified" ? (
                                        <div>
                                          {value === "verified" ? (
                                            <div style={{ color: "green" }}>
                                              {value}
                                            </div>
                                          ) : (
                                            <div>
                                              {value === "pending" ? (
                                                <div style={{ color: "red" }}>
                                                  {value}
                                                </div>
                                              ) : (
                                                <div style={{ color: "blue" }}>
                                                  Modification Required
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div>
                                          {column.id === "id" ? (
                                            <div>{++count}</div>
                                          ) : (
                                            <div>
                                              {column.id === "iconDA" ? (
                                                <div
                                                  onClick={() =>
                                                    downloadApplicationPDF(
                                                      row["_id"],
                                                      this.state.token
                                                    )
                                                  }
                                                >
                                                  <DownloadIcon
                                                    cursor={"pointer"}
                                                  />
                                                </div>
                                              ) : (
                                                <div>
                                                  {column.id ===
                                                  "feeDetails.verification" ? (
                                                    <div>
                                                      {row.feeDetails
                                                        .verification ===
                                                      "verified" ? (
                                                        <div
                                                          style={{
                                                            color: "green",
                                                          }}
                                                        >
                                                          {
                                                            row.feeDetails
                                                              .verification
                                                          }
                                                        </div>
                                                      ) : (
                                                        <div>
                                                          {row.feeDetails
                                                            .verification ===
                                                          "pending" ? (
                                                            <div
                                                              style={{
                                                                color: "red",
                                                              }}
                                                            >
                                                              {
                                                                row.feeDetails
                                                                  .verification
                                                              }
                                                            </div>
                                                          ) : (
                                                            <div
                                                              style={{
                                                                color: "blue",
                                                              }}
                                                            >
                                                              Modification
                                                              Required
                                                            </div>
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>
                                                  ) : (
                                                    <div
                                                      onClick={() => {
                                                        this.oncellClick(
                                                          row._id
                                                        );
                                                      }}
                                                    >
                                                      <Link
                                                        to={{
                                                          pathname: "/coform",
                                                        }}
                                                        style={{
                                                          textDecoration:
                                                            "none",
                                                          color: "black",
                                                        }}
                                                      >
                                                        {value}
                                                      </Link>
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={this.state.studentData.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PhdCordHome;
