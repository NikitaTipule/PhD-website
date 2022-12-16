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
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import "../CSS/coHome.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Sidebar from "../components/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MobileView, BrowserView } from "react-device-detect";

class PhdCordHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      page: 0,
      rowsPerPage: 10,
      department: "",
      token: localStorage.getItem("phd-website-jwt"),
      role: localStorage.getItem("phd-website-role"),
      menu: false,
    };
  }

  async componentDidMount() {
    await this.setState({
      department: this.props.location.state.department,
    });
    axios
      .get(
        BACKEND_URL + "/students/partialApplications/" + this.state.department,
        {
          headers: { "phd-website-jwt": this.state.token },
        }
      )
      .then((res) => {
        this.setState({
          studentData: res.data.map((d, i) => {
            d.index = i + 1;
            return d;
          }),
        });
      })
      .catch((err) => console.log(err));
  }

  columns = [
    { id: "index", label: "No.", minWidth: 30 },
    { id: "name", label: "Name", minWidth: 120 },
    {
      id: "personalInfo",
      label: "Personal Details",
      minWidth: 70,
    },
    {
      id: "academicsUG",
      label: "UG Details",
      minWidth: 70,
    },
    {
      id: "academicsPG",
      label: "PG Details",
      minWidth: 70,
    },
    {
      id: "entranceDetails",
      label: "Entrance Details",
      minWidth: 70,
    },
    { id: "feeDetails", label: "Fee Details", minWidth: 30 },
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

  // TODO: show student details
  // oncellClick(id) {
  //   //console.log(id);
  //   this.props.history.push({
  //     pathname: "/coform",
  //     // search: `/${id}`,
  //     state: { details: id, cordId: this.state.id },
  //   });
  // }

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
      } = student;

      const personalInfoStatus = {
        personalInfo: personalInfo?.completed ? "Yes" : "No",
      };

      const academicsUGStatus = {
        academicsUG: academicsUG?.completed ? "Yes" : "No",
      };

      const academicsPGStatus = {
        academicsPG: academicsPG?.completed ? "Yes" : "No",
      };

      const entranceDetailsStatus = {
        entranceDetails: entranceDetails?.completed ? "Yes" : "No",
      };

      const feeDetailsStatus = {
        feeDetails: feeDetails?.completed ? "Yes" : "No",
      };

      const sheetPersonalInfo = {
        department: personalInfo?.department || "",
        gender: personalInfo?.gender || "",
        motherName: personalInfo?.motherName || "",
        nationality: personalInfo?.nationality || "",
        category: personalInfo?.category || "",
        aadhar: personalInfo?.aadhar || "",
        dob: personalInfo?.dob || "",
        PWD: personalInfo?.physicallyDisabled || "",
        employed: personalInfo?.employed || "",
        domicile: personalInfo?.domicile || "",
        address: personalInfo?.address || "",
      };
      console.log(email, mobile);

      otherData.push({
        name,
        email,
        mobile,
        ...personalInfoStatus,
        ...academicsUGStatus,
        ...academicsPGStatus,
        ...entranceDetailsStatus,
        ...feeDetailsStatus,
        ...sheetPersonalInfo,
      });
    });
    // console.log(otherData);
    const XLSX = require("xlsx");
    const workSheet = XLSX.utils.json_to_sheet(otherData);
    workSheet["!cols"] = [
      { wch: 30 },
      { wch: 35 },
      { wch: 20 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 25 },
      { wch: 8 },
      { wch: 20 },
      { wch: 10 },
      { wch: 15 },
      { wch: 15 },
      { wch: 25 },
      { wch: 10 },
      { wch: 8 },
      { wch: 8 },
      { wch: 60 },
    ];
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      "IncompleteApplicationsInfo"
    );
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(
      workBook,
      `IncompleteApplications-${this.state.department}.xlsx`
    );
  };

  render() {
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
                  <h1 className="textBetween">
                    Incomplete Applications - {this.state.department}
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>
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
                          .slice(
                            this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage +
                              this.state.rowsPerPage
                          )
                          .map((row, ind) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                                value={row.name}
                              >
                                {this.columns.map((column) => {
                                  return (
                                    <TableCell key={column.id} align="center">
                                      {column.id === "index" ||
                                      column.id === "name" ? (
                                        <div>{row[column.id]}</div>
                                      ) : (
                                        <div>
                                          {column.id !== "icon" &&
                                          row[column.id].completed ? (
                                            <div style={{ color: "green" }}>
                                              Yes
                                            </div>
                                          ) : (
                                            <div style={{ color: "red" }}>
                                              {column.id !== "icon" ? "No" : ""}
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
