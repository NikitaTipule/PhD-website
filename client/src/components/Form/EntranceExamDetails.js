import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import Multiselect from "multiselect-react-dropdown";
import SweetAlert from "react-bootstrap-sweetalert";
import Divider from "@mui/material/Divider";
import DatePicker from "react-date-picker";
import "./AdmissionDetails.css";

export default class EntranceExamDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsSelected: [],
      options: [
        {
          name: "Want to appear for COEP's Reasearch \nProgram Eligibility Test (RPET)",
          id: 1,
        },
        {
          name: "Gate",
          id: 2,
        },
        {
          name: "Want to appear for COEP entrance exam",
          id: 3,
        },
        {
          name: "SPPU ET 2021",
          id: 4,
        },
      ],

      gateScore: "",
      gateDOV: "",
      gate: false,

      confirmAlert: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeDate = (event) => {
    this.setState({
      gateDOV: event,
    });
  };

  onSubmit = (event) => {
    this.setState({ confirmAlert: !this.state.confirmAlert });
    this.props.data.entranceOption = this.state.optionsSelected;
    this.props.data.gateScore = this.state.gateScore;
    this.props.data.gateDOV = this.state.gateDOV;
    this.props.data.gate = this.state.gate;
  };

  confirmData = (event) => {
    this.props.nextStep();
    console.log(this.props.data);
  };

  handleSelect = (selectedList, selectedItem) => {
    this.setState({
      optionsSelected: selectedList,
    });
    console.log(this.state.optionsSelected);
  };

  onCancel = () => {
    this.setState({
      confirmAlert: !this.state.confirmAlert,
    });
    console.log(this.props);
    // this.props.props.history.goBack();
  };

  render() {
    return (
      <div className="container">
        <div>
          <SweetAlert
            title={"Entrance Exam Details"}
            show={this.state.confirmAlert}
            onConfirm={this.confirmData}
            onCancel={this.onCancel}
            customButtons={
              <React.Fragment>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    this.onCancel();
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={() => {
                    this.confirmData();
                  }}
                >
                  Confirm
                </Button>
              </React.Fragment>
            }
          >
            {() => (
              <div style={{ alignItems: "left", textAlign: "left" }}>
                <div className="popUpField">
                  <div>
                    <Divider
                      sx={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: "100%",
                      }}
                    />
                    {this.state.optionsSelected.map((str) => (
                      <div>
                        <div>{str.name}</div>
                        <div style={{ marginTop: "0px" }}>
                          {str.id === 2 ? (
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <div
                                style={{
                                  marginLeft: "20px",
                                  fontWeight: "600",
                                }}
                              >
                                Score :{" "}
                              </div>
                              <div
                                style={{
                                  marginLeft: "20px",
                                }}
                              >
                                {this.state.gateScore}
                              </div>
                            </div>
                          ) : (
                            " "
                          )}
                          <Divider
                            sx={{
                              marginTop: "20px",
                              marginBottom: "20px",
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </SweetAlert>
        </div>
        <div>
          <div className="title">Entrance Exam Details</div>
          <div className={"Form"}>
            <form onSubmit={this.onSubmit}>
              <div style={{ marginTop: "30px" }}>
                <Typography>Details Regarded Extrance Exams</Typography>
                <Multiselect
                  options={this.state.options}
                  // onSelect={(selectedList, selectedItem) => {
                  //   this.state.optionsSelected = selectedList;
                  // }}
                  onSelect={this.handleSelect}
                  placeholder="Details regarded extrance exams..."
                  displayValue="name"
                  style={{
                    searchBox: {
                      minHeight: "50px",
                      padding: "10px",
                    },
                    multiselectContainer: {
                      width: "100%",
                    },
                    chips: {
                      whiteSpace: "normal",
                    },
                  }}
                />
              </div>
              <div>
                {this.state.optionsSelected.map((str) => (
                  <div>
                    {str.id === 2 ? (
                      <div>
                        {(this.state.gate = true)}
                        <div style={{ marginTop: "10px" }}>
                          <Typography>GATE Details</Typography>
                          <TextField
                            className="mb-3"
                            variant="outlined"
                            label="Gate Score"
                            onChange={this.handleChange}
                            value={this.state.gateScore}
                            name="gateScore"
                            required
                          />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <Typography>Date of Validation</Typography>
                          <DatePicker
                            onChange={(e) => this.onChangeDate(e)}
                            value={this.state.gateDOV}
                            format={"dd-MM-y"}
                            dayPlaceholder="dd"
                            monthPlaceholder="mm"
                            yearPlaceholder="yyyy"
                            className="formDatePicker"
                          ></DatePicker>
                        </div>
                      </div>
                    ) : (
                      " "
                    )}
                  </div>
                ))}
              </div>
            </form>
            <button
              style={{
                marginTop: "20px",
                marginBottom: "30px",
                padding: "5px",
                width: "100px",
                height: "40px",
                fontSize: "20px",
                backgroundColor: "cadetblue",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={this.onSubmit}
            >
              {" "}
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}
