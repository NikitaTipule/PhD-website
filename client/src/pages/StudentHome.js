import { React, Component } from 'react'
import Grid from '@material-ui/core/Grid'
import NavBar from '../components/Navbar/Navbar';
import { Button } from '@material-ui/core';
import PersonalDetails from "../components/Form/PersonalDetails"
import { Link } from 'react-router-dom'


class StudentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
        };
    }

    
    render() {
        return(
            <div>
                <NavBar loggedin={true}/>
               <div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <h1 className="textBetween">
                        Student Information
                        </h1>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div className="box">
                    <Grid container className="container-box">
                    <Grid item xs={12} md={6} className="grid-item">
                        <p style={{fontSize: '20px'}}>
                        <b style={{fontWeight:600}}>Name : </b>
                        {'   '}
                        Nikita Sopan Tipule
                        </p>
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <p style={{fontSize: '20px'}}>
                        <b style={{fontWeight:600}}>Email : </b>
                        {'   '}
                            student@gamil.com
                        </p>
                        </Grid>
                    </Grid>
                    </div>
                    </div>
                </div> 
                <div  style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:"30px"}}>
                   <Link to ={{pathname: '/admissionform'}}>
                    <button
                        style={{
                        marginTop: "20px",
                        marginBottom: "30px",
                        padding: "5px",
                        width: "300px",
                        height: "40px",
                        fontSize: "20px",
                        backgroundColor: "cadetblue",
                        color: "white",
                        borderRadius: "10px",
                        }}
                        onClick={this.FillForm}
                    >
                        {" "}
                        Fill  Application  Form
                    </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default StudentHome;