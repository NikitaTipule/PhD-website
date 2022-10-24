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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../components/Sidebar";

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      title: "",
      link: "",
      token: localStorage.getItem("phd-website-jwt"),
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addLink = async () => {
    const data = {
      title: this.state.title,
      link: this.state.link,
    };
    try {
      await axios.post(BACKEND_URL + "/phdCords/addlink", data).then((res) => {
        //console.log("Link Added");
      });
    } catch (err) {
      console.log(err.res);
    }
    this.setState((prevState) => ({
      links: [...prevState.links, data],
    }));
  };

  removeLink = (value) => async (e) => {
    //console.log(value);
    try {
      await axios
        .post(BACKEND_URL + "/phdCords/removelink/:linkid", { _id: value })
        .then((res) => {
          //console.log("Link removed");
        });
    } catch (err) {
      console.log(err.res);
    }
    const data = this.state.links.filter(function (obj) {
      return obj._id !== value;
    });
    this.setState({ links: data });
  };

  async componentDidMount() {
    if (localStorage.getItem("phd-website-jwt")) {
      this.setState({
        token: localStorage.getItem("phd-webiste-jwt"),
      });
    }
    try {
      await axios
        .get(BACKEND_URL + "/phdCords/getalllinks", {
          headers: { "phd-website-jwt": this.state.token },
        })
        .then((res) => {
          this.setState({
            links: res.data,
          });
          //console.log(this.state.links);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <>
        <NavBar loggedin={true} />
        <div className="menu">
          {this.state.menu ? (
            <MenuIcon
              onClick={() => {
                this.setState({ menu: false });
              }}
            />
          ) : (
            <CloseIcon
              onClick={() => {
                this.setState({ menu: true });
              }}
            />
          )}
        </div>
        <div className="container">
          {!this.state.menu && <Sidebar className="mob" user="Admin" />}
          <Container
            component="main"
            max-width="sm"
            style={{ marginTop: "60px" }}
          >
            {/* <h1 style={{ alignItems: "center", textAlign: "center" }}>Links</h1> */}
            <div className="inputsRow">
              <div className="inputs">
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
              <div className="inputs">
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
            <div className="container-tab">
              <ul className="responsive-table">
                <li className="table-header item-head">
                  <div className="col col-1">Title</div>
                  <div className="col col-2">Links</div>
                  <div className="col col-3"></div>
                </li>
                {this.state.links
                  ? this.state.links.map((item) => (
                      <li className="table-row item-tab">
                        <div className="col col-1" data-label="Title">
                          {item.title}
                        </div>
                        <div className="col col-2" data-label="Link">
                          <a href={{}}>{item.link}</a>
                        </div>
                        <Button
                          id={item._id}
                          onClick={this.removeLink(item._id)}
                        >
                          <div className="col col-3" data-label="">
                            <DeleteIcon />
                          </div>
                        </Button>
                      </li>
                    ))
                  : " "}
              </ul>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default AddLink;
