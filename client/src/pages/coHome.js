import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import NavBar from '../components/Navbar/Navbar';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },

];

function createData(name, code) {
  // const density = population / size;
  return { name, code };
}

const rows = [
  createData('India sopan tipule', 'IN'),
  createData('China sopan tipule', 'CN'),
  createData('Italy sopan tipule', 'IT'),
  createData('United States nikta tipule', 'US'),
  createData('Canada nikita sopan ', 'CA'),
  createData('Australia tipule', 'AU'),
  createData('Germany', 'DE'),
  createData('Ireland', 'IE'),
  createData('Mexico', 'MX'),
  createData('Japan', 'JP'),
  createData('France', 'FR'),
  createData('United Kingdom'),
  createData('Russia', 'RU'),
  createData('Nigeria', 'NG'),
  createData('Brazil', 'BR'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <NavBar />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px'}}>
        <Paper sx={{ width: '80%', overflow: 'hidden'}} >
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow>
                  {columns.map((column) => (
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align='center'>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}