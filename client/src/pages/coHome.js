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
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px'}}>
        <Paper sx={{ width: '80%', overflow: 'hidden'}} >
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
    </>
  );
                }
}

export default StickyHeadTable