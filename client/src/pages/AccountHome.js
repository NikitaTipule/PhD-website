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
        };
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountHome;