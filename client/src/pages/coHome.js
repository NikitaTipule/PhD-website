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



class StickyHeadTable extends Component {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      logout: false,
      page: 0,
      rowsPerPage: 10,
      // handleChangePage(),
      // handleChangeRowsPerPage(),
    }
  };
 columns = [
  {id: 'id', label:'No.', minWidth: 30},
  { id: 'name', label: 'Name', minWidth: 120 },
  { id: 'status', label: 'Verification Status', minWidth: 70 },

];

 rows = [
  {
    id: 1,
    name : "nikita sopan Tipule", 
    status: "Verified"
  },
  {
    id:2,
    name : "nikita sopan Tipule", 
    status: "Verified"
  },
  {
    id:3,
    name : "nikita sopan Tipule", 
    status: "Verified"
  },
  {
    id:4,
    name : "nikita sopan Tipule", 
    status: "Not Verified"
  },
  {
    id:5,
    name : "nikita sopan Tipule", 
    status: "Verified"
  },
  {
    id:6,
    name : "nikita sopan Tipule", 
    status: "Modification needed"
  },

  {
    id:7,
    name : "nikita sopan Tipule", 
    status: "Verified"
  },
  {
    id:8,
    name : "nikita sopan Tipule", 
    status: "Verified"
  },
  {
    id:9,
    name : "nikita sopan Tipule", 
    status: "Verified"
  },
  {
    id:10,
    name : "nikita sopan Tipule", 
    status: "Verified"
  },
  {
    id:11,
    name : "nikita sopan Tipule", 
    status: "Verified"
  },
  {
    id:12,
    name : "nikita sopan Tipule", 
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
  render() {
  return (
    <>
      <NavBar />
      <div>
        <div>
          <div style={{display:'block', justifyContent:'center', alignItems:'center'}}>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <h1 className="textBetween">
              Co-Ordinator Information
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
                  <b style={{fontWeight:600}}>Department: </b>
                  {'   '}
                    Computer Engineering
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
                                      <Link to={{pathname: '/'}} style={{textDecoration: 'none', color: 'black'}} >
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
    </>
  );
                }
}

export default StickyHeadTable