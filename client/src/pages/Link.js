import { Component, React } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/Navbar/Navbar";
import { useForm, Form } from "./Form";
import Input from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
// import Box from "@material-ui/core/Box";

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      token: "",
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("phd-website-jwt")) {
      this.setState({
        token: localStorage.getItem("phd-webiste-jwt"),
      });
    }
    try {
      axios
        .get(BACKEND_URL + "/phdCords/getAllLinks", {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((res) => {
          this.setState({
            links: res.data.users,
          });
        });
    } catch (err) {
      console.log(err.message);
    }
  }
  render() {
    return (
      <>
        <NavBar loggedin={true} />
        <Container component="main" maxWidth="xs" style={{ marginTop: "90px" }}>
          <Box color="white" bgcolor="palevioletred" p={1}>
            {" "}
            <div
              style={{
                display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <div>hi</div>
              <div>hello</div>
            </div>
          </Box>
        </Container>
      </>
    );
  }
}

export default AddLink;
