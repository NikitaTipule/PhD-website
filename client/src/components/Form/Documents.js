import React, { Component } from "react";
import { Table, TableBody } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import "./Documents.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: [
        { name: "Photo", id: 1 },
        { name: "Signature", id: 2 },
        { name: "UG Marksheet", id: 3 },
        { name: "PG Marksheet", id: 4 },
      ],
      gate: [{ name: "Gate/PET Score Card", id: 1 }],
      caste: [
        { name: "Caste Certificate", id: 1 },
        { name: "Caste Validity", id: 2 },
        { name: "EWS Certificate", id: 3 },
      ],
      generalData: true,
      open: false,
    };
  }

  onSubmit = (event) => {
    this.setState({ open: !this.state.open });
  };

  handleAlertCanel = () => {
    this.setState({ open: !this.state.open });
  };

  handleNext = () => {
    this.props.nextStep();
  };

  onChange = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log("img data : ", e.target);
    };
  };

  onBack = (event) => {
    this.props.prevStep();
  };

  onCancel = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const theme = createTheme({
      status: {
        danger: "#e53e3e",
      },
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

        <div
          style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}
        >
          Documents
        </div>
        <Table>
          <TableBody>
            {/*________condition PERSONAL_____ */}
            {this.state.generalData && (
              <div>
                {this.state.general.map((str) => (
                  <>
                    <div className="field">
                      <div>{str.name}</div>
                      <div>
                        <input
                          type="file"
                          name="file"
                          onChange={this.onChange}
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
                          name="file"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  </>
                ))}
              </div>
            )}
            {/*________condition PERSONAL_____ */}
            {this.props.data.category === "OBC" ? (
              <div>
                {this.state.caste.map((str) => (
                  <>
                    <div className="field">
                      <div>{str.name}</div>
                      <div>
                        <input
                          type="file"
                          name="file"
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
                this.onSubmit();
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
