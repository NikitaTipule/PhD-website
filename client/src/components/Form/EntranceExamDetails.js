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
import DocViewer from "../../pages/DocViewer";
import { docType } from "../../phdAdmDetails";
import { Table, TableBody } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DropDown from "react-dropdown";

export default class EntranceExamDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsSelected: [],
      options: [
        {
          name: "Want to appear for COEP Tech's Reasearch \nProgram Eligibility Test (RPET)",
          id: 1,
        },
        {
          name: "GATE",
          id: 2,
        },
      ],

      gateQualified: "",
      givenGate: false,
      isInterestedCoepRPET: false,
      gateScore: "",
      gateMarks: "",
      gateDate: "",
      gateDiscipline: "",
      gateCategory: "",

      remarks: "",
      verification: "",

      editable: "",
      disabled: "",

      errorGateDiscipline: false,
      errorGateCategory: false,
      errorGateScore: false,
      errorGateMarks: false,
      errorGateDate: false,
      errorOptionsSelected: false,
      errorGateDoc: false,
      errorgateQualified: false,

      next: false,
      confirmAlert: false,
      gate: {
        name: docType.gate,
        error: false,
        display: true,
      },
      documentsUploaded: [],

      try: 1,

      token: localStorage.getItem("phd-website-jwt"),
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeGateCategory = (event) => {
    this.setState({
      gateCategory: event.value,
    });
  };

  onChangegateQualified = (event) => {
    let x = event.target.value;
    this.setState({
      gateQualified: x,
    });
  };

  onChangeDate = (event) => {
    this.setState({
      gateDate: new Date(event.getTime() - event.getTimezoneOffset() * 60000),
    });
  };

  // FUNCTIONS FOR FILE DATA
  onFileChange = async (event) => {
    if (!event.target.files[0]) return;
    if (event.target.files[0].size > 1000000) {
      event.target.value = "";
      alert(`File size of ${event.target.name} exceeded by 1 MB`);
      return;
    }
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
          const docs = [...this.state.documentsUploaded];
          docs[i] = docUploaded;
          this.setState({ documentsUploaded: docs });
        }
      })
      .catch((err) => console.log(err.response || "error"));
  };

  validateData = () => {
    if (this.state.givenGate) {
      if (this.state.documentsUploaded.some((e) => e.type === docType.gate)) {
        this.setState({
          gate: {
            name: this.state.gate.name,
            error: false,
            display: this.state.gate.display,
          },
        });
      } else {
        this.setState({
          gate: {
            name: this.state.gate.name,
            error: true,
            display: this.state.gate.display,
          },
        });
      }

      this.state.gateDiscipline === ""
        ? this.setState({ errorGateDiscipline: true })
        : this.setState({ errorGateDiscipline: false });

      this.state.gateCategory === ""
        ? this.setState({ errorGateCategory: true })
        : this.setState({ errorGateCategory: false });

      this.state.gateQualified === ""
        ? this.setState({ errorgateQualified: true })
        : this.setState({ errorgateQualified: false });

      (/([0-9]+)(\.[0-9]+)/.test(this.state.gateScore) ||
        /^\d+$/.test(this.state.gateScore)) &&
      parseInt(this.state.gateScore) &&
      parseInt(this.state.gateScore) >= 0 &&
      parseInt(this.state.gateScore) <= 1000
        ? this.setState({ errorGateScore: false })
        : this.setState({ errorGateScore: true });

      (/([0-9]+)(\.[0-9]+)/.test(this.state.gateMarks) ||
        /^\d+$/.test(this.state.gateMarks)) &&
      parseInt(this.state.gateMarks) &&
      parseInt(this.state.gateMarks) >= 0 &&
      parseInt(this.state.gateMarks) <= 100
        ? this.setState({ errorGateMarks: false })
        : this.setState({ errorGateMarks: true });

      this.state.gateDate === ""
        ? this.setState({ errorGateDate: true })
        : this.setState({ errorGateDate: false });

      !this.state.gate.error
        ? this.setState({ errorGateDoc: false })
        : this.setState({ errorGateDoc: true });
    }

    this.state.optionsSelected.length < 1
      ? this.setState({ errorOptionsSelected: true })
      : this.setState({ errorOptionsSelected: false });
  };

  onNext = async (event) => {
    if (this.state.disabled) {
      this.props.nextStep(1);
    } else {
      await this.validateData();
      if (
        this.state.errorgateQualified === false &&
        this.state.errorGateScore === false &&
        this.state.errorGateMarks === false &&
        this.state.errorGateDate === false &&
        this.state.errorOptionsSelected === false &&
        this.state.errorGateDoc === false &&
        this.state.errorGateDiscipline === false &&
        this.state.errorGateCategory === false
      ) {
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
        this.setState({ confirmAlert: !this.state.confirmAlert });
        this.props.data.entranceDetails.isInterestedCoepRPET =
          this.state.isInterestedCoepRPET;

        this.props.data.entranceDetails.givenGate = this.state.givenGate;
        this.props.data.entranceDetails.Gate.gateQualified =
          this.state.gateQualified;
        this.props.data.entranceDetails.Gate.score = this.state.gateScore;
        this.props.data.entranceDetails.Gate.marks = this.state.gateMarks;
        this.props.data.entranceDetails.Gate.lastDateOfValidation =
          this.state.gateDate;
        this.props.data.entranceDetails.Gate.discipline =
          this.state.gateDiscipline;
        this.props.data.entranceDetails.Gate.category = this.state.gateCategory;
        this.props.data.entranceDetails.completed = true;
        // this.props.data.entranceDetails.docUploaded = this.state.docUploaded;
      }
    }
  };

  confirmData = (event) => {
    this.props.nextStep(1);

    const entranceDetails = {
      entranceDetails: this.props.data.entranceDetails,
    };
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

  deleteFile = (filename) => {
    axios.delete(BACKEND_URL + "/files/delete/" + filename, {
      headers: { "phd-website-jwt": this.state.token },
    });
  };

  handleSelect = (selectedList, selectedItem) => {
    if (selectedItem.id === 1) {
      this.setState({
        isInterestedCoepRPET: true,
        optionsSelected: selectedList,
      });
    } else if (selectedItem.id === 2) {
      this.setState({
        givenGate: true,
        optionsSelected: selectedList,
      });
    }
  };

  onRemove = (selectedList, selectedItem) => {
    if (selectedItem.id === 1) {
      this.setState({
        isInterestedCoepRPET: false,
        optionsSelected: selectedList,
      });
    } else if (selectedItem.id === 2) {
      const deletedDoc = this.state.documentsUploaded.find(
        (d) => d.type === docType.gate
      );
      if (deletedDoc) {
        this.deleteFile(deletedDoc.filename);
        const docsNew = this.state.documentsUploaded.filter(
          (d) => d.type !== docType.gate
        );
        this.setState({ documentsUploaded: docsNew });
      }
      this.setState({
        optionsSelected: selectedList,
        givenGate: false,
        gateScore: "",
        gateMarks: "",
        gateDate: "",
        gateDiscipline: "",
        gateCategory: "",
        gateQualified: "",
      });
    }
  };

  onCancel = () => {
    this.setState({
      confirmAlert: !this.state.confirmAlert,
    });
  };

  onBack = (event) => {
    this.props.prevStep(1);
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

            res.data.user.entranceDetails &&
              this.setState({
                givenGate: res.data.user.entranceDetails.givenGate
                  ? res.data.user.entranceDetails.givenGate
                  : false,
                isInterestedCoepRPET: res.data.user.entranceDetails
                  .isInterestedCoepRPET
                  ? res.data.user.entranceDetails.isInterestedCoepRPET
                  : false,

                gateDiscipline: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.discipline
                    ? res.data.user.entranceDetails.Gate.discipline
                    : ""
                  : "",

                gateCategory: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.category
                    ? res.data.user.entranceDetails.Gate.category
                    : ""
                  : "",

                gateScore: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.score
                    ? res.data.user.entranceDetails.Gate.score
                    : ""
                  : "",

                gateQualified: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.gateQualified
                    ? res.data.user.entranceDetails.Gate.gateQualified
                    : ""
                  : "",

                gateMarks: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.marks
                    ? res.data.user.entranceDetails.Gate.marks
                    : ""
                  : "",

                gateDate: res.data.user.entranceDetails.Gate
                  ? res.data.user.entranceDetails.Gate.lastDateOfValidation
                    ? res.data.user.entranceDetails.Gate.lastDateOfValidation
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
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  displayDocs(doc_type) {
    return this.state.documentsUploaded
      .filter((doc) => doc.type === this.state[doc_type].name)
      .map((doc, id) => {
        return (
          <div key={id}>
            <div className="docsPreviewDiv">
              <div className="docsPreviewFilename">
                {doc.originalName.slice(0, 10) + "...  "}
              </div>
              <DocViewer
                data={{
                  filename: doc.filename,
                  contentType: doc.contentType,
                  originalName: doc.originalName,
                }}
              />
            </div>
            <div>
              {doc.verification === "verified" && (
                <div className="docVerify" style={{ color: "green" }}>
                  Verified
                </div>
              )}
              {doc.verification === "mod_req" && (
                <div className="docVerify" style={{ color: "red" }}>
                  Modification Required
                </div>
              )}
            </div>
          </div>
        );
      });
  }

  render() {
    const dropdown_options_gate_category = [
      "General",
      "OBC (NCL)",
      "SC/ST/PWD",
    ];

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
                              GATE Discipline :{" "}
                            </div>
                            <div
                              style={{
                                marginLeft: "20px",
                              }}
                            >
                              {this.state.gateDiscipline}
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
                              GATE Category :{" "}
                            </div>
                            <div
                              style={{
                                marginLeft: "20px",
                              }}
                            >
                              {this.state.gateCategory}
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
                              GATE Qualified :{" "}
                            </div>
                            <div
                              style={{
                                marginLeft: "20px",
                              }}
                            >
                              {this.state.gateQualified}
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
                              GATE Score Valid upto :{" "}
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
                <Typography>Details of Exams</Typography>
                <Multiselect
                  disable={this.state.disabled}
                  options={this.state.options}
                  onRemove={this.onRemove}
                  onSelect={this.handleSelect}
                  placeholder="Details of Exams..."
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
                            <Typography>GATE Discipline</Typography>
                            <TextField
                              disabled={this.state.disabled}
                              className="mb-3"
                              variant="outlined"
                              label="GATE Discipline"
                              onChange={this.handleChange}
                              value={this.state.gateDiscipline}
                              name="gateDiscipline"
                              style={{ marginTop: "10px" }}
                              required
                            />
                            {this.state.errorGateDiscipline && (
                              <div style={{ color: "red" }}>
                                <Typography>
                                  Please enter GATE Discipline
                                </Typography>
                              </div>
                            )}
                          </div>

                          <div style={{ marginTop: "3px", paddingTop: "15px" }}>
                            <Typography style={{ marginBottom: "12px" }}>
                              GATE Category
                            </Typography>
                            <DropDown
                              disabled={this.state.disabled}
                              options={dropdown_options_gate_category}
                              name="gateCategory"
                              value={this.state.gateCategory}
                              onChange={this.onChangeGateCategory}
                              placeholder="Select GATE Category"
                              required
                            />

                            {this.state.errorGateCategory && (
                              <div style={{ color: "red" }}>
                                <Typography>
                                  Please select GATE Category
                                </Typography>
                              </div>
                            )}
                          </div>

                          <div style={{ marginTop: "3px", paddingTop: "15px" }}>
                            <Typography>GATE Score out of 1000</Typography>
                            <TextField
                              disabled={this.state.disabled}
                              className="mb-3"
                              variant="outlined"
                              label="GATE Score out of 1000"
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

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              <Typography>GATE Qualified</Typography>
                              <div style={{ marginTop: "4px" }}>
                                <input
                                  disabled={this.state.disabled}
                                  type="radio"
                                  value="Yes"
                                  name="gateQualified"
                                  checked={this.state.gateQualified === "Yes"}
                                  onChange={this.onChangegateQualified}
                                  style={{ marginLeft: "20px" }}
                                />
                                Yes
                                <input
                                  disabled={this.state.disabled}
                                  type="radio"
                                  value="No"
                                  name="gateQualified"
                                  checked={this.state.gateQualified === "No"}
                                  onChange={this.onChangegateQualified}
                                  style={{ marginLeft: "30px" }}
                                />{" "}
                                No
                              </div>
                              {this.state.errorgateQualified && (
                                <div style={{ color: "red" }}>
                                  <Typography>
                                    Please select correct option
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            style={{ marginTop: "10px", paddingTop: "15px" }}
                          >
                            <Typography>GATE score valid upto</Typography>
                            <DatePicker
                              disabled={this.state.disabled}
                              onChange={(date) => this.onChangeDate(date)}
                              value={
                                typeof this.state.gateDate === "string" &&
                                this.state.gateDate !== ""
                                  ? new Date(this.state.gateDate)
                                  : this.state.gateDate
                              }
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

                          <div
                            className="formContainer"
                            style={{ marginTop: "30px", fontSize: "21px" }}
                          >
                            Documents Required
                          </div>
                          <div style={{ opacity: "0.7", fontSize: "12px" }}>
                            (document size must be less than 1MB)
                          </div>

                          <Table>
                            <TableBody>
                              <div>
                                {/* Gate Marksheet */}
                                {this.state.gate.display ? (
                                  <div>
                                    <div className="field">
                                      <div>GATE Scorecard</div>
                                      <div>
                                        <input
                                          disabled={this.state.disabled}
                                          type="file"
                                          name={this.state.gate.name}
                                          onChange={this.onFileChange}
                                        />
                                        {this.state.gate.error ? (
                                          <div className="docsError">
                                            Please upload file
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {this.displayDocs("gate")}
                                      </div>
                                    </div>
                                    <Divider
                                      sx={{
                                        marginTop: "20px",
                                        marginBottom: "20px",
                                      }}
                                    />
                                  </div>
                                ) : (
                                  " "
                                )}
                              </div>
                            </TableBody>
                          </Table>
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
