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
// import { Button } from "@mui/material";
import "../CSS/coHome.css";
// import { Box } from "@mui/system";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Sidebar from "../components/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MobileView, BrowserView } from "react-device-detect";
import Button from "@mui/material/Button";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllPhdcords: [],
      logout: false,
      page: 0,
      rowsPerPage: 10,
      name: "",
      email: "",
      mis: 0,
      length: 0,
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
              mis: res.data.user.mis,
            });
            try {
              axios
                .get(BACKEND_URL + "/phdCords/", {
                  headers: { "phd-website-jwt": this.state.token },
                })
                .then((response) => {
                  console.log(response.data);
                  this.setState({
                    AllPhdcords: response.data,
                    length: response.data.length,
                  });
                  // console.log(response.data)
                });
            } catch (err) {
              console.log(err.message);
            }
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  columns = [
    { id: "id", label: "No.", minWidth: 30 },
    { id: "name", label: "Co-ordinator Name", minWidth: 120 },
    { id: "department", label: "Department", minWidth: 120 },
    { id: "total", label: "Total", minWidth: 120 },
    { id: "verified", label: "Verified", minWidth: 120 },
    { id: "pending", label: "Not Verified", minWidth: 120 },
    { id: "mod_req", label: "Modification Required", minWidth: 120 },
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

  oncellClick(id) {
    console.log(id);
    this.props.history.push({
      pathname: "/coordinator",
      // search: `/${id}`,
      state: { details: id },
    });
  }

  render() {
    let count = 0;
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
            {this.state.menu && <Sidebar className="mob" user="Admin" />}
          </MobileView>
          <BrowserView>
            {!this.state.menu && <Sidebar className="mob" user="Admin" />}
          </BrowserView>
          <div>
            {/* <Box
              marginTop="1rem"
              display="flex"
              // alignItems="center"
              justifyContent="space-evenly"
              gridTemplateColumns="repeat(3, 1fr)"
            >
              <Link to="/addcord" style={{ textDecoration: "none" }}>
                <Button variant="outlined">Add Coordiantor</Button>
              </Link>

              <Link to="/add-account-section" style={{ textDecoration: "none" }}>
                <Button variant="outlined">Add Account Section</Button>
              </Link>

              <Link to="/removecord" style={{ textDecoration: "none" }}>
                <Button variant="outlined">Remove Coordinator</Button>
              </Link>
              <Link to="/remove-account-section" style={{ textDecoration: "none" }}>
                <Button variant="outlined">Remove Account Section</Button>
              </Link>
            </Box> */}
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1 className="textBetween">Admin Information</h1>
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
                          <b style={{ fontWeight: 600 }}>Role: </b>
                          {"   "}
                          Administrator
                        </p>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginLeft: "40%",
                  marginRight: "35",
                }}
              >
                <Button
                  onClick={() => {
                    this.props.history.push({ pathname: "/candidate-list" });
                  }}
                  variant="contained"
                  style={{ height: "50px", margin: "5px" }}
                >
                  All Candidates List
                </Button>
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
                  marginTop: "10px",
                  marginBottom: "50px",
                }}
              >
                <Paper
                  sx={{
                    width: "80vw",
                    "@media screen and (max-width: 1285px)": { width: "80vw" },
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
                        {this.state.AllPhdcords.slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        ).map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                              onClick={() => {
                                this.oncellClick(row._id);
                              }}
                            >
                              {/* {this.columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align="center">
                                      <Link
                                        to={{ pathname: "/coordinator" }}
                                        style={{
                                          textDecoration: "none",
                                          color: "black",
                                        }}
                                      >
                                        {value}
                                      </Link>
                                    </TableCell>
                                  );
                                })} */}
                              <TableCell align="center">
                                <Link
                                  to={{ pathname: "/coordinator" }}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {++count}
                                </Link>
                              </TableCell>
                              <TableCell align="center">
                                <Link
                                  to={{ pathname: "/coordinator" }}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {row.name}
                                </Link>
                              </TableCell>
                              <TableCell align="center">
                                <Link
                                  to={{ pathname: "/coordinator" }}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {row.department}
                                </Link>
                              </TableCell>
                              <TableCell align="center">
                                <Link
                                  to={{ pathname: "/coordinator" }}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {row.status.total}
                                </Link>
                              </TableCell>
                              <TableCell align="center">
                                <Link
                                  to={{ pathname: "/coordinator" }}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {row.status.verified}
                                </Link>
                              </TableCell>
                              <TableCell align="center">
                                <Link
                                  to={{ pathname: "/coordinator" }}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {row.status.pending}
                                </Link>
                              </TableCell>
                              <TableCell align="center">
                                <Link
                                  to={{ pathname: "/coordinator" }}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {row.status["mod_req"]}
                                </Link>
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
                    count={this.state.AllPhdcords.length}
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

export default Admin;
