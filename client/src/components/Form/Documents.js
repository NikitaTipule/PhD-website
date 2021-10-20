import React, { Component } from "react";
import { Table, TableBody } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import "./Documents.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { BACKEND_URL } from "../../config";
import { docType } from "../../phdAdmDetails";

export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: [
        { name: docType.photo, id: 1 },
        { name: docType.sign, id: 2 },
        { name: docType.ug, id: 3 },
        { name: docType.pg, id: 4 },
      ],
      OBC: [
        { name: "Caste Certificate", id: 1 },
        { name: "Caste Validity", id: 2 },
      ],
      NT: [
        { name: "Caste Certificate", id: 1 },
        { name: "Caste Validity", id: 2 },
      ],
      ST: [
        { name: "Caste Certificate", id: 1 },
        { name: "Caste Validity", id: 2 },
      ],
      gate: [{ name: "Gate/PET Score Card", id: 1 }],

      generalData: true,
      OBCData: false,
      NTData: false,
      STData: false,

      documentsUploaded: [],

      selectedFile: null,

      open: false,

      token: localStorage.getItem("phd-website-jwt"),
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

  // Handle when clicked "Next"
  onNext = (event) => {
    const documentsUploaded = {
      documentsUploaded: this.state.documentsUploaded,
    };
    console.log("before posting: ", documentsUploaded);
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
    this.setState({ open: !this.state.open });
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
            this.setState({
              documentsUploaded: res.data.user.documentsUploaded,
            });
            // for (var i = 0; i < res.data.user.documentsUploaded.length; i++) {
            //   const docUploaded = {
            //     type: res.data.user.documentsUploaded[i].type,
            //     filename: res.data.user.documentsUploaded[i].filename,
            //     contentType: res.data.user.documentsUploaded[i].contentType,
            //     originalName: res.data.user.documentsUploaded[i].originalName,
            //     verification: res.data.user.documentsUploaded[i].verification,
            //   };
            //   this.setState((prevState) => ({
            //     documentsUploaded: [
            //       ...prevState.documentsUploaded,
            //       docUploaded,
            //     ],
            //   }));
            // }
          });
      } catch (error) {
        console.log(error.message);
      }
    }
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

        <div className="docTitle">Documents</div>
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
                          type="file"
                          name={str.name}
                          onChange={this.onFileChange}
                        />
                      </div>
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </>
                ))}
              </div>
            )}
            {/*________condition UG Details_____ */}
            {this.props.data.gate && (
              <div>
                {this.state.gate.map((str) => (
                  <>
                    <div className="field">
                      <div>{str.name}</div>
                      <div>
                        <input
                          type="file"
                          name={str.name}
                          onChange={this.onFileChange}
                        />
                      </div>
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </>
                ))}
              </div>
            )}
            {/*________condition CASTE_____ */}
            {this.props.data.category === "OBC" ? (
              <div>
                {this.state.caste.map((str) => (
                  <>
                    <div className="field">
                      <div>{str.name}</div>
                      <div>
                        <input
                          type="file"
                          name={str.name}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </>
                ))}
              </div>
            ) : (
              " "
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
    );
  }
}
