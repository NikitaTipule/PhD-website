import { React } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import pic from "../images/logo1.png";
import { saveAs } from "file-saver";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "100%",
    borderStyle: "solid",
    backgroundColor: "#BEBEBE",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: "25%",
    borderStyle: "solid",
    backgroundColor: "#E8E8E8",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2: {
    width: "50%",
    borderStyle: "solid",
    backgroundColor: "#E8E8E8",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  declareHead: {
    fontSize: 11,
    marginTop: 10,
  },
  declare: {
    fontSize: 11,
  },
  place: {
    fontSize: 11,
    marginTop: 25,
  },
  date: {
    fontSize: 11,
    textAlign: "left",
  },
  sign: {
    fontSize: 11,
    textAlign: "right",
  },
  view: {
    width: "60%",
    // height: "120",
    padding: 0,
    marginBottom: 5,
    backgroundColor: "white",
    alignSelf: "center",
  },
  image: {
    objectFit: "cover",
  },
});

const MyDoc = (props) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.view}>
          <Image style={styles.image} src={pic} alt="image" />
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={{ ...styles.tableCellHeader, fontWeight: "600" }}>
                APPLICATION ID :
                {props.applicationId ? props.applicationId : null}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Personal Details</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Candidate's Full name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.personalInfo.name}</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Father's Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.personalInfo.middleName}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Application ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.applicationId ? props.applicationId : null}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Aadhar</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.personalInfo.aadhar}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Mail id</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.email}</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Gender</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.personalInfo.gender}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Category</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.personalInfo.category}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Physically Challenged(PH)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.personalInfo.physicallyDisabled}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Employed</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.personalInfo.employed}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>MH State Candidature</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.personalInfo.domicile}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Date of Birth</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.personalInfo.dob
                  ? props.personalInfo.dob.slice(0, 10)
                  : props.personalInfo.dob}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Mobile Number</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.mobile}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Mother's Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.personalInfo.motherName}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>{""}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{""}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Academics UG</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>CGPA</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.academicsUG.cgpa10}</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Percentage Marks</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.academicsUG.percentageMarks}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Degree</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.academicsUG.degree}</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Institute</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.academicsUG.institute}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Branch</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.academicsUG.specialization}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{""}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Academics PG</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCell}>Status</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>{props.academicsPG.status}</Text>
            </View>
            {/* <View style={styles.tableCol1}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {""}
              </Text>
            </View> */}
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Degree</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.academicsPG.degree}</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Institute</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.academicsPG.institute}
              </Text>
            </View>
          </View>

          {props.academicsPG.status === "Passed" && (
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>CGPA</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.academicsPG.cgpa10}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Percentage Marks</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {props.academicsPG.percentageMarks}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Branch</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.academicsPG.branch}</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Specialization Branch</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.academicsPG.specialization}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Entrance Details</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCell}>
                Is Interested in COEP Tech RPET
              </Text>
            </View>
            <View style={styles.tableCol3}>
              {props.entranceDetails.isInterestedCoepRPET ? (
                <Text style={styles.tableCell}>Yes</Text>
              ) : (
                <Text style={styles.tableCell}>No</Text>
              )}
            </View>
          </View>
          {/* Gate Details  */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Given GATE</Text>
            </View>
            <View style={styles.tableCol}>
              {props.entranceDetails.givenGate ? (
                <Text style={styles.tableCell}>Yes</Text>
              ) : (
                <Text style={styles.tableCell}>No</Text>
              )}
            </View>

            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>GATE Qualified</Text>
            </View>
            {props.entranceDetails.givenGate ? (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                {props.entranceDetails.Gate.gateQualified}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                -
              </Text>
            )}
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>GATE Discipline</Text>
            </View>
            {props.entranceDetails.givenGate ? (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                {props.entranceDetails.Gate.discipline}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                -
              </Text>
            )}
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>GATE Category</Text>
            </View>
            {props.entranceDetails.givenGate ? (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                {props.entranceDetails.Gate.category}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                -
              </Text>
            )}
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>GATE Score</Text>
            </View>
            {props.entranceDetails.givenGate ? (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                {props.entranceDetails.Gate.score}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                -
              </Text>
            )}
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>GATE Score Valid upto</Text>
            </View>
            {props.entranceDetails.givenGate ? (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                {props.entranceDetails.Gate.lastDateOfValidation
                  ? props.entranceDetails.Gate.lastDateOfValidation.slice(0, 10)
                  : props.entranceDetails.Gate.lastDateOfValidation}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.tableCol,
                  fontSize: "10px",
                  fontWeight: "300",
                  paddingTop: "5px",
                  paddingLeft: "5px",
                }}
              >
                -
              </Text>
            )}
          </View>
        </View>
        <Text style={styles.declareHead}>Declaration:</Text>
        <Text style={styles.declare}>
          I have read all the rules of admission and after understanding these
          rules, I have filled this application form for admission to Ph.D. in
          COEP Technological University for the academic year 2023-24. The
          information given by me in this application is true to the best of my
          knowledge and belief. At any later state, if it is found that I have
          furnished wrong information and/or submitted false certificate(s), I
          am aware that my admission stands cancelled and fees paid by me will
          be forfeited. Further, I will be subject to legal and/or penal action
          as per the provisions of the law.
        </Text>
        <Text style={styles.place}>Place :</Text>
        <Text style={styles.date}>Date :</Text>
        <Text style={styles.sign}>Signature of Candidate</Text>
      </Page>
    </Document>
  );
};

// candidate can download his application using candidateid = null
// cords and admin can download any candidate's application using candidateId
export default function downloadApplicationPDF(candidateID = null, token) {
  let url = "";
  if (!candidateID) {
    url = BACKEND_URL + "/students/me";
  } else {
    url = BACKEND_URL + "/students/" + candidateID;
  }
  axios
    .get(url, { headers: { "phd-website-jwt": token } })
    .then(async (res) => {
      const user = res.data.user;
      const blob = await pdf(<MyDoc {...user} />).toBlob();
      saveAs(blob, `${user.applicationId}.pdf`);
    })
    .catch((err) => {
      console.log(err);
      alert("could not download application. Try again");
    });
}
