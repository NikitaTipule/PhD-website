import React, { Component } from "react";
import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import Multiselect from "multiselect-react-dropdown";

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
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.nextStep();
    event.persist();
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

  render() {
    return (
      <div
        style={{
          alignItems: "center",
          textAlign: "left",
          margin: "30px 10% 0 10%",
        }}
      >
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
