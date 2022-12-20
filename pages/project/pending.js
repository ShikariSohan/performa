import HeadComponent from "../../component/HeadComponent";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import Navbar from "../../component/Navbar/Navbar";

import {
  Typography,
  Box,
  TextField,
  Textarea,
  Stack,
  Button,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [proposals, setProposals] = useState([]);
  
  useEffect(() => {
    axios
      .get("/api/project/pending")
      .then((res) => {
        setProposals(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Navbar />
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ width: "70%", m: 4 }}>
          <h1>See Project Proposals</h1>
          {
            proposals.map((p)=>{
                return (
                  <div
                    style={{
                      backgroundColor: "rgba(117, 117, 117, 1.0)",
                      padding: "10pt",
                      margin: "10pt",
                    }}>
                    <h4>{p.name}</h4>
                    <h6>{p.exec}</h6>
                    <p>{p.goal}</p>
                    <Button
                      variant='contained'
                      size='small'
                      sx={{ background: "yellow" }}>
                      See Proposal
                    </Button>
                  </div>
                );
            })
          }
         
        </Box>
      </ThemeProvider>
    </>
  );
}
