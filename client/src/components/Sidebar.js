import React from "react"
import {SidebarData} from './SidebarData'
import '../CSS/sidebar.css'
//import MyDocument from '../components/PdfGen';
// import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// Create Document Component
// const MyDocument = () => (
//   <Document>
//     <Page>
//       <Text>React-pdf</Text>
//     </Page>
//   </Document>
// );

function Sidebar({user}){
  return (
   <div className="Sidebar">
    <ul className="SidebarList">
     {SidebarData.map((val,key)=>{
      if(val.user == user){
        return(
          <li key={key} className="row" onClick={()=>{
            if(val.title == "Logout"){
              localStorage.clear();
              window.location.pathname = val.link
            }
            // if(val.title == "Download Form"){
              
            // }
            else{
              window.location.pathname = val.link
            }
          }}>
          {" "}

          <div id="icon">{val.icon}</div>{" "}
          <div id="title">{val.title}</div>
          {/* <div id="title">{val.title == "Download Form" ? <PDFDownloadLink style={{paddingLeft: "0px", textAlign: "left",}} document={<MyDocument />} fileName="Application.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Form') }
    </PDFDownloadLink> : val.title}</div> */}
          </li>
        )
      }
      else{
        return
      }
     })}
    </ul>
   </div>
  )
}

export default Sidebar;