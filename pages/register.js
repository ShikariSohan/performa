import styles from "../styles/Register.module.scss";
import Head from "next/head";
import RegisterForm from "../component/Register/Register";
import { Stack, Typography, Container, Grid, Button, Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { Password } from "@mui/icons-material";

export default function Register() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const handleSubmitForm = async (enteredEmailAndPassword) => {
    const user = {
      ...enteredEmailAndPassword,
    };
    console.log(user);
    await axios
      .post("/api/register", user)
      .then(function (res) {
        setMsg(res.data.msg);
        setErr(res.data.err);
        console.log(res);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  return (
    <>
      <Head>
        <title>{`Register | Performa`}</title>
      </Head>
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
            Register to Performa!
          </Typography>
          {err == true ? (
            <Typography sx={{ color: "red" }}>{msg}</Typography>
          ) : (
            <Typography sx={{ color: "white" }}>{msg}</Typography>
          )}
          <Box style={{paddingLeft:'40px'}}>
            <RegisterForm
              buttonName='Register'
              onChangeSubmit={handleSubmitForm}
            />
          </Box>
        </Grid>
      </Container>
    </>
  );
}
