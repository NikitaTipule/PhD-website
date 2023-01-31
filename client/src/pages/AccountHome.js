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
// import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import "../CSS/coHome.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Sidebar from "../components/Sidebar";
import InfoBox from "../components/InfoBox";
import { Typography } from "@material-ui/core";
import DropDown from "react-dropdown";
import AccountForm from "./AccountForm";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MobileView, BrowserView } from "react-device-detect";
import { departmentNamesList } from "../phdAdmDetails";

class AccountHomeNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mis: "",
      studentData: [],
      allStudents: [],
      logout: false,
      page: 0,
      rowsPerPage: 10,
      tableData: "pending",
      loading: true,
      success: false,
      department: "",
      token: "",
      length: 0,
      flag: true,
      id: "",
      selectedStudent: -1,
      menu: false,
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("phd-website-jwt")) {
      await this.setState({
        token: localStorage.getItem("phd-website-jwt"),
      });
      try {
        axios
          .get(BACKEND_URL + "/staff/me", {
            headers: { "phd-website-jwt": this.state.token },
          })
          .then((res) => {
            this.setState({
              name: res.data.user.name,
              email: res.data.user.email,
            });
          });
      } catch (error) {
        console.log(error.message);
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
    {
      id: "feeDetails['verification']",
      label: "Verification Status",
      minWidth: 70,
    },
    { id: "icon", label: "", minwidth: 70 },
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

  onChangeDepartment = (event) => {
    let dept = event.value;
    if (dept) {
      if (localStorage.getItem("phd-website-jwt")) {
        this.setState({
          token: localStorage.getItem("phd-website-jwt"),
        });
        try {
          axios
            .get(BACKEND_URL + "/students/department/" + dept, {
              headers: { "phd-website-jwt": this.state.token },
            })
            .then((res) => {
              this.setState({
                allStudents: res.data.map((s, i) => {
                  s.index = i;
                  return s;
                }),
                length: res.data.length,
              });
            });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    this.setState({
      department: event.value,
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

  updateStudent = (verification, remarks, index) => {
    const allStudents = this.state.allStudents;
    allStudents[index].feeDetails.verification = verification;
    allStudents[index].feeDetails.remarks = remarks;
    this.setState({
      allStudents: allStudents,
      selectedStudent: -1,
    });
  };

  oncellClick(row) {
    // this.props.history.push({
    //   pathname: "/accountform",
    //   // search: `/${id}`,
    //   state: { details: id, cordId: this.state.id },
    // });

    this.setState({
      selectedStudent: row.index,
    });
  }

  exportToExcel = () => {
    const otherData = [];
    this.state.allStudents.forEach((student) => {
      const { personalInfo, name, feeDetails } = student;
      const { docUploaded, ...otherDetails } = feeDetails;
      const { category } = personalInfo;
      otherData.push({ name, category, ...otherDetails });
    });
    const XLSX = require("xlsx");
    const workSheet = XLSX.utils.json_to_sheet(otherData);
    workSheet["!cols"] = [
      { wch: 40 },
      { wch: 10 },
      { wch: 20 },
      { wch: 10 },
      { wch: 25 },
      { wch: 30 },
      { wch: 10 },
      { wch: 10 },
    ];
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Students Data");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Students Data.xlsx");
  };

  render() {
    let counterTotal = 0;
    let counterVerified = 0;
    let counterNotVerified = 0;
    let counterModification = 0;
    let count = 0;
    // let data = {};
    // let vStatus = "verified";
    // let rem = "";
    if (this.state.department !== "") {
      for (let i = 0; i < this.state.length; i++) {
        counterTotal++;
        if (this.state.allStudents[i].feeDetails.verification === "verified") {
          counterVerified++;
        } else if (
          this.state.allStudents[i].feeDetails.verification === "pending"
        ) {
          counterNotVerified++;
        } else if (
          this.state.allStudents[i].feeDetails.verification === "mod_req"
        ) {
          counterModification++;
        }
      }
    }
    if (this.state.selectedStudent !== -1) {
      return (
        <AccountForm
          student={this.state.allStudents[this.state.selectedStudent]}
          updateStudent={this.updateStudent}
        />
      );
    } else {
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
              {this.state.menu && <Sidebar className="mob" user="Account" />}
            </MobileView>
            <BrowserView>
              {!this.state.menu && <Sidebar className="mob" user="Account" />}
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
                    <h1 className="textBetween">
                      Account Section Co-Ordinator Information
                    </h1>
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
                        {/* <Grid item xs={12} md={6} className="grid-item">
                          <p style={{ fontSize: "20px" }}>
                            <b style={{ fontWeight: 600 }}>Mis : </b>
                            {"   "}
                            {this.state.mis}
                          </p>
                        </Grid> */}
                        <Grid item xs={12} md={6} className="grid-item">
                          <p style={{ fontSize: "20px" }}>
                            <b style={{ fontWeight: 600 }}>Department: </b>
                            {"   "}
                            All
                          </p>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                {/* <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom: '0px', marginTop: '20px'}}>
                <h1 className="textBetween">
                  List of All Students
                </h1>
                </div> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "50px",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      marginLeft: "4%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <Typography
                      style={{ marginBottom: "13px", paddingRight: "50px" }}
                    >
                      Department
                    </Typography>
                    <DropDown
                      options={[...departmentNamesList, "all"]}
                      onChange={this.onChangeDepartment}
                      value={this.state.department}
                      placeholder="Select Department"
                      style={{
                        width: "100px",
                      }}
                    />
                  </div>
                </div>
                \
                {this.state.department === "" ? (
                  ""
                ) : (
                  <>
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
                          width: "100%",
                          "@media screen and (min-width: 40em)": {
                            width: "80%",
                          },
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
                              {this.state.allStudents
                                .filter(
                                  (student) =>
                                    this.state.tableData === "all" ||
                                    student.feeDetails.verification ===
                                      this.state.tableData
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
                                      onClick={() => {
                                        this.oncellClick(row);
                                      }}
                                    >
                                      {this.columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                          <TableCell
                                            key={column.id}
                                            align="center"
                                          >
                                            {column.id ===
                                            "feeDetails['verification']" ? (
                                              <div>
                                                {column.id ===
                                                  "feeDetails['verification']" &&
                                                row.feeDetails.verification ===
                                                  "verified" ? (
                                                  <div
                                                    style={{ color: "green" }}
                                                  >
                                                    {
                                                      row.feeDetails
                                                        .verification
                                                    }
                                                  </div>
                                                ) : (
                                                  <div>
                                                    {column.id ===
                                                      "feeDetails['verification']" &&
                                                    row.feeDetails
                                                      .verification ===
                                                      "pending" ? (
                                                      <div
                                                        style={{ color: "red" }}
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
                                                  <div>{value}</div>
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
                          count={this.state.length}
                          rowsPerPage={this.state.rowsPerPage}
                          page={this.state.page}
                          onPageChange={this.handleChangePage}
                          onRowsPerPageChange={this.handleChangeRowsPerPage}
                        />
                      </Paper>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default AccountHomeNew;
