import styles from "../styles/Register.module.scss";
import Head from "next/head";
import RegisterForm from "../component/Register/Register";
import { Stack, Typography, Container, Grid, Button, Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { Password } from "@mui/icons-material";
import { TextField } from "@mui/material";
const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #181733 inset" };
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function Login() {

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
    const router = useRouter();

  const handleSubmit = async () => {
    const user = {email,password}
    console.log(user)
      await axios
      .post("/api/login", user)
      .then(function (res) {
        if(res.status==200)
        {
          router.push("/")
        }
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  
 
  return (
    <>
      <Head>
        <title>{`Login | Performa`}</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
        <Container
          className={styles.wrapper}
          style={{
            position: "relative",
            display: "flex",
            marginLeft: "0px",
            paddingLeft: "0px",
          }}>
          <Grid
            className={styles.grid}
            container
            spacing={0}
            direction='column'
            alignItems='center'>
            <Typography className={styles.text} sx={{ mb: 2 }}>
              Login to Performa!
            </Typography>
            {err == true ? (
              <Typography sx={{ color: "red" }}>{msg}</Typography>
            ) : (
              <Typography sx={{ color: "white" }}>{msg}</Typography>
            )}
            <Box style={{ paddingLeft: "40px" }}>
              <form
                style={{ display: "flex", flexDirection: "column" }}
                
              >
                <TextField
                  // helperText={helperText}
                  label='Email'
                  id='email'
                  size='small'
                  value={email}
                  sx={{ mt: 1, mb: 2 }}
                  className={styles.style}
                  inputProps={{ style: inputStyle }}
                  type='text'
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <TextField
                  //   helperText={passHelperText}
                  label='Enter Password'
                  id='password'
                  size='small'
                  value={password}
                  sx={{ mt: 1, mb: 2 }}
                  inputProps={{ style: inputStyle }}
                  className={styles.style}
                  type='password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  //   error={passwordError}
                />
                <Button
                  // type='submit'
                  variant='contained'
                  onClick={handleSubmit}
                  className={styles.submit}>
                  Login
                  on
                </Button>
              </form>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
