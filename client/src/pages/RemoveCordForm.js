import { React, useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavBar from "../components/Navbar/Navbar";
import { TextField } from "@material-ui/core";
import { BACKEND_URL } from "../config";
import axios from "axios";

export default function RemoveCordForm() {
  const [mis, setMis] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mis) return alert("Fill the details");
    axios
      .post(BACKEND_URL + "/phdCords/remove/", { mis })
      .then((res) => {
        alert("user removed");
        setMis("");
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.error || "Invalid details");
      });
  };

  return (
    <>
      <NavBar loggedin={true} />
      <Container component="main" maxWidth="xs" style={{ marginTop: "90px" }}>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Remove Coordinator
          </Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid align="center">
              <Grid align="center" item xs={12}>
                <TextField
                  variant="outlined"
                  name="mis"
                  label="MIS*"
                  value={mis}
                  onChange={(e) => setMis(e.target.value)}
                />
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                    style={{ width: "100%", marginLeft: "2%" }}
                  >
                    Remove
                  </Button>
                </Grid>

                <Grid item xs>
                  <Link href="/Admin" variant="body2">
                    {"Go to dashboard"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
}
