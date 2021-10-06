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
import { Button } from 'bootstrap';
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
            status: "",
        };

    }
    statusColumns=[
      {id:'id', label:'No.',minWidth:30},
      {id:'status', label:'Status', minWidth:120},
      {id:'totalstudents',label:'Total Students', minWidth:70},
    ]
    columns = [
        { id: 'id', label:'Serial Number', minwidth:30},
        { id: 'name', label: 'Name', minWidth: 120 },
        { id: 'status', label: 'Verification Status', minWidth: 70 },
      
      ];
      
       rows = [
        { 
          name : "Student 1", 
          status: "Verified"
        },
        {
          name : "Student 2", 
          status: "Verified"
        },
        {
          name : "Student 3", 
          status: "Verified"
        },
        {
          name : "Student 4", 
          status: "Not Verified"
        },
        {
          name : "Student 5", 
          status: "Verified"
        },
        {
          name : "Student 6", 
          status: "Modification needed"
        },
      
        {
          name : "Student 7", 
          status: "Verified"
        },
        {
          name : "Student 8", 
          status: "Verified"
        },
        {
          name : "Student 9", 
          status: "Verified"
        },
        {
          name : "Student 10", 
          status: "Verified"
        },
        {
          name : "Student 11", 
          status: "Verified"
        },
        {
          name : "Student 12", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Not Verified"
        },
        {
    
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Modification needed"
        },
      
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
       
        {
          name : "nikita sopan Tipule", 
          status: "Modification needed"
        },
      
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
        {
          name : "nikita sopan Tipule", 
          status: "Verified"
        },
       ]
      
      statusRows =[
        {id : 1,
        status: 'Verified',
        totalstudents: 23},
        {id : 2,
        status: 'Not Verified',
        totalstudents: 2},
        {id: 3,
        status: 'Modification Required',
        totalstudents: 3}
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
        }

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
        let newData=[]
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
                      <>
                      <div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '50px'}}>
                        <Paper sx = {{width: '100%','@media screen and (min-width: 40em)': {width: '80%'}, overflow: 'hidden'}}>
                        <TableContainer sx={{ maxHeight: 500 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                    <TableRow>
                                        {this.statusColumns.map((column) => (
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
                          
                                    {this.statusRows
                                        .map((row) => {
                                        
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {this.statusColumns.map((column) => {
                                                const value = row[column.id];
                                               
                                                return (
                                                <TableCell key={column.id} align='center'>
                                                   {column.id === 'status'? (
                                                    <div>
                                                    {column.id === 'status' && value === 'Verified'
                                                    ? (
                                                        <div style={{color:'green'}}>
                                                      
                                                        
                                                        {value}
                                                        
                                                       
                                                        </div>
                                                    ):(
                                                        <div style={{color:'red'}}>
                                                        {column.id === 'status' && value === 'Not Verified'
                                                        ? (
                                                        <div>
                                                          {value}
                                                         </div>
                                                        ):(
                                                          <div style={{color:'blue'}}>
                                                          {value}
                                                           </div>
                                                        )
                                                        }
                                                        </div>    
                                                    )}
                                                    </div>
                                                    ):
                                                    <div>
                                                        {value}
                                                       
                                                    </div>
                                                     }
                                                </TableCell>
                                                );
                                            })}
                                            
                                            </TableRow>
                                        );
                                        })}
                                    </TableBody>
                                </Table>
                        </TableContainer>

                                
                        </Paper>
                        </div>
                      </div>
                        





                        <div id='table'>
                            {/* {this.state.department} */}
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '50px'}}>
          
                            <Paper sx = {{width: '100%','@media screen and (min-width: 40em)': {width: '80%'}, overflow: 'hidden'}}>
                                <TableContainer sx={{ maxHeight: 500 }} hide='True'>
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
                                    {this.rows.map((item, sno=0) => {
                                       if (item.status==='Not Verified') {
                                        newData.push({id: sno + 1, ...item});
                                       }
                                 
                                   })}
                                    {newData
                                        .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                        .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} hide='True'>
                                            {this.columns.map((column) => {
                                                const value = row[column.id]
                                                return (
                                                
                                                <TableCell align='center'>
                                                  <div>
                                                    <Link to={{pathname: '/accountform'}} style={{textDecoration:'none', color:'black'}}>
                                                     {value}
                                                    </Link>
                                                  </div>
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
                    )}
                </div>
            </div>
        );
    }
}

export default AccountHome;