import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const viewDoc = ({ filename, contentType, originalName }) => {
  axios
    .get(BACKEND_URL + "/files/get/" + filename, {
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
        w.document.title = originalName;
      };
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default viewDoc;
