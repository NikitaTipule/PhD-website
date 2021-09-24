import React, { Component } from 'react'
import NavBar from '../components/Navbar/Navbar';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import NavBar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import DatePicker from "react-date-picker";
import DropDown from "react-dropdown";
import "react-dropdown/style.css";
import {Typography} from "@material-ui/core"

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
        };
    }

    columns = [
        {id: 'id', label:'No.', minWidth: 30},
        { id: 'name', label: 'Name', minWidth: 120 },
        { id: 'status', label: 'Verification Status', minWidth: 70 },
      
      ];
      
       rows = [
        {
          id: 1,
          name : "Student 1", 
          status: "Verified"
        },
        {
          id:2,
          name : "Student 2", 
          status: "Verified"
        },
        {
          id:3,
          name : "Student 3", 
          status: "Verified"
        },
        {
          id:4,
          name : "Student 4", 
          status: "Not Verified"
        },
        {
          id:5,
          name : "Student 5", 
          status: "Verified"
        },
        {
          id:6,
          name : "Student 6", 
          status: "Modification needed"
        },
      
        {
          id:7,
          name : "Student 7", 
          status: "Verified"
        },
        {
          id:8,
          name : "Student 8", 
          status: "Verified"
        },
        {
          id:9,
          name : "Student 9", 
          status: "Verified"
        },
        {
          id:10,
          name : "Student 10", 
          status: "Verified"
        },
        {
          id:11,
          name : "Student 11", 
          status: "Verified"
        },
        {
          id:12,
          name : "Student 12", 
          status: "Verified"
        },
        {
          id:13,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:14,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:15,
          name : "nikita sopan Tipule", 
          status: "Not Verified"
        },
        {
          id:16,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:17,
          name : "nikita sopan Tipule", 
          status: "Modification needed"
        },
      
        {
          id:18,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:19,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:20,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:21,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:22,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
       
        {
          id:23,
          name : "nikita sopan Tipule", 
          status: "Modification needed"
        },
      
        {
          id:24,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:25,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:26,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:27,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          id:28,
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
      ]
      
        handleChangePage = (event, newPage) => {
          this.setState ({
            page : newPage
          })
        }
        handleChangeRowsPerPage = (event) => {
          this.setState({
            rowsPerPage : +event.target.value,
            page: 0
          })
        };
      

    onChangeDepartment = (event) => {
        this.setState ({
            department : event.value,
        });
        // console.log(this);
    }

    render() {

        const department_options = [
            "Computer Science",
            "Electrical",
            "ENTC",
            "Mechanical",
            "Civil",
            "Production",
            "Metallergy",
        ];

        return(
            <div>
                <NavBar />
                <div>
                    <div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <h1 className="textBetween">
                            Account Section Co-Ordinator Information
                            </h1>
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div className="box">
                        <Grid container className="container-box">
                        <Grid item xs={12} md={6} className="grid-item">
                            <p style={{fontSize: '20px'}}>
                            <b style={{fontWeight:600}}>Name : </b>
                            {'   '}
                            Coordinator name
                            </p>
                        </Grid>
                        <Grid item xs={12} md={6} className="grid-item">
                            <p style={{fontSize: '20px'}}>
                            <b style={{fontWeight:600}}>Email : </b>
                            {'   '}
                                faculty@gamil.com
                            </p>
                            </Grid>
                        <Grid item xs={12} md={6} className="grid-item">
                            <p style={{fontSize: '20px'}}>
                            <b style={{fontWeight:600}}>Mis : </b>
                            {'   '}
                                11111111111
                            </p>
                            </Grid>
                        <Grid item xs={12} md={6} className="grid-item">
                            <p style={{fontSize: '20px'}}>
                            <b style={{fontWeight:600}}>Departments: </b>
                            {'   '}
                                All
                            </p>
                            </Grid>
                        </Grid>
                        </div>
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', margin: '50px',}}>
                        <div style={{ width: "50%", marginLeft: "4%",display:'flex', justifyContent:'center', alignItems:'center',  padding: '10px'}}>
                            <Typography style={{ marginBottom: "13px", paddingRight: '50px' }}>
                            Department
                            </Typography>
                            <DropDown
                            options={department_options}
                            onChange={this.onChangeDepartment}
                            placeholder="Select Department"
                            style = {{
                                width: "100px",
                            }}
                            />
                        </div>
                    </div>
                    {this.state.department === "" ? "" : (
                        <div>
                            {/* {this.state.department} */}
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '50px'}}>
          
                            <Paper sx = {{width: '100%','@media screen and (min-width: 40em)': {width: '80%'}, overflow: 'hidden'}}>
                                <TableContainer sx={{ maxHeight: 500 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                    <TableRow>
                                        {this.columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align='center'
                                            style={{ minWidth: column.minWidth, backgroundColor: 'ButtonHighlight', color:'black' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                        ))}
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.rows
                                        .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                        .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {this.columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                <TableCell key={column.id} align='center'>
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
                                                    ):(
                                                        <div>
                                                        {/* to do Link part */}
                                                        <Link to={{pathname: '/accountform'}} style={{textDecoration: 'none', color: 'black'}} >
                                                        {value}
                                                        </Link>
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
                                count={this.rows.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onPageChange={this.handleChangePage}
                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                                />
                            </Paper>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default AccountHome;