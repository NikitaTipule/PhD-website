import { React, Component } from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from '../components/Navbar/Navbar';
import { Button } from '@material-ui/core';
import PersonalDetails from "../components/Form/PersonalDetails";
import { Link } from 'react-router-dom';
import "../CSS/studentHome.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Sidebar from '../components/Sidebar';
class StudentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            PGverification: "",
            PGremarks: "",
            UGverification: "",
            UGremarks: "",
            DOCverification: "",
            DOCremarks: "",
            ENTverification: "",
            ENTremarks: "",
            FEEverification: "",
            FEEremarks: "",
            PIverification: "",
            PIremarks: "",
        };
    }

    async componentDidMount() {
      if (localStorage.getItem("phd-website-jwt")) {
        await this.setState({
          token: localStorage.getItem("phd-website-jwt"),
        });
        try {
          axios
            .get(BACKEND_URL + "/students/me", {
              headers: { "phd-website-jwt": this.state.token },
            })
            .then((res) => {
              let docver="pending", p=0, m=0, v=0;
              res.data.user.documentsUploaded.map(status=>(
                status.verification==="pending" ? (p=p+1) : (status.verification==="mod_req" ? (m=m+1) : (v=v+1))    
              ));
              if(m>0){
                docver="modification Required"
              }else if(m===0 && p===0 && v!==0){
                docver="verified"
              }
              console.log(res.data.user.feeDetails.verification)
              this.setState({
                name: res.data.user.name,
                email: res.data.user.email,
                mis: res.data.user.mis,
                PGverification: res.data.user.academicsPG.verification,
                PGremarks: res.data.user.academicsPG.remarks,
                UGverification: res.data.user.academicsUG.verification,
                UGremarks: res.data.user.academicsUG.remarks,
                DOCverification: docver,
                DOCremarks: "None",
                ENTverification: res.data.user.entranceDetails.verification,
                ENTremarks: res.data.user.entranceDetails.remarks,
                FEEverification: res.data.user.feeDetails.verification,
                FEEremarks: res.data.user.feeDetails.remarks,
                PIverification: res.data.user.personalInfo.verification,
                PIremarks: res.data.user.personalInfo.remarks,
              });
              console.log(res);
            });
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    render() {
        return(
            <div>
                <NavBar loggedin={true}/>
                
               <div className='container'>
                 <Sidebar user="Candidate"/>
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
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop: '20px'}}>
                        <h1 className="textBetween">
                        Verification Status
                        </h1>
                    </div>
                    <div class="container-verification">

                      <ul class="responsive-table">
                      <li class="table-header">

                        <div class="col col-2"><b>Field</b></div>
                        <div class="col col-3"><b>Remarks</b></div>
                        <div class="col col-4"><b>Status</b></div>
                      </li>
                      <li class="table-row">

                        <div class="col col-2" data-label="Customer Name">Academics PG</div>
                        <div class="col col-3" data-label="Amount">{this.state.PGremarks.length?this.state.PGremarks:"None"}</div>
                        <div class="col col-4" data-label="Payment Status" style={{textTransform: 'capitalize'}}>{this.state.PGverification}</div>
                      </li>
                      <li class="table-row">

                        <div class="col col-2" data-label="Customer Name">Academics UG</div>
                        <div class="col col-3" data-label="Amount">{this.state.UGremarks.length?this.state.UGremarks:"None"}</div>
                        <div class="col col-4" data-label="Payment Status" style={{textTransform: 'capitalize'}}>{this.state.UGverification}</div>
                      </li>
                      <li class="table-row">

                        <div class="col col-2" data-label="Customer Name">Document Upload</div>
                        <div class="col col-3" data-label="Amount">{this.state.DOCremarks}</div>
                        <div class="col col-4" data-label="Payment Status" style={{textTransform: 'capitalize'}}>{this.state.DOCverification.length?this.state.DOCverification:"verified"}</div>
                      </li>
                      <li class="table-row">

                        <div class="col col-2" data-label="Customer Name">Entrance Details</div>
                        <div class="col col-3" data-label="Amount">{this.state.ENTremarks.length?this.state.ENTremarks:"None"}</div>
                        <div class="col col-4" data-label="Payment Status" style={{textTransform: 'capitalize'}}>{this.state.ENTverification}</div>
                      </li>
                      <li class="table-row">

<<<<<<< HEAD
                    <div class="col col-2" data-label="Customer Name">Fee Details</div>
                    <div class="col col-3" data-label="Amount">{this.state.FEEremarks.length?this.state.FEEremarks:"None"}</div>
                    {console.log(this.state.FEEverification)}
                    <div class="col col-4" data-label="Payment Status" style={{textTransform: 'capitalize'}}>{this.state.FEEverification}</div>
                  </li>
                  <li class="table-row">
=======
                        <div class="col col-2" data-label="Customer Name">Fee Details</div>
                        <div class="col col-3" data-label="Amount">{this.state.FEEremarks.length?this.state.FEEremarks:"None"}</div>
                        <div class="col col-4" data-label="Payment Status" style={{textTransform: 'capitalize'}}>{this.state.FEEverification}</div>
                      </li>
                      <li class="table-row">
>>>>>>> df7bced2ed01ec53fe6aafee571067383e1b3767

                        <div class="col col-2" data-label="Customer Name">Personal Info</div>
                        <div class="col col-3" data-label="Amount">{this.state.PIremarks.length?this.state.PIremarks:"None"}</div>
                        <div class="col col-4" data-label="Payment Status" style={{textTransform: 'capitalize'}}>{this.state.PIverification}</div>
                      </li>
                      </ul>
                    </div>
                 </div>
                </div>
        </div>
        );
    }
}

export default StudentHome;
