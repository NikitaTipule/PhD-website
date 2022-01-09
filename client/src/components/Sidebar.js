import React from "react";
import { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import "../CSS/sidebar.css";

// import axios from "axios";
// import { BACKEND_URL } from "../config";
// import pic from "../images/logo1.png";

// import {
//   PDFDownloadLink,
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// const client = axios.create({
//   baseURL: BACKEND_URL
// });

// const styles = StyleSheet.create({
//   body: {
//     padding: 10,
//   },
//   table: {
//     display: "table",
//     width: "auto",
//     borderStyle: "solid",
//     borderColor: "#bfbfbf",
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   tableRow: {
//     margin: "auto",
//     flexDirection: "row",
//   },
//   tableColHeader: {
//     width: "100%",
//     borderStyle: "solid",
//     borderColor: "#bfbfbf",
//     borderBottomColor: "#000",
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCol: {
//     width: "25%",
//     borderStyle: "solid",
//     borderColor: "#bfbfbf",
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCellHeader: {
//     margin: "auto",
//     margin: 5,
//     fontSize: 12,
//     fontWeight: 500,
//   },
//   tableCell: {
//     margin: "auto",
//     margin: 5,
//     fontSize: 10,
//   },
//   declareHead: {
//     fontSize: 11,
//     marginTop: 10,
//   },
//   declare: {
//     fontSize: 11,
//   },
//   place: {
//     fontSize: 11,
//     marginTop: 25,
//   },
//   date: {
//     fontSize: 11,
//     textAlign: "left"
//   },
//   sign: {
//     fontSize: 11,
//     textAlign: "right"
//   },
//   view: {
//     width: '80%',
//     height: '80',
//     padding: 0,
//     marginBottom: 5,
//     backgroundColor: 'white',
//   },
//   image: {
//     objectFit: 'cover',
//   },
// });

// async componentDidMount() {
//     if (localStorage.getItem("phd-website-jwt")) {
//       await this.setState({
//         token: localStorage.getItem("phd-website-jwt"),
//       });
//       try {
//         axios
//           .get(BACKEND_URL + "/students/me", {
//             headers: { "phd-website-jwt": this.state.token },
//           })
//           .then((res) => {
//             const user = res.data.user;
//             this.setState({
//               pdfName: user.personalInfo.name,
//               pdfEmail: user.personalInfo.email,
//               middleName: user.personalInfo.middleName,
//               gender: user.personalInfo.gender,
//               category: user.personalInfo.category,
//               physicallyDisabled: user.personalInfo.physicallyDisabled,
//               dob: user.personalInfo.dob,
//               mobile: user.personalInfo.mobile,
//               cgpaUG: user.academicsUG.cgpa10,
//               degreeUG: user.academicsUG.degree,
//               instituteUG: user.academicsUG.institute,
//               specialUG: user.academicsUG.specialization,
//               cgpaPG: user.academicsPG.cgpa10,
//               degreePG: user.academicsPG.degree,
//               institutePG: user.academicsPG.institute,
//               percentPG: user.academicsPG.percentageMarks,
//               scoreGATE: user.entranceDetails?.Gate?.score,
//               name: user.name,
//               email: user.email,
//               mis: user.mis,
//               PGverification: user.academicsPG.verification,
//               PGremarks: user.academicsPG.remarks,
//               UGverification: user.academicsUG.verification,
//               UGremarks: user.academicsUG.remarks,
//               DOCverification: docver,
//               DOCremarks: "None",
//               ENTverification: user.entranceDetails.verification,
//               ENTremarks: user.entranceDetails.remarks,
//               FEEverification: user.feeDetails.verification,
//               FEEremarks: user.feeDetails.remarks,
//               PIverification: user.personalInfo.verification,
//               PIremarks: user.personalInfo.remarks,
//             });
//           });
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//   }

// pdfName: user.personalInfo.name,
// pdfEmail: user.personalInfo.email,
// middleName: user.personalInfo.middleName,
// gender: user.personalInfo.gender,
// category: user.personalInfo.category,
// physicallyDisabled: user.personalInfo.physicallyDisabled,
// dob: user.personalInfo.dob,
// mobile: user.personalInfo.mobile,
// cgpaUG: user.academicsUG.cgpa10,
// degreeUG: user.academicsUG.degree,
// instituteUG: user.academicsUG.institute,
// specialUG: user.academicsUG.specialization,
// cgpaPG: user.academicsPG.cgpa10,
// degreePG: user.academicsPG.degree,
// institutePG: user.academicsPG.institute,
// percentPG: user.academicsPG.percentageMarks,
// scoreGATE: user.entranceDetails?.Gate?.score,

function Sidebar({ user }) {
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   if (localStorage.getItem("phd-website-jwt")) {
  //     // console.log(localStorage.getItem("phd-website-jwt"))
  //     // setToken(localStorage.getItem("phd-website-jwt"));
  //     // console.log(token);
  //     try {
  //       async function getPost() {
  //         let response = await client.get("/students/me", {
  //           headers: { "phd-website-jwt": localStorage.getItem("phd-website-jwt")},
  //         });
  //         console.log(response.data);
  //         setData(response.data);
  //         console.log(data)
  //       }
  //       getPost();
  //     }catch (error) {
  //       console.log(error.message);
  //   }
  // }

  // }, []);

  // console.log(data);

  // const MyDoc = () => (
  //     <Document>
  //       <Page style={styles.body}>
  //       <View style={styles.view}>
  //         <Image style={styles.image} src={pic} alt="image"/>
  //       </View>
  //         <View style={styles.table}>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableColHeader}>
  //               <Text style={styles.tableCellHeader}>Personal Details</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Candidate's Full name</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.personalInfo.name}</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Father's Name</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.personalInfo.middleName}</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Mail id</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.personalInfo.email}</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Gender</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.personalInfo.gender}</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Category</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.personalInfo.category}</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Physically Disabled?</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>
  //                 {data.user.personalInfo.physicallyDisabled}
  //               </Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Date of Birth</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.personalInfo.dob}</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Mobile Number</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.personalInfo.mobile}</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableColHeader}>
  //               <Text style={styles.tableCellHeader}>Academics UG</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>CGPA</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>data.user.academicsUG.cgpa10}</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Degree</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.academicsUG.degree}</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Institute</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.academicsUG.institute}</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Specialization</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.academicsUG.specialization}</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableColHeader}>
  //               <Text style={styles.tableCellHeader}>Academics PG</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>CGPA</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.academicsPG.cgpa10}</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Degree</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.academicsPG.degree}</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Institute</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.academicsPG.institute}</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Percentage Marks</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.academicsPG.percentageMarks}</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableColHeader}>
  //               <Text style={styles.tableCellHeader}>Entrance Details</Text>
  //             </View>
  //           </View>
  //           <View style={styles.tableRow}>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>Score</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{data.user.entranceDetails?.Gate?.score}</Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}></Text>
  //             </View>
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}></Text>
  //             </View>
  //           </View>
  //         </View>
  //         <Text style={styles.declareHead}>
  //             Declaration:
  //         </Text>
  //         <Text style={styles.declare}>
  //         I have read all the rules of admission and after understanding these rules, I have filled this application form for
  //         admission to phD in COEP for the academic year 2020-21. The information given by me in this application is true to the best of my knowledge and belief. At any later state, if it is found that I have
  //         furnished wrong information and/or submitted false certificate(s), I am aware that my admission stands cancelled and
  //         fees paid by me will be forfeited. Further, I will be subject to legal and/or penal action as per the provisions of the law.
  //         </Text>
  //         <Text style={styles.place}>
  //           Place :
  //         </Text>
  //         <Text style={styles.date}>Date :</Text>
  //         <Text style={styles.sign}>Signature of Candidate</Text>
  //       </Page>
  //     </Document>
  //   );

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          if (val.user == user) {
            return (
              <li
                key={key}
                className="row"
                onClick={() => {
                  if (val.title == "Logout") {
                    localStorage.clear();
                    window.location.pathname = val.link;
                  }
                  // if(val.title == "Download Form"){

                  // }
                  else {
                    window.location.pathname = val.link;
                  }
                }}
              >
                {" "}
                <div id="icon">{val.icon}</div>{" "}
                <div id="title">{val.title}</div>
                {/* <div id="title">{val.title == "Download Form" ? <PDFDownloadLink style={{paddingLeft: "0px", textAlign: "left",}} document={<MyDoc />} fileName="Application.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Form') }
    </PDFDownloadLink> : val.title}</div> */}
              </li>
            );
          } else if (
            val.user == "Admin" &&
            user == "Coordinator" &&
            val.title == "Back"
          ) {
            return (
              <li
                key={key}
                className="row"
                onClick={() => {
                  if (val.title == "Logout") {
                    localStorage.clear();
                    window.location.pathname = val.link;
                  }
                  // if(val.title == "Download Form"){

                  // }
                  else {
                    window.location.pathname = val.link;
                  }
                }}
              >
                {" "}
                <div id="icon">{val.icon}</div>{" "}
                <div id="title">{val.title}</div>
                {/* <div id="title">{val.title == "Download Form" ? <PDFDownloadLink style={{paddingLeft: "0px", textAlign: "left",}} document={<MyDoc />} fileName="Application.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Form') }
    </PDFDownloadLink> : val.title}</div> */}
              </li>
            );
          } else if (user == "Coordinator" && val.title == "Back") {
          } else {
            return;
          }
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
