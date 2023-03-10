import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { TextField, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core";
import styles from "./RegisterForm.module.scss";
import { useState } from "react";
import {
  emailValidation,
  passwordStrength,
} from "../../client-side-js/validation";

const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #181733 inset" };
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function DarkTextField(props) {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [helperText, setHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passHelperText, setPassHelperText] = useState("");
  const [usercode, setUserCode] = useState("");
  //const [disable, setDisable] = useState(true);
  const handleUserCodeChange = (e) => {
    setUserCode(e.target.value);
  };
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  // mail change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(emailValidation(e.target.value));
    const { valid, msg } = emailValidation(e.target.value);
    if (valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    setHelperText(msg);
  };
  //phone number
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  // password change
  const handlePasswordChange = (e) => {
    if (passwordStrength(e.target.value)) {
      setPasswordError(true);
      setPassHelperText("*Password should be between 8 and 60 characters");
    } else {
      setPasswordError(false);
      setPassHelperText("");
    }
    setPassword(e.target.value);
  };
  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      usercode:usercode,
      email: email,
      password: password,
      role: value,
      name: name,
    };
    console.log(newUser);
    if (emailValidation(email).valid && !passwordStrength(password)) {
      props.onChangeSubmit(newUser);
      setEmail("");
      setPassword("");
    }
  };      

  return (
    <ThemeProvider theme={darkTheme}>
<form
        style={{ display: "flex", flexDirection: "column"}}
        onSubmit={handleSubmit}>
        <TextField
          helperText={helperText}
          label='User Id'
          id='UserId'
          size='small'
          value={usercode}
          sx={{ mt: 1, mb: 2 }}
          inputProps={{ style: inputStyle }}
          className={styles.style}
          type='text'
          onChange={handleUserCodeChange}
        />

        <TextField
          helperText={helperText}
          label='Email Address'
          id='email'
          size='small'
          value={email}
          sx={{ mt: 1, mb: 2 }}
          inputProps={{ style: inputStyle }}
          className={styles.style}
          type='email'
          onChange={handleEmailChange}
          error={emailError}
        />
        <TextField
          helperText={passHelperText}
          label='Enter Password'
          id='password'
          size='small'
          value={password}
          sx={{ mt: 1, mb: 2 }}
          inputProps={{ style: inputStyle }}
          className={styles.style}
          type='password'
          onChange={handlePasswordChange}
          error={passwordError}
        />
        <TextField
          label='Enter Name'
          inputProps={{ style: inputStyle }}
          className={styles.style}
          sx={{ mt: 1, mb: 2 }}
          onChange={handleNameChange}
          size='small'
          id='Name'
          value={name}
        />
        <FormControl>
          <FormLabel id='demo-row-radio-buttons-group-label'>
            Select Role
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={value}
            onChange={handleRadioChange}>
            <FormControlLabel
              sx={{ color: "white" }}
              value='EXEC'
              control={<Radio />}
              label='Executing Agency'
            />
            <FormControlLabel
              sx={{ color: "white" }}
              value='MOP'
              control={<Radio />}
              label='Ministry of Planning'
            />

            <FormControlLabel
              sx={{ color: "white" }}
              value='ECNEC'
              control={<Radio />}
              label='Executing Committee of the National Economic Council'
            />
            <FormControlLabel
              sx={{ color: "white" }}
              value='APP'
              control={<Radio />}
              label='Application Users'
            />
          </RadioGroup>
        </FormControl>
        <Button type='submit' variant='contained' className={styles.submit}>
          {props.buttonName}
        </Button>
      </form>
    </ThemeProvider>
  );
}

export default DarkTextField;
