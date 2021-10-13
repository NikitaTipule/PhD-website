import React, { Component } from "react";
import NavBar from "../components/Navbar/Navbar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import NavBar from '../components/Navbar/Navbar';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DatePicker from "react-date-picker";
import DropDown from "react-dropdown";
import "react-dropdown/style.css";
import { Typography } from "@material-ui/core";
import { Button } from "bootstrap";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import axios from "axios";
import viewDoc from "./DocViewer";
import { BACKEND_URL } from "../config";

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
                // checked={this.state.verify === "Pending"}
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
                // checked={this.state.verify === "Modification-Required"}
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
                // checked={this.state.verify === "Verified"}
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

class AccountHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mis: "",
      role: "",
      department: "",
      page: 0,
      rowsPerPage: 10,
      allStudents: [],
      tableData: "pending",
      token: "",
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
            console.log(res.data);
            this.setState({
              name: res.data.user.name,
              email: res.data.user.email,
              mis: res.data.user.mis,
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
    { id: "id", label: "No.", minwidth: 20 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "status", label: "Verification Status", minWidth: 50 },
    { id: "category", label: "Category", minwidth: 50 },
    { id: "amount", label: "Amount Paid", minWidth: 50 },
    { id: "utrnumber", label: "UTR/DU Number", minWidth: 50 },
    { id: "date", label: "Date", minwidth: 50 },
    { id: "reciept", label: "Payment Reciept", minWidth: 50 },
    { id: "verification", label: "Verification", minWidth: 70 },
    { id: "remarks", label: "Remarks", minWidth: 50 },
  ];

  statusRows = [
    { id: 1, status: "Verified", totalstudents: 23 },
    { id: 2, status: "Not Verified", totalstudents: 2 },
    { id: 3, status: "Modification Required", totalstudents: 3 },
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
    // console.log(this.state.department)
    // console.log(this);
    let dept = event.value;
    console.log(dept);
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
              console.log(res.data);
              this.setState({
                allStudents: res.data,
                length: res.data.length,
              });

              // console.log(this.state.allStudents[0].feeDetails.verification)
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
      tableData: "pending",
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
      tableData: "mod-req",
    });
  };
  render() {
    const department_options = [
      "Civil Engineering",
      "Computer Engineering",
      "Electrical Engineering",
      "Electronics & Telecommunication Engineering",
      "Instrumentation & Control Engineering",
      "Mechanical Engineering",
      "Metallurgical Engineering",
      "Production Engineering",
    ];
    let counterTotal = 0;
    let counterVerified = 0;
    let counterNotVerified = 0;
    let counterModification = 0;
    let count = 0;
    if (this.state.department != "") {
      for (let i = 0; i < this.state.length; i++) {
        counterTotal++;
        if (this.state.allStudents[i].feeDetails.verification === "verified") {
          counterVerified++;
        } else if (
          this.state.allStudents[i].feeDetails.verification === "pending"
        ) {
          counterNotVerified++;
        } else if (
          this.state.allStudents[i].feeDetails.verification === "mod-req"
        ) {
          counterModification++;
        }
      }
    }

    return (
      <div>
        <NavBar loggedin={true} />
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
                  <Grid item xs={12} md={6} className="grid-item">
                    <p style={{ fontSize: "20px" }}>
                      <b style={{ fontWeight: 600 }}>Mis : </b>
                      {"   "}
                      {this.state.mis}
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="grid-item">
                    <p style={{ fontSize: "20px" }}>
                      <b style={{ fontWeight: 600 }}>Departments: </b>
                      {"   "}
                      ALL
                    </p>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
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
                options={department_options}
                onChange={this.onChangeDepartment}
                placeholder="Select Department"
                style={{
                  width: "100px",
                }}
              />
            </div>
          </div>
          {this.state.department === "" ? (
            ""
          ) : (
            <>
              <div>
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
                      "@media screen and (min-width: 40em)": { width: "80%" },
                      overflow: "hidden",
                    }}
                  >
                    <TableContainer sx={{ maxHeight: 500 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {this.upperColumns.map((column) => (
                              <TableCell
                                key={column.id}
                                align="center"
                                style={{
                                  minWidth: column.minWidth,
                                  backgroundColor: "ButtonHighlight",
                                  color: "black",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell
                              align="center"
                              value="Not Verified"
                              onClick={() => {
                                this.handleclick1();
                              }}
                              className="tablecell"
                            >
                              {counterTotal}
                            </TableCell>
                            <TableCell
                              align="center"
                              value="Verified"
                              onClick={() => {
                                this.handleclick2();
                              }}
                              className="tablecell"
                            >
                              {counterVerified}
                            </TableCell>
                            <TableCell
                              align="center"
                              value="Not Verified"
                              onClick={() => {
                                this.handleclick3();
                              }}
                              className="tablecell"
                            >
                              {counterNotVerified}
                            </TableCell>
                            <TableCell
                              align="center"
                              value="Modification needed"
                              onClick={() => {
                                this.handleclick4();
                              }}
                              className="tablecell"
                            >
                              {counterModification}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
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
                    "@media screen and (min-width: 40em)": { width: "95%" },
                    overflow: "hidden",
                  }}
                >
                  <TableContainer sx={{ maxHeight: 650 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {this.columns.map((column, key) => (
                            <TableCell
                              key={column.id}
                              align="center"
                              style={{
                                minWidth: column.minWidth,
                                backgroundColor: "ButtonHighlight",
                                color: "black",
                              }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.allStudents
                          .filter(
                            (student) =>
                              student.feeDetails.verification ===
                              this.state.tableData
                          )
                          .slice(
                            this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage +
                              this.state.rowsPerPage
                          )
                          .map((row, key) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                {/* {this.columns.map((column, key) => {
                             const value = row[column.id];
                            return (
                              <TableCell key={column.id} align='center'>
                               
                                {column.id==='reciept' ? (<ArrowCircleDown/>) : <></>}
                                {column.id==='remarks' ? (<VerificationComponent />) : <></>}
                                {column.id === 'status'? (
                                <div>
                                {column.id === 'status' && value === 'Verified'
                                  ? (
                                    <div style = {{color: 'green'}}>{value}</div>
                                  ):(
                                    <div>
                                    {column.id === 'status' && value === 'Not Verified'
                                    ? (
                                      <div style = {{color: 'red'}}>{value}</div>
                                    ):(
                                      <div style = {{color: 'blue'}}>{value}</div>
                                    )
                                    }
                                    </div>    
                                  )}
                                  </div>
                                ) : (
                                    
                                    <div>
                                       {column.id === "id" ? (<>{++count}</>): <>{value}</>}
                                      {value}
                                    </div>
                                  )}
                              </TableCell>
                            );
                          })}
                         */}
                                <TableCell align="center">{++count}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                  {row.feeDetails.verification === "pending" ? (
                                    <div style={{ color: "red" }}>Pending</div>
                                  ) : (
                                    <div>
                                      {row.feeDetails.verification ===
                                      "verified" ? (
                                        <div style={{ color: "green" }}>
                                          Verified
                                        </div>
                                      ) : (
                                        <div style={{ color: "blue" }}>
                                          Modification Required
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  {row.personalInfo.category}
                                </TableCell>
                                <TableCell align="center">
                                  {row.feeDetails.amount}
                                </TableCell>
                                <TableCell align="center">
                                  {row.feeDetails.utrDuNumber}
                                </TableCell>
                                <TableCell align="center">
                                  {row.feeDetails.transactionTime}
                                </TableCell>
                                <TableCell align="center">
                                  <ArrowCircleDown
                                    // onClick={() =>
                                    //   viewDoc(row.feeDetails.docUploaded)
                                    // }
                                    onClick={() =>
                                      viewDoc({
                                        filename:
                                          "407e5ec9a35239d9e93b17f7dc5af51c1634111043524.pdf",
                                        contentType: "application/pdf",
                                        originalName: "adhar.pdf",
                                      })
                                    }
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <VerificationComponent
                                    state={row.feeDetails.verification}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {/* <textarea id="w3review" name="w3review" rows="4" cols="50">
                                  At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                                  </textarea> */}
                                  <textarea
                                    type="text"
                                    onChange={this.handleChange}
                                  >
                                    {row.feeDetails.remarks}
                                  </textarea>
                                </TableCell>
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
    );
  }
}

export default AccountHome;
