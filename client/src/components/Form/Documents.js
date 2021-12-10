import React, { Component } from "react";
import { Table, TableBody } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import "./Documents.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactNotification from 'react-notifications-component'
import {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import axios from "axios";
import { BACKEND_URL } from "../../config";
import { docType } from "../../phdAdmDetails";
import viewDoc from "../../pages/DocViewer";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: [
        { name: docType.photo, id: 1, error: false },
        { name: docType.sign, id: 2, error: false },
        { name: docType.ug, id: 3, error: false },
        { name: docType.pg, id: 4, error: false }, 
      ],
      nationality:[
        { name: docType.leaving_certificate, id: 1, error: false },
        { name: docType.passport, id: 2, error: false },
        { name: docType.birth, id: 3, error: false },
        { name: docType.domicile, id: 4, error: false },
      ],
      SC_ST: [
        { name: docType.c_certificate, id: 1, error: false },
        { name: docType.c_validity, id: 2, error: false },
      ],
      OBC_NT_VJ: [
        { name: docType.c_certificate, id: 1, error: false },
        { name: docType.c_validity, id: 2, error: false },
        { name: docType.c_ncl, id: 2, error: false },
      ],

      category: "",
      generalData: true,
      nationalityData: true,

      documentsUploaded: [],

      editable: "",
      disabled: "",

      verification: "pending",
      remarks: "",

      selectedFile: null,

      open: false,

      token: localStorage.getItem("phd-website-jwt"),

      loading: false,
    };
  }

  // FUNCTIONS FOR FILE DATA
  onFileChange = async (event) => {
    await this.setState({ selectedFile: event.target.files[0] });

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

    const i = await this.state.documentsUploaded
      .map((e) => e.type)
      .indexOf(event.target.name);

    axios
      .post(BACKEND_URL + "/files/upload", formData, {
        headers: {
          "phd-website-jwt": this.state.token,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const docUploaded = {
          type: event.target.name,
          filename: res.data.filename,
          contentType: res.data.contentType,
          originalName: res.data.originalname,
          verification: "pending",
        };

        if (i === -1) {
          this.setState((prevState) => ({
            documentsUploaded: [...prevState.documentsUploaded, docUploaded],
          }));
        } else {
          this.state.documentsUploaded[i] = docUploaded;
        }

        // this.setState((prevState) => ({
        //   documentsUploaded: [...prevState.documentsUploaded, docUploaded],
        // }));

        console.log(this.state.documentsUploaded);
      })
      .catch((err) => console.log(err.response || "error"));
  };

  // Handle alert cancels
  handleAlertCanel = () => {
    this.setState({ open: !this.state.open });
  };
  onCancel = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  // Handle back and next navigation
  handleNext = () => {
    this.props.nextStep();
  };
  onBack = (event) => {
    this.props.prevStep();
  };

  validate = (event) => {
    if (this.state.generalData) {
      this.state.general.map((doc, id) => {
        var copy = [...this.state.general];
        if (this.state.documentsUploaded.some((e) => e.type === doc.name)) {
          copy[id].error = false;
        } else {
          copy[id].error = true;
        }
        this.setState({ general: copy });
      });
    }
    if (this.state.nationalityData) {
      this.state.nationality.map((doc, id) => {
        var copy = [...this.state.nationality];
        if (this.state.documentsUploaded.some((e) => e.type === doc.name)) {
          copy[id].error = false;
        } else {
          copy[id].error = true;
        }
        this.setState({ nationality: copy });
      });
    }
    if (this.state.category==="ST" || this.state.category==="SC") {
      this.state.SC_ST.map((doc, id) => {
        var copy = [...this.state.SC_ST];
        if (this.state.documentsUploaded.some((e) => e.type === doc.name)) {
          copy[id].error = false;
        } else {
          copy[id].error = true;
        }
        this.setState({ SC_ST: copy });
      });
    }
    if (this.state.category==="OBC" || this.state.category==="NT" || this.state.category==="VJNT") {
      this.state.OBC_NT_VJ.map((doc, id) => {
        var copy = [...this.state.OBC_NT_VJ];
        if (this.state.documentsUploaded.some((e) => e.type === doc.name)) {
          copy[id].error = false;
        } else {
          copy[id].error = true;
        }
        this.setState({ OBC_NT_VJ: copy });
      });
    }
  };

  // Handle when clicked "Next"
  onNext = async (event) => {
    await this.validate();
    if (!this.state.general.some((e) => e.error) && !this.state.nationality.some((e)=>e.error) && !this.state.SC_ST.some((e)=>e.error) && !this.state.OBC_NT_VJ.some((e)=>e.error)) {
      if (!this.state.disabled) {
        const documentsUploaded = {
          documentsUploaded: this.state.documentsUploaded,
        };
        try {
          axios
            .post(BACKEND_URL + "/students/edit/docs", documentsUploaded, {
              headers: { "phd-website-jwt": this.state.token },
            })
            .then((res) => {
              console.log("Documents Added");
            });
        } catch (err) {
          console.log(err.res);
        }
      }
      this.setState({ open: !this.state.open });
    }
  };

  async componentDidMount() {
    if (localStorage.getItem("phd-website-jwt")) {
      await this.setState({
        token: localStorage.getItem("phd-website-jwt"),
      });
      try {
        await axios
          .get(BACKEND_URL + "/students/me", {
            headers: { "phd-website-jwt": this.state.token },
          })
          .then((res) => {
            res.data.user.documentsUploaded &&
              this.setState({
                documentsUploaded: res.data.user.documentsUploaded
                  ? res.data.user.documentsUploaded
                  : [],
              });
            this.setState({ editable: res.data.user.editable });
            this.setState({ disabled: !this.state.editable });
            this.setState({ category: res.data.user.personalInfo.category })
            this.setState({ remarks: (res.data.user.documentsUploaded.remarks ? res.data.user.documentsUploaded.remarks : "")})
            let m=0, p=0;
            res.data.user.documentsUploaded.map((doc, id)=>{   
              if(doc.verification==="mod_req"){
                m=m+1;
              }else if(doc.verification==="pending"){
                p=p+1;
              }
              if(m>0){
                this.setState({verification:"mod_req"})
              }
              if(m===0 && p===0){
                this.setState({verification:"verified"})
              }
            })
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  //loader

  loader = () => {
    // this.setState({loading : true})
    // setTimeout(()=>{
    //   this.setState({loading : false});
    // }, 2500)
    store.addNotification({
      title: "Wait!",
      message: "PDF will load in few seconds",
      type: "info",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      insert: "top",
      dismiss: {
        duration: 2500,
      }
    })
  } 

  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#0971f1",
          darker: "#053e85",
        },
        neutral: {
          main: "#64748B",
          contrastText: "#fff",
        },
      },
    });

    return (
      <>
      <ReactNotification/>
      <div className="docContainer">
        {/* Popup on Success */}
        
        <div>
          <SweetAlert
            success
            show={this.state.open}
            title="Documents Uploaded Successfully"
            onConfirm={this.handleAlertCanel}
            onCancel={this.onCancel}
            customButtons={
              <React.Fragment>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    size="large"
                    color="neutral"
                    onClick={() => {
                      this.onCancel();
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Back
                  </Button>
                </ThemeProvider>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    this.handleNext();
                  }}
                  style={{ marginLeft: "20px" }}
                >
                  Next
                </Button>
              </React.Fragment>
            }
          ></SweetAlert>
        </div>

        {/* Remark and verification display    */}
        <div className="remark_verify_container">
          {/* Remark display  */}
          <div className="remark_container">
            <div style={{ fontWeight: "500" }}>Remark : </div>
            <div style={{ marginLeft: "20px" }}>
              {this.state.remarks.replace(/ /g, "") !== ""
                ? this.state.remarks
                : "No remarks mentioned yet"}
            </div>
          </div>
          {/* Verification status display  */}
          <div className="verify_container">
            <div style={{ fontWeight: "500" }}>Verification Status: </div>
            <div style={{ marginLeft: "20px" }}>
              {" "}
              {this.state.verification === "verified"
                ? "Verified"
                : this.state.verification === "mod_req"
                ? "Modification Required"
                : "Pending"}
            </div>
          </div>
        </div>

        <div className="docTitle">Documents</div>
        {/* {this.state.loading && <h2>PDF will load in few seconds...</h2>} */}
        <Table>
          <TableBody>
            {/*________condition GENERAL_____ */}
            {this.state.generalData && (
              <div>
                {this.state.general.map((str) => (
                  <>
                    <div className="field">
                      <div>{str.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={str.name}
                          onChange={this.onFileChange}
                        />
                        {str.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === str.name) {
                            return (
                              <div>
                              <div className="docsPreviewDiv">
                                <div className="docsPreviewFilename">
                                  {doc.originalName.slice(0, 10) + "...  "}
                                </div>
                                <div
                                  className="previewIcon"
                                  onClick={() =>
                                    {
                                    this.loader();
                                    viewDoc({
                                      filename: doc.filename,
                                      contentType: doc.contentType,
                                      originalName: doc.originalName,
                                    });
                                  }
                                  }
                                >
                                  <VisibilityIcon />
                                </div>
                                
                              </div>
                              <div>
                                {doc.verification==="verified" && <div className="docVerify" style={{color:"green"}}>Verified</div>}
                                {doc.verification==="mod_req" && <div className="docVerify" style={{color:"red"}}>Modification Required</div>}
                              </div>
                            </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </>
                ))}
              </div>
            )}
            {/*________condition Nationality_______*/}
            {this.state.nationality && (
              <div>
                {this.state.nationality.map((str) => (
                  <>
                    <div className="field">
                      <div>{str.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={str.name}
                          onChange={this.onFileChange}
                        />
                        {str.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === str.name) {
                            return (
                              <div>
                              <div className="docsPreviewDiv">
                                <div className="docsPreviewFilename">
                                  {doc.originalName.slice(0, 10) + "...  "}
                                </div>
                                <div
                                  className="previewIcon"
                                  onClick={() =>
                                    viewDoc({
                                      filename: doc.filename,
                                      contentType: doc.contentType,
                                      originalName: doc.originalName,
                                    })
                                  }
                                >
                                  <VisibilityIcon />
                                </div>
                              </div>
                              <div>
                                {doc.verification==="verified" && <div className="docVerify" style={{color:"green"}}>Verified</div>}
                                {doc.verification==="mod_req" && <div className="docVerify" style={{color:"red"}}>Modification Required</div>}
                              </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                     
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </>
                ))}
              </div>
            )}
            {/*________condition SC_ST____________*/}
            {(this.state.category==="SC" || this.state.category==="ST") && (
              <div>
                {this.state.SC_ST.map((str) => (
                  <>
                    <div className="field">
                      <div>{str.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={str.name}
                          onChange={this.onFileChange}
                        />
                        {str.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === str.name) {
                            return (
                              <div>
                              <div className="docsPreviewDiv">
                                <div className="docsPreviewFilename">
                                  {doc.originalName.slice(0, 10) + "...  "}
                                </div>
                                <div
                                  className="previewIcon"
                                  onClick={() =>
                                    viewDoc({
                                      filename: doc.filename,
                                      contentType: doc.contentType,
                                      originalName: doc.originalName,
                                    })
                                  }
                                >
                                  <VisibilityIcon />
                                </div>
                              </div>
                              <div>
                              {doc.verification==="verified" && <div className="docVerify" style={{color:"green"}}>Verified</div>}
                              {doc.verification==="mod_req" && <div className="docVerify" style={{color:"red"}}>Modification Required</div>}
                            </div>
                            </div>
                            );
                          }
                        })}
                      </div>
                    
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </>
                ))}
              </div>
            )}
            {/*________condition OBC_NT_________*/}
            {(this.state.category==='OBC' || this.state.category==="NT" || this.state.category==="VJNT") && (
              <div>
                {this.state.OBC_NT_VJ.map((str) => (
                  <>
                    <div className="field">
                      <div>{str.name}</div>
                      <div>
                        <input
                          disabled={this.state.disabled}
                          type="file"
                          name={str.name}
                          onChange={this.onFileChange}
                        />
                        {str.error ? (
                          <div className="docsError">Please upload file</div>
                        ) : (
                          ""
                        )}
                        {this.state.documentsUploaded.map((doc, id) => {
                          if (doc.type === str.name) {
                            return (
                              <div>
                              <div className="docsPreviewDiv">
                                <div className="docsPreviewFilename">
                                  {doc.originalName.slice(0, 10) + "...  "}
                                </div>
                                <div
                                  className="previewIcon"
                                  onClick={() =>
                                    viewDoc({
                                      filename: doc.filename,
                                      contentType: doc.contentType,
                                      originalName: doc.originalName,
                                    })
                                  }
                                >
                                  <VisibilityIcon />
                                </div>
                              </div>
                              <div>
                              {doc.verification==="verified" && <div className="docVerify" style={{color:"green"}}>Verified</div>}
                              {doc.verification==="mod_req" && <div className="docVerify" style={{color:"red"}}>Modification Required</div>}
                            </div>
                            </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </>
                ))}
              </div>
            )}
          </TableBody>
        </Table>

        {/* Back and Next button   */}
        <div style={{ margin: "20px 0 20px 0" }}>
          <React.Fragment>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                size="large"
                color="neutral"
                onClick={() => {
                  this.onBack();
                }}
                style={{ marginRight: "10px" }}
              >
                Back
              </Button>
            </ThemeProvider>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                this.onNext();
              }}
            >
              Next
            </Button>
          </React.Fragment>
        </div>
      </div>
    </>
    );

  }
}
