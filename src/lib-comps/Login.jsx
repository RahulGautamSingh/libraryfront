import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "300px",
    marginLeft: "300px",
    marginTop: "50px",
    padding:"10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  hidden: {
    display: "none",
  },
});
export default function SignUp() {
  const classes = useStyles();
  let [loading, setLoading] = useState(false);
  let [email, setEmail] = useState("");
  let history = useHistory();
  let [password, setPassword] = useState("");

  const loginUrl = "http://localhost:3300/auth/login";
  const login = async (e) => {
    setLoading(true);
    let response = await fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      let result = await response.json();
        console.log(result)
      setLoading(false);
      return;
    }
    let result = await response.json();
    console.log(result)
    localStorage.setItem("token", JSON.stringify(result.access_token));
    localStorage.setItem("refreshToken", JSON.stringify(result.refresh_token));
    history.push("/");
    setLoading(false);
  };
  return (
    <Paper elevation={2} p={4} className={classes.container}>
      <Typography variant="h4">Login</Typography>

      <TextField
        label="Email"
        name="email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        type="raised"
        onClick={login}
        color="primary"
        disabled={email === "" || password === ""}
      >
       {!loading && "Login"}
       {loading && <CircularProgress color="secondary"/>}
      </Button>
    </Paper>
  );
}
