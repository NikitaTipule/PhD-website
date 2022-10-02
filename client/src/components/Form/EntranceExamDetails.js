import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import Multiselect from "multiselect-react-dropdown";
import SweetAlert from "react-bootstrap-sweetalert";
import Divider from "@mui/material/Divider";
import DatePicker from "react-date-picker";
import "./AdmissionDetails.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
          name: "GATE",
          id: 2,
        },
        // {
        //   name: "Want to appear for COEP entrance exam",
        //   id: 3,
        // },
        // {
        //   name: "SPPU ET 2021",
        //   id: 4,
        // },
      ],

      givenGate: false,
      givenPet: false,
      isInterestedCoepRPET: false,
      isInterestedCoepEntrance: false,
      gateScore: "",
      gateMarks: "",
      gateQualiMarks: "",
      gateDate: "",
      petDetails: "",
      petYear: "",

      remarks: "",
      verification: "",

      editable: "",
      disabled: "",

      errorGateScore: false,
      errorGateMarks: false,
      errorGateQualiMarks: false,
      errorGateDate: false,
      errorPetDetails: false,
      errorPetYear: false,
      errorOptionsSelected: false,

      next: false,
      confirmAlert: false,

      try: 1,

      token: localStorage.getItem("phd-website-jwt"),
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeDate = (event) => {
    this.setState({
      gateDate: event,
    });
  };

  validateData = () => {
    this.state.givenGate &&
      (/^\d+$/.test(this.state.gateScore) && parseInt(this.state.gateScore)
        ? this.setState({ errorGateScore: false })
        : this.setState({ errorGateScore: true }));

    this.state.givenGate &&
      (/^\d+$/.test(this.state.gateMarks) && parseInt(this.state.gateMarks)
        ? this.setState({ errorGateMarks: false })
        : this.setState({ errorGateMarks: true }));

    this.state.givenGate &&
      (/^\d+$/.test(this.state.gateQualiMarks) && parseInt(this.state.gateQualiMarks)
        ? this.setState({ errorGateQualiMarks: false })
        : this.setState({ errorGateQualiMarks: true }));

    this.state.givenGate &&
      (this.state.gateDate === ""
        ? this.setState({ errorGateDate: true })
        : this.setState({ errorGateDate: false }));

    this.state.givenPet &&
      (this.state.petDetails === ""
        ? this.setState({ errorPetDetails: true })
        : this.setState({ errorPetDetails: false }));

    this.state.givenPet &&
      (this.state.petYear.length === 4 && /^\d+$/.test(this.state.petYear)
        ? this.setState({ errorPetYear: false })
        : this.setState({ errorPetYear: true }));

    this.state.optionsSelected.length < 1
      ? this.setState({ errorOptionsSelected: true })
      : this.setState({ errorOptionsSelected: false });
  };

  onNext = async (event) => {
    if (this.state.disabled) {
      this.props.entire === "no"
        ? this.props.nextStep(2)
        : this.props.nextStep(1);
    } else {
      var l = this.state.optionsSelected.length;
      for (var i = 0; i < l; i++) {
        if (this.state.optionsSelected[i].id === 1) {
          this.state.isInterestedCoepRPET = true;
        }
        if (this.state.optionsSelected[i].id === 2) {
          this.state.givenGate = true;
        }
        if (this.state.optionsSelected[i].id === 3) {
          this.state.isInterestedCoepEntrance = true;
        }
        if (this.state.optionsSelected[i].id === 4) {
          this.state.givenPet = true;
        }
      }

      await this.validateData();

      if (
        this.state.errorGateScore === false &&
        this.state.errorGateMarks === false &&
        this.state.errorGateQualiMarks === false &&
        this.state.errorGateDate === false &&
        this.state.errorPetDetails === false &&
        this.state.errorPetYear === false &&
        this.state.errorOptionsSelected === false
      ) {
        this.setState({ confirmAlert: !this.state.confirmAlert });
        this.props.data.entranceDetails.isInterestedCoepRPET =
          this.state.isInterestedCoepRPET;
        this.props.data.entranceDetails.isInterestedCoepEntrance =
          this.state.isInterestedCoepEntrance;
        this.props.data.entranceDetails.givenPet = this.state.givenPet;
        this.props.data.entranceDetails.givenGate = this.state.givenGate;
        this.props.data.entranceDetails.Gate.score = this.state.gateScore;
        this.props.data.entranceDetails.Gate.marks = this.state.gateMarks;
        this.props.data.entranceDetails.Gate.qualimarks = this.state.gateQualiMarks;
        this.props.data.entranceDetails.Gate.lastDateOfValidation =
          this.state.gateDate;
        this.props.data.entranceDetails.sppuPet.details = this.state.petDetails;
        this.props.data.entranceDetails.sppuPet.year = this.state.petYear;
      }
    }
  };

  confirmData = (event) => {
    this.props.entire === "no"
      ? this.props.nextStep(2)
      : this.props.nextStep(1);

    const entranceDetails = {
      entranceDetails: this.props.data.entranceDetails,
    };

    console.log(entranceDetails);

    try {
      axios
        .post(BACKEND_URL + "/students/edit/info", entranceDetails, {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((res) => {
          console.log("Entrance Details Info Added");
        });
    } catch (err) {
      console.log(err);
    }
  };

  handleSelect = (selectedList, selectedItem) => {
    this.setState({
      optionsSelected: selectedList,
    });
  };

  onRemove = (selectedList, selectedItem) => {
    this.setState({ optionsSelected: selectedList });
  };

  onCancel = () => {
    this.setState({
      confirmAlert: !this.state.confirmAlert,
    });
  };

  onBack = (event) => {
    this.props.entire === "no"
      ? this.props.prevStep(4)
      : this.props.prevStep(1);
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
            res.data.user.entranceDetails &&
              this.setState({
                givenGate: res.data.user.entranceDetails.givenGate
                  ? res.data.user.entranceDetails.givenGate
                  : false,
                givenPet: res.data.user.entranceDetails.givenPet
                  ? res.data.user.entranceDetails.givenPet
                  : false,
                isInterestedCoepRPET: res.data.user.entranceDetails
                  .isInterestedCoepRPET
                  ? res.data.user.entranceDetails.isInterestedCoepRPET
                  : false,
                isInterestedCoepEntrance: res.data.user.entranceDetails
                  .isInterestedCoepEntrance
                  ? res.data.user.entranceDetails.isInterestedCoepEntrance
                  : false,
                gateScore: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.score
                    ? res.data.user.entranceDetails.Gate.score
                    : ""
                  : "",

                gateMarks: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.marks
                    ? res.data.user.entranceDetails.Gate.marks
                    : ""
                  : "",

                gateQualiMarks: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.qualimarks
                    ? res.data.user.entranceDetails.Gate.qualimarks
                    : ""
                  : "",
                gateDate: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.lastDateOfValidation
                    ? res.data.user.entranceDetails.Gate.lastDateOfValidation
                    : ""
                  : "",
                petDetails: res.data.user.entranceDetails.sppuPet
                  ? res.data.user.entranceDetails.sppuPet.details
                    ? res.data.user.entranceDetails.sppuPet.details
                    : ""
                  : "",
                petYear: res.data.user.entranceDetails.sppuPet
                  ? res.data.user.entranceDetails.sppuPet.year
                    ? res.data.user.entranceDetails.sppuPet.year
                    : ""
                  : "",
                remarks: res.data.user.entranceDetails.remarks
                  ? res.data.user.entranceDetails.remarks
                  : "",
                verification: res.data.user.entranceDetails.verification
                  ? res.data.user.entranceDetails.verification
                  : "",
              });

            this.setState({ editable: res.data.user.editable });
            res.data.user.editable &&
            (res.data.user.entranceDetails.verification === "mod_req" ||
              res.data.user.entranceDetails.verification === "pending")
              ? this.setState({ disabled: false })
              : this.setState({ disabled: true });

            if (this.state.givenGate) {
              this.setState((previousState) => ({
                optionsSelected: [
                  ...previousState.optionsSelected,
                  this.state.options[1],
                ],
              }));
            }
            if (this.state.isInterestedCoepRPET) {
              this.setState((previousState) => ({
                optionsSelected: [
                  ...previousState.optionsSelected,
                  this.state.options[0],
                ],
              }));
            }
            if (this.state.isInterestedCoepEntrance) {
              this.setState((previousState) => ({
                optionsSelected: [
                  ...previousState.optionsSelected,
                  this.state.options[2],
                ],
              }));
            }
            if (this.state.givenPet) {
              this.setState((previousState) => ({
                optionsSelected: [
                  ...previousState.optionsSelected,
                  this.state.options[3],
                ],
              }));
            }
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

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
      <div className="admission_container" style={{ marginTop: "90px" }}>
        {/**PopUp here */}
        <div>
          <SweetAlert
            title={"Entrance Exam Details"}
            show={this.state.confirmAlert}
            onConfirm={this.confirmData}
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
                  color="success"
                  size="large"
                  onClick={() => {
                    this.confirmData();
                  }}
                >
                  Save and Proceed
                </Button>
              </React.Fragment>
            }
          >
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
                  {this.state.isInterestedCoepRPET && (
                    <div>
                      <div>{this.state.options[0].name}</div>
                      <Divider
                        sx={{
                          marginTop: "20px",
                          marginBottom: "20px",
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                  {this.state.givenGate && (
                    <div>
                      <div>{this.state.options[1].name}</div>
                      <div style={{ marginTop: "0px" }}>
                        <div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                marginLeft: "20px",
                                fontWeight: "400",
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

                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                marginLeft: "20px",
                                fontWeight: "400",
                              }}
                            >
                              Marks :{" "}
                            </div>
                            <div
                              style={{
                                marginLeft: "20px",
                              }}
                            >
                              {this.state.gateMarks}
                            </div>
                          </div>

                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                marginLeft: "20px",
                                fontWeight: "400",
                              }}
                            >
                              Qualifying Marks :{" "}
                            </div>
                            <div
                              style={{
                                marginLeft: "20px",
                              }}
                            >
                              {this.state.gateQualiMarks}
                            </div>
                          </div>

                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                marginLeft: "20px",
                                fontWeight: "400",
                              }}
                            >
                              Last Date of Validation :{" "}
                            </div>
                            <div
                              style={{
                                marginLeft: "20px",
                              }}
                            >
                              {this.state.gateDate
                                .toLocaleString()
                                .slice(0, 10)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Divider
                        sx={{
                          marginTop: "20px",
                          marginBottom: "20px",
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                  {this.state.isInterestedCoepEntrance && (
                    <div>
                      <div>{this.state.options[2].name}</div>
                      <Divider
                        sx={{
                          marginTop: "20px",
                          marginBottom: "20px",
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                  {this.state.givenPet && (
                    <div>
                      <div>{this.state.options[3].name}</div>
                      <div style={{ marginTop: "0px" }}>
                        <div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                marginLeft: "20px",
                                fontWeight: "400",
                              }}
                            >
                              Details :{" "}
                            </div>
                            <div
                              style={{
                                marginLeft: "20px",
                              }}
                            >
                              {this.state.petDetails}
                            </div>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                marginLeft: "20px",
                                fontWeight: "400",
                              }}
                            >
                              Year :{" "}
                            </div>
                            <div
                              style={{
                                marginLeft: "20px",
                              }}
                            >
                              {this.state.petYear}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Divider
                        sx={{
                          marginTop: "20px",
                          marginBottom: "20px",
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SweetAlert>
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

        {/**Form Starts here */}
        <div>
          <div className="title">Entrance Exam Details</div>
          <div>
            <form>
              <div style={{ marginTop: "30px" }}>
                <Typography>Details Regarded Extrance Exams</Typography>
                <Multiselect
                  disable={this.state.disabled}
                  options={this.state.options}
                  onRemove={this.onRemove}
                  onSelect={this.handleSelect}
                  placeholder="Details regarded extrance exams..."
                  displayValue="name"
                  selectedValues={this.state.optionsSelected}
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

                {this.state.errorOptionsSelected && (
                  <div style={{ color: "red" }}>
                    <Typography>Please select something</Typography>
                  </div>
                )}
              </div>

              <div>
                {this.state.optionsSelected.map((str, id) => (
                  <div key={id}>
                    {str.id === 2 ? (
                      <div style={{ marginTop: "30px" }}>
                        <Typography
                          style={{ fontWeight: 500, fontSize: "17px" }}
                        >
                          GATE
                        </Typography>
                        <div style={{ marginLeft: "20px" }}>
                          <div style={{ marginTop: "3px", paddingTop: "15px" }}>
                            <Typography>GATE Score out of 1000</Typography>
                            <TextField
                              disabled={this.state.disabled}
                              className="mb-3"
                              variant="outlined"
                              label="Gate Score out of 1000"
                              onChange={this.handleChange}
                              value={this.state.gateScore}
                              name="gateScore"
                              style={{ marginTop: "10px" }}
                              required
                            />
                            {this.state.errorGateScore && (
                              <div style={{ color: "red" }}>
                                <Typography>Invalid score entered</Typography>
                              </div>
                            )}
                          </div>

                          <div style={{ marginTop: "3px", paddingTop: "15px" }}>
                            <Typography>GATE marks out of 100</Typography>
                            <TextField
                              disabled={this.state.disabled}
                              className="mb-3"
                              variant="outlined"
                              label="GATE marks out of 100"
                              onChange={this.handleChange}
                              value={this.state.gateMarks}
                              name="gateMarks"
                              style={{ marginTop: "10px" }}
                              required
                            />
                            {this.state.errorGateMarks && (
                              <div style={{ color: "red" }}>
                                <Typography>Invalid Marks entered</Typography>
                              </div>
                            )}
                          </div>

                          <div style={{ marginTop: "5px", paddingTop: "15px" }}>
                            <Typography>Qualifying Marks</Typography>
                            <TextField
                              disabled={this.state.disabled}
                              className="mb-3"
                              variant="outlined"
                              label="Qualifying Marks"
                              onChange={this.handleChange}
                              value={this.state.gateQualiMarks}
                              name="gateQualiMarks"
                              style={{ marginTop: "10px" }}
                              required
                            />
                            {this.state.errorGateQualiMarks && (
                              <div style={{ color: "red" }}>
                                <Typography>Invalid Qualifying Marks entered</Typography>
                              </div>
                            )}
                          </div>

                          <div style={{ marginTop: "10px", paddingTop: "15px" }}>
                            <Typography>Date of Validation</Typography>
                            <DatePicker
                              disabled={this.state.disabled}
                              onChange={(e) => this.onChangeDate(e)}
                              value={this.state.gateDate}
                              format={"dd-MM-y"}
                              dayPlaceholder="dd"
                              monthPlaceholder="mm"
                              yearPlaceholder="yyyy"
                              className="formDatePicker"
                            ></DatePicker>
                            {this.state.errorGateDate && (
                              <div style={{ color: "red" }}>
                                <Typography>
                                  Please select date of validation
                                </Typography>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      " "
                    )}

                    {str.id === 4 ? (
                      <div>
                        <div style={{ marginTop: "30px" }}>
                          <Typography
                            style={{ fontWeight: 500, fontSize: "17px" }}
                          >
                            SPPU PET
                          </Typography>
                          <div style={{ marginLeft: "20px" }}>
                            <div style={{ marginTop: "3px" }}>
                              <Typography>Details</Typography>
                              <TextField
                                disabled={this.state.disabled}
                                className="mb-3"
                                variant="outlined"
                                label="SPPU PET Details"
                                onChange={this.handleChange}
                                value={this.state.petDetails}
                                name="petDetails"
                                style={{ marginTop: "10px" }}
                                required
                              />
                              {this.state.errorPetDetails && (
                                <div style={{ color: "red" }}>
                                  <Typography>Details required</Typography>
                                </div>
                              )}
                            </div>

                            <div style={{ marginTop: "8px" }}>
                              <Typography>Year</Typography>
                              <TextField
                                disabled={this.state.disabled}
                                className="mb-3"
                                variant="outlined"
                                label="Year"
                                onChange={this.handleChange}
                                value={this.state.petYear}
                                name="petYear"
                                style={{ marginTop: "8px" }}
                                required
                              />
                              {this.state.errorPetYear && (
                                <div style={{ color: "red" }}>
                                  <Typography>Invalid year</Typography>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      " "
                    )}
                  </div>
                ))}
              </div>
            </form>

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
        </div>
      </div>
    );
  }
}
