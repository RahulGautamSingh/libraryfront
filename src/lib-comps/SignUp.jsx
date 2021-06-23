import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
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
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [image, setImage] = useState(null);
let history = useHistory()
  const signUpUrl = "http://localhost:3300/auth/signup";
  const signup = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image !== null) formData.append("photoUrl", image);
   
    let response = await fetch(signUpUrl, {
      method: "POST",
      body: formData,
    });

    if (response.status !== 200) {
      console.log(await response.text());
      setLoading(false);
      return;
    }
    let result = await response.json();
    console.log(result);
    setLoading(false);
    history.push("/login")
  };
  return (
    <Paper elevation={2} className={classes.container}>
      <Typography variant="h4">Sign Up</Typography>
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <TextField
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        accept="image/*"
        type="file"
        className={classes.hidden}
        onChange={(e) => setImage(e.target.files[0])}
        name="profilePic"
        id="profilePic"
      />
      <label htmlFor="profilePic">
        <Button variant="contained" color="primary" component="span">
          Upload Avatar
        </Button>
        {image?.name}
      </label>
      <Button
        variant="contained"
        type="raised"
        onClick={signup}
        color="primary"
        disabled={
          name === "" ||
          email === "" ||
          password === "" ||
          confirmPassword === ""
            ? true
            : false
        }
      >
        Submit
      </Button>
    </Paper>
  );
}
