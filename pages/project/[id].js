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
//import { useRouter } from "next/router";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading2, setLoading2] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const [proposal, setProposal] = useState({});
  const [componants,setComponants] = useState([]);
   useEffect(() => {
    //const { id } = useParams();
    console.log(id);
    if(id){
    axios
      .get(`/api/project/proposal?id=${id}`)
      .then((res) => {
        console.log(res)
      setProposal(res.data.data.proposal[0]);
      setComponants(res.data.data.componant)
       setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [id]);

/*  useEffect(() => {
    async function getProject() {
      const res = await axios.get(
        `/api/project/proposal?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      console.log("from effect", id);

      if (id) {
        setProposal(res.data.proposal[0]);
        setLoading2(false);
        console.log(res.data.proposal[0]);
      }
    }
    if (id) getProject();
  }, [id]);
  */
  if (loading2)
    return (
        <h1>Loading...</h1>
    );
  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
        <h1>Project Proposal</h1>
        {proposal && (
          <Box sx={{ width: "70%", m: 4 }}>
            <h3>Project Id: {proposal.projectId}</h3>
            <h4>Project Name : {proposal.name}</h4>
            <h5>Project Goal : </h5>
            <p>{proposal.goal}</p>
            <h5>Location : {proposal.location}</h5>
            <h5>Latitude : {proposal.latitude}</h5>
            <h5>Longitude : {proposal.longitude}</h5>
            <h5>Exec : {proposal.exec}</h5>
            <h5>Timespan : {proposal.timespan} Year</h5>
            <h5>Cost : {proposal.cost} Cr</h5>
          </Box>

        )}
        {componants && componants.map((c,i)=>{
            return (
              <Box sx={{ width: "70%", m: 4 }}>
                <h5>Componant {i + 1}</h5>
                <h6>ID : {c.componant_id}</h6>
                <h6>Type : {c.componant_type}</h6>
                <h6>Budget Ratio : {c.budget_ratio}</h6>
              </Box>
            );
        })}
      </ThemeProvider>
  );
}
