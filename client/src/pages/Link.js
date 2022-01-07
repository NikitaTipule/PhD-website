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
import AddIcon from "@mui/icons-material/Add";
import "../CSS/links.css";
import CustomDialogContent from "../components/linkComponent";
import { CustomDialog, useDialog } from "react-st-modal";
// import Box from "@material-ui/core/Box";
import DeleteIcon from "@mui/icons-material/Delete";
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
        .get(BACKEND_URL + "/phdCords/getalllinks", {
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
        <Container
          component="main"
          max-width="sm"
          style={{ marginTop: "90px" }}
        >
          <h1 style={{ alignItems: "center", textAlign: "center" }}>Links</h1>
          <Button
            onClick={async () => {
              const result = await CustomDialog(<CustomDialogContent />, {
                title: "Custom Dialog",
                showCloseIcon: true,
              });
            }}
            variant="contained"
          >
            <AddIcon />
            Add Link
          </Button>
          <div class="container-tab">
            <ul class="responsive-table">
              <li class="table-header item-head">
                <div class="col col-1">Title</div>
                <div class="col col-2">Links</div>
                <div class="col col-3"></div>
              </li>
              {this.state.links.map((item) => (
                <li class="table-row item-tab">
                  <div class="col col-1" data-label="Title">
                    {item.title}
                  </div>
                  <div class="col col-2" data-label="Link">
                    <a href={{}}>{item.link}</a>
                  </div>
                  <Button>
                    <div class="col col-3" data-label="">
                      <DeleteIcon />
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </>
    );
  }
}

export default AddLink;
