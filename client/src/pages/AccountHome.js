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
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
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
                checked={this.state.verify === "Pending"}
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
                checked={this.state.verify === "Modification-Required"}
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
                checked={this.state.verify === "Verified"}
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
            tableData:'Not Verified'
        };

    }
    upperColumns = [
      {id: 'id', label: 'Total Candidates'},
      {id: 'verified', label: 'Verified'},
      {id: 'not_verified', label: 'Not Verified'},
      {id: 'Modification needed', label: 'Modification Needed'}
    ]
    columns = [
        { id: 'id', label:'Serial Number', minwidth:30},
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'status', label: 'Verification Status', minWidth: 50 },
        { id: 'category', label: 'Category', minwidth:50},
        { id: 'amount', label: 'Amount Paid', minWidth:50},
        { id: 'utrnumber', label: 'UTR/DU Number', minWidth:50},
        { id: 'date', label:'Date', minwidth:50},
        { id: 'reciept', label:'Payment Reciept', minWidth:50},
        { id: 'remarks', label:'Remarks',minWidth:70 }
      
      ];
      
      rows = [
        {
          id: 1,
          name : "Student 1", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9813891',
          date: '07/10/2021',
        },
        {
          id:2,
          name : "Student 2", 
          status: "Verified",
          category: 'NT',
          amount: '100/-',
          utrnumber: 'DU9813888',
          date: '07/10/2021'
        },
        {
          id:3,
          name : "Student 3", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:4,
          name : "Student 4", 
          status: "Not Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:5,
          name : "Student 5", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:6,
          name : "Student 6", 
          status: "Modification needed",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
      
        {
          id:7,
          name : "Student 7", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:8,
          name : "Student 8", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:9,
          name : "Student 9", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:10,
          name : "Student 10", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:11,
          name : "Student 11", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:12,
          name : "Student 12", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:13,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:14,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:15,
          name : "nikita sopan Tipule", 
          status: "Not Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:16,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:17,
          name : "nikita sopan Tipule", 
          status: "Modification needed",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
      
        {
          id:18,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:19,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:20,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:21,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:22,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
       
        {
          id:23,
          name : "nikita sopan Tipule", 
          status: "Modification needed",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
      
        {
          id:24,
          name : "nikita sopan Tipule", 
          status: "Verified", category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:25,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:26,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:27,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
        },
        {
          id:28,
          name : "nikita sopan Tipule", 
          status: "Verified",
          category: 'General',
          amount: '1000/-',
          utrnumber: 'DU9812891',
          date: '07/10/2021'
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
    handleclick1 = (event) => {
      this.setState({
        tableData: "Not Verified"
      });
    }
  
    handleclick2 = (event) => {
      this.setState({
        tableData: "Verified"
      });
    }
  
    handleclick3 = (event) => {
      this.setState({
        tableData: "Not Verified"
      });
    }
  
    handleclick4 = (event) => {
      this.setState({
        tableData: "Modification needed"
      });
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
                               {this.upperColumns.map((column) => (
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
                  
                            <TableRow hover role="checkbox" tabIndex={-1}>
                              <TableCell align='center'
                                  value="Not Verified"
                                  onClick = {() => {this.handleclick1()}}
                                  className= "tablecell"
                              >28</TableCell>
                              <TableCell align='center'
                                  value="Verified"
                                  onClick = {() => {this.handleclick2()}}
                                  className= "tablecell"
                              >23</TableCell>
                              <TableCell align='center'
                                 value="Not Verified"
                                 onClick = {() => {this.handleclick3()}}
                                 className= "tablecell"
                              >2</TableCell>
                              <TableCell align='center'
                                 value="Modification needed"
                                 onClick = {() => {this.handleclick4()}}
                                 className= "tablecell"
                              >3</TableCell>
                            </TableRow>
                             </TableBody>
                             </Table>
                          </TableContainer>
                       </Paper>
                      </div>
                      </div>


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
                             .filter(student => student.status === this.state.tableData)
                             .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                             .map((row) => {
                             return (
                             <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                             {this.columns.map((column) => {
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
                                  ):(
                                    <div>
                                      {value}
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
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default AccountHome;