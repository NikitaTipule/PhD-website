// import * as React from 'react';
import { React, Component } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import NavBar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import "../CSS/coHome.css"
import { borderRadius } from '@mui/system';



class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      logout: false,
      page: 0,
      rowsPerPage: 10,
    }
  };
 columns = [
  {id: 'id', label:'No.', minWidth: 30},
  { id: 'coname', label: 'Co-ordinator Name', minWidth: 120 },
  { id: 'department', label: 'Department', minWidth: 120 },

];

 rows = [
  {
    id: 1,
    coname : "nikita sopan Tipule", 
    department: "Computer and IT"
  },
  {
    id:2,
    coname : "nikita sopan Tipule", 
    department: "Electronics and Telecommunication"
  },
  {
    id:3,
    coname : "nikita sopan Tipule", 
    department: "Electrical"
  },
  {
    id:4,
    coname : "nikita sopan Tipule", 
    department: "Civil"
  },
  {
    id:5,
    coname : "nikita sopan Tipule", 
    department: "Production"
  },
  {
    id:6,
    coname : "nikita sopan Tipule", 
    department: "Instrumentation"
  },

  {
    id:7,
    coname : "nikita sopan Tipule", 
    department: "mechanical"
  },
  {
    id:8,
    coname : "nikita sopan Tipule", 
    department: "Verified"
  },
  {
    id:9,
    coname : "nikita sopan Tipule", 
    department: "Verified"
  },
  {
    id:10,
    coname : "nikita sopan Tipule", 
    department: "Verified"
  },
  {
    id:11,
    coname : "nikita sopan Tipule", 
    department: "Account Section"
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
  render() {
  return (
    <>
      <NavBar />
      <div>
        <div>
          <div style={{display:'block', justifyContent:'center', alignItems:'center'}}>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <h1 className="textBetween">
              Admin Information
            </h1>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Grid 
              container
              style={{
                border: "0.5px solid #D3E2DA",
                borderRadius:"25px",
                width: "80%",
                display: 'flex',
                // alignSelf:'center',
                alignItems:'center',
                justifyContent:'center',
                minHeight: '90px',
                // paddingTop: '10px',
                paddingLeft: '120px',
                // paddingRight: '10px',
                // paddingBottom: '30px'
              }}
            >
              <Grid item xs={6}>
                <p style={{fontSize: '20px'}}>
                  <b style={{fontWeight:600}}>Name : </b>
                  {'   '}
                  Nikita Sopan Tipule
                </p>
              </Grid>
              <Grid item xs={6}>
                <p style={{fontSize: '20px'}}>
                  <b style={{fontWeight:600}}>Email : </b>
                  {'   '}
                    faculty@gamil.com
                </p>
                </Grid>
              <Grid item xs={6}>
                <p style={{fontSize: '20px'}}>
                  <b style={{fontWeight:600}}>Mis : </b>
                  {'   '}
                    11111111111
                </p>
                </Grid>
              <Grid item xs={6}>
                <p style={{fontSize: '20px'}}>
                  <b style={{fontWeight:600}}>Role: </b>
                  {'   '}
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
                                <Link to={{pathname: '/'}} style={{textDecoration: 'none', color: 'black'}} >
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

export default Admin