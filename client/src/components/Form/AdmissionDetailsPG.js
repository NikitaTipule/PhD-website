import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import Multiselect from "multiselect-react-dropdown";
import SweetAlert from "react-bootstrap-sweetalert";

export default class AdmissionDetailsPG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      university: "",
      nomanclaure: "",
      marksObtained: "",
      totalMarks: "",
      cgpa: "",
      percentage: "",
      optionsSelected: [],
      options: [
        {
          name: "Want to appear for COEP's Reasearch Program Eligibility Test (RPET)",
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
      confirmAlert: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    // event.preventDefault();
    // event.persist();
    this.setState({ confirmAlert: !this.state.confirmAlert });
  };

  confirmData = (event) => {
    // event.preventDefault();
    this.props.nextStep();
    // event.persist();
    const UGData = {
      university: this.state.university,
      nomanclaure: this.state.nomanclaure,
      marksObtained: this.state.marksObtained,
      totalMarks: this.state.totalMarks,
      cgpa: this.state.cgpa,
      percentage: this.state.percentage,
      optionsSelected: this.state.optionsSelected,
    };
    console.log(UGData);
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
      <div
        style={{
          alignItems: "center",
          textAlign: "left",
          margin: "30px 10% 0 10%",
        }}
      >
        {/* Confirmation Alert */}
        <div>
          <SweetAlert
            title={"Admission Details - PG"}
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "left",
                  }}
                >
                  <div>
                    <Typography>University/Institute : </Typography>
                  </div>
                  <div>{this.state.university}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Nomanclaure of Degree :</Typography>
                  </div>
                  <div>{this.state.nomanclaure}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Marks Obtained :</Typography>
                  </div>
                  <div>{this.state.marksObtained}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Total Marks :</Typography>
                  </div>
                  <div>{this.state.totalMarks}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>CGPA :</Typography>
                  </div>
                  <div>{this.state.cgpa}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <Typography>Percentage :</Typography>
                  </div>
                  <div>{this.state.percentage}%</div>
                </div>
                <div>
                  <div>
                    <Typography>Details Regarding Entrance Exams :</Typography>
                  </div>
                  <div style={{ paddingLeft: "25px" }}>
                    {this.state.optionsSelected.map((str) => (
                      <div style={{ padding: "0 0 0 25", fontSize: "17px" }}>
                        {str.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </SweetAlert>
        </div>
        <div
          style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}
        >
          Academic Details - PG
        </div>
        <div className={"Form"}>
          <form onSubmit={this.onSubmit}>
            {/* 1. University/Institute of PG  */}
            <div style={{ marginBottom: "12px" }}>
              <Typography>University/Institute</Typography>
              <TextField
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.university}
                name="university"
                label="Univerity/Institute"
                variant="outlined"
                required
                style={{ marginTop: "8px" }}
              />
            </div>
            {/* 2. Nomanclaure of Degree  */}
            <div style={{ marginBottom: "12px" }}>
              <Typography>Nomanclaure of Degree</Typography>
              <TextField
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.nomanclaure}
                name="nomanclaure"
                label="Nomanclaure of Degree"
                variant="outlined"
                required
                style={{ marginTop: "8px" }}
              />
            </div>
            {/*
             * 4. Marks Obtained
             * 5. Total Marks
             */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <div>
                <Typography>Marks Obtained</Typography>
                <TextField
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.marksObtained}
                  name="marksObtained"
                  label="Marks Obtained"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
              </div>
              <div style={{ marginLeft: "30px" }}>
                <Typography>Total Marks</Typography>
                <TextField
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.totalMarks}
                  name="totalMarks"
                  label="Totals Marks"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
              </div>
            </div>
            {/*
             *   6. CGPA
             *   7. Percentage of Marks
             */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <div>
                <Typography>CGPA</Typography>
                <TextField
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.cgpa}
                  name="cgpa"
                  label="CGPA"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
              </div>
              <div style={{ marginLeft: "30px" }}>
                <Typography>Percentage</Typography>
                <TextField
                  className="mb-3"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.percentage}
                  name="percentage"
                  label="Percentage"
                  variant="outlined"
                  required
                  style={{ marginTop: "8px" }}
                />
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <Typography>Details Regarded Extrance Exams</Typography>
              <Multiselect
                options={this.state.options}
                onSelect={(selectedList, selectedItem) => {
                  this.state.optionsSelected = selectedList;
                }}
                placeholder="Details regarded extrance exams..."
                displayValue="name"
                style={{
                  searchBox: { minHeight: "50px", padding: "10px" },
                }}
              />
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
    );
  }
}
