import { useEffect, useState, PureComponent } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

class MyWindowPortal extends PureComponent {
  constructor(props) {
    super(props);
    this.containerEl = null;
    this.externalWindow = null;
  }

  componentDidMount() {
    this.externalWindow = window.open(
      "",
      "",
      "width=800,height=600,left=200,top=200"
    );
    this.containerEl = this.externalWindow.document.createElement("div");
    this.externalWindow.document.body.appendChild(this.containerEl);

    this.externalWindow.document.title = "Document";
    // copyStyles(document, this.externalWindow.document);

    // update the state in the parent component if the user closes the
    // new window
    this.externalWindow.addEventListener("beforeunload", () => {
      this.props.onClose();
    });
  }

  componentWillUnmount() {
    // This will fire when this.state.showWindowPortal in the parent component becomes false
    // So we tidy up by just closing the window
    this.externalWindow.close();
  }

  render() {
    // The first render occurs before componentDidMount (where we open
    // the new window), so if container is null, return null
    // Append props.children to the container <div> in the new window
    return (
      this.containerEl &&
      ReactDOM.createPortal(this.props.children, this.containerEl)
    );
  }
}

const DocViewer = ({ filename, contentType, onClose }) => {
  const [fileURL, setFileURL] = useState(null);

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/files/get/" + filename, {
        responseType: "blob",
      })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: contentType });
        // Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        setFileURL(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    fileURL && (
      <MyWindowPortal onClose={onClose}>
        <iframe src={fileURL} width="100%" height="100%" title="document" />
      </MyWindowPortal>
    )
  );
};

export default DocViewer;

// "407e5ec9a35239d9e93b17f7dc5af51c1634111043524.pdf",
//  "49146c7c0461bad01b9403b7fb2f5ded1634101852424.png",
