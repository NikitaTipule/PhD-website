import { Component, React } from "react";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@material-ui/core";
import Container from "@mui/material/Container";
import NavBar from "../components/Navbar/Navbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import "../CSS/links.css";
// import Box from "@material-ui/core/Box";
import DeleteIcon from "@mui/icons-material/Delete";

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      title: "",
      link: "",
      token: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addLink = () => {
    const data = {
      title: this.state.title,
      link: this.state.link,
    };
    try {
      axios
        .post(BACKEND_URL + "/phdCords/addlink", data, {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((res) => {
          console.log("Link Added");
        });
    } catch (err) {
      console.log(err.res);
    }
  };

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
          <div className="inputsRow">
            <div style={{ width: "500px", margin: "3px" }}>
              <Typography>Title for Link</Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.title}
                name="title"
                label="Title"
                variant="outlined"
                required="true"
                style={{ marginTop: "2px" }}
              />
              {/* {this.state.errorMotherName && (
                <div style={{ color: "red" }}>
                  <Typography>Mother's Name is required field</Typography>
                </div>
              )} */}
            </div>
            <div style={{ width: "500px", margin: "3px" }}>
              <Typography>Link</Typography>
              <TextField
                disabled={this.state.disabled}
                className="mb-3"
                fullWidth
                onChange={this.handleChange}
                value={this.state.link}
                name="link"
                label="Link"
                variant="outlined"
                required="true"
                style={{ marginTop: "2px" }}
              />
              {/* {this.state.errorMotherName && (
                <div style={{ color: "red" }}>
                  <Typography>Mother's Name is required field</Typography>
                </div>
              )} */}
            </div>
            <Button
              onClick={this.addLink}
              variant="contained"
              style={{ height: "50px", margin: "3px" }}
            >
              <AddIcon />
              Add Link
            </Button>
          </div>
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
