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
import { Button } from "@mui/material";
import "../CSS/coHome.css";
import { Box } from "@mui/system";
import { Menu, MenuItem } from "@mui/material";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      logout: false,
      page: 0,
      rowsPerPage: 10,
    };
  }
  columns = [
    { id: "id", label: "No.", minWidth: 30 },
    { id: "coname", label: "Co-ordinator Name", minWidth: 120 },
    { id: "department", label: "Department", minWidth: 120 },
  ];

  rows = [
    {
      id: 1,
      coname: "Co-Ordinator 1",
      department: "Computer and IT",
    },
    {
      id: 2,
      coname: "Co-Ordinator 2",
      department: "Electronics and Telecommunication",
    },
    {
      id: 3,
      coname: "Co-Ordinator 3",
      department: "Electrical",
    },
    {
      id: 4,
      coname: "Co-Ordinator 4",
      department: "Civil",
    },
    {
      id: 5,
      coname: "Co-Ordinator 5",
      department: "Production",
    },
    {
      id: 6,
      coname: "Co-Ordinator 6",
      department: "Instrumentation",
    },

    {
      id: 7,
      coname: "Co-Ordinator 7",
      department: "mechanical",
    },
    {
      id: 8,
      coname: "Co-Ordinator 8",
      department: "Verified",
    },
    {
      id: 9,
      coname: "Co-Ordinator 9",
      department: "Verified",
    },
    {
      id: 10,
      coname: "Co-Ordinator 10",
      department: "Verified",
    },
    {
      id: 11,
      coname: "Account Section COordiantor",
      department: "Account Section",
    },
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
  render() {
    return (
      <>
        <NavBar loggedin={true}/>
        <Box
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

          <Link to="/removestaff" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Remove Staff</Button>
          </Link>
        </Box>
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
                      admin name
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="grid-item">
                    <p style={{ fontSize: "20px" }}>
                      <b style={{ fontWeight: 600 }}>Email : </b>
                      {"   "}
                      faculty@gamil.com
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="grid-item">
                    <p style={{ fontSize: "20px" }}>
                      <b style={{ fontWeight: 600 }}>Mis : </b>
                      {"   "}
                      11111111111
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
                    {this.rows
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
                          >
                            {this.columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align="center">
                                  <Link
                                    to={{ pathname: "/co-home" }}
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                    }}
                                  >
                                    {value}
                                  </Link>
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
                count={this.rows.length}
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

export default Admin;
