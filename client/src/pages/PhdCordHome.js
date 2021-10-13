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
import "../CSS/coHome.css";
import axios from "axios";
import { BACKEND_URL } from "../config";

class PhdCordHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mis: "",
      studentData: [],
      allStudent: [],
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
      id:""
    };
  }

  async componentDidMount() {
    try {
      this.setState({
        id: this.props.location.state.details
      })
      console.log(this.state.id)
    } catch (error) {
      console.log(error.message)
      this.setState({
        flag: false
      })
    }
    if (localStorage.getItem("phd-website-jwt")) {
      await this.setState({
        token: localStorage.getItem("phd-website-jwt")
      });
      // console.log(this.state.token)
      if (this.state.flag) {
        try {
          axios
            .get(BACKEND_URL + "/phdCords/" + this.state.id, { headers: { "phd-website-jwt": this.state.token } })
            .then((res) => {
              this.setState({
                name: res.data.user.name,
                email: res.data.user.email,
                mis: res.data.user.mis,
                department: res.data.user.department
              })
              try {
                axios
                  .get(BACKEND_URL + "/students/department/" + this.state.department, { headers: { "phd-website-jwt": this.state.token } })
                  .then((response) => {
                    this.setState({
                      studentData: response.data,
                      length: response.data.length
                    })
                    console.log(response.data)
                  })
      
              } catch (err) {
                console.log(err.message)
              }
            });
        } catch (error) {
          console.log(error.message)
        }
      } else {
        try {
          axios
            .get(BACKEND_URL + "/staff/me", { headers: { "phd-website-jwt": this.state.token } })
            .then((res) => {
              this.setState({
                name: res.data.user.name,
                email: res.data.user.email,
                mis: res.data.user.mis,
                department: res.data.user.department
              })
              try {
                axios
                  .get(BACKEND_URL + "/students/department/" + this.state.department, { headers: { "phd-website-jwt": this.state.token } })
                  .then((response) => {
                    this.setState({
                      studentData: response.data,
                      length: response.data.length
                    })
                    console.log(response.data)
                  })
      
              } catch (err) {
                console.log(err.message)
              }
            });
        } catch (error) {
          console.log(error.message)
        }
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
    { id: "verification", label: "Verification Status", minWidth: 70 },
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

  oncellClick(id) {
    console.log(id)
    this.props.history.push({
      pathname: '/coform',
      // search: `/${id}`,
      state: { details: id}
    })
  }

  render() {
    let counterTotal = 0;
    let counterVerified = 0;
    let counterNotVerified = 0;
    let counterModification = 0;
    let count = 0;
    for (let i = 0; i < this.state.studentData.length; i++) {
      this.state.allStudent.push(this.state.studentData[i])
      counterTotal++;
      if (this.state.studentData[i].verification === "verified") {
        counterVerified++;
      } else if (this.state.studentData[i].verification === "pending") {
        counterNotVerified++;
      } else if (this.state.studentData[i].verification === "mod-req") {
        counterModification++;
      }
    }
    return (
      <>
        <NavBar loggedin={true}/>
        <div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 className="textBetween">Co-Ordinator Information</h1>
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
                      <b style={{ fontWeight: 600 }}>Department: </b>
                      {"   "}
                      {this.state.department}
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
                              border: "1px",
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
                          // style ={{border: "2px"}}
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
                "@media screen and (min-width: 40em)": { width: "80%" },
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
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.studentData
                      .filter(
                        (student) => student.verification === this.state.tableData
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
                            value = {row.id}
                            onClick={() => {this.oncellClick(row._id)}}
                          >
                            {this.columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align="center">
                                  {column.id === "verification" ? (
                                    <div>
                                      {column.id === "verification" &&
                                      value === "verified" ? (
                                        <div style={{ color: "green" }}>
                                          {value}
                                        </div>
                                      ) : (
                                        <div>
                                          {column.id === "verification" &&
                                          value === "pending" ? (
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
                                          <div>
                                            {++count}
                                          </div>
                                        ):(
                                          
                                        <div>
                                      <Link
                                        to={{ pathname: "/coform" }}
                                        style={{
                                          textDecoration: "none",
                                          color: "black",
                                        }}
                                      >
                                        {value}
                                        </Link>
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
                count={this.state.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </>
    );
  }
}

export default PhdCordHome;