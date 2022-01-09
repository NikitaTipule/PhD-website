import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DocViewer = (props) => {
  const { filename, contentType, originalName } = props.data;
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 10000);
    axios
      .get(BACKEND_URL + "/files/get/" + filename, {
        headers: {
          "phd-website-jwt": localStorage.getItem("phd-website-jwt"),
        },
        responseType: "blob",
      })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: contentType });
        // Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        const w = window.open(
          fileURL,
          "",
          "width=800,height=600,left=200,top=200"
        );
        w.onload = function () {
          setLoading(false);
          w.document.title = originalName;
        };
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="previewIcon" onClick={onClick}>
      {loading ? (
        <CircularProgress size="1em" color="inherit" />
      ) : (
        <VisibilityIcon />
      )}
    </div>
  );
};

export default DocViewer;
