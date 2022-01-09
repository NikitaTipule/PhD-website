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

export default function RemoveAccountForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(email && /$^|.+@.+..+/.test(email))) {
      return alert("Fill the details");
    }
    axios
      .post(BACKEND_URL + "/account-section/remove/", { email })
      .then((res) => {
        alert("user removed");
        setEmail("");
      })
      .catch((err) => {
        alert(err || "Invalid details");
      });
  };

  return (
    <>
      <NavBar loggedin={true} />
      <Container component="main" maxWidth="xs" style={{ marginTop: "90px" }}>
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Remove staff
          </Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid align="center">
              <Grid align="center" item xs={12}>
                <TextField
                  variant="outlined"
                  name="email"
                  label="Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
