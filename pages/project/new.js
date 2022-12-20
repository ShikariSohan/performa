import HeadComponent from "../../component/HeadComponent";
import Image from "next/image";
import { Inter } from "@next/font/google";
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
import { useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [ea, setEa] = useState("");
  const [cost, setCost] = useState("");
  const [timeSpan, setTimeSpan] = useState("");
  const [goal, setGoal] = useState("");
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  const handleProposalChange = (newValue) => {
    setValue(newValue);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handleEaChange = (e) => {
    setEa(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleLatChange = (e) => {
    setLat(e.target.value);
  };
  const handleLongChange = (e) => {
    setLong(e.target.value);
  };
  const handleCostChange = (e) => {
    setCost(e.target.value);
  };
  const handleTimeSpanChange = (e) => {
    setTimeSpan(e.target.value);
  };
  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  //const handle
  const SubmitHandler = (e) =>{
 e.preventDefault();
 const project = {
  title:title,
  projectId:id,
  ea:ea,
  location:location,
  lat:lat,
  long:long,
  cost:cost,
  timeSpan:timeSpan,
  proposalDate:value
 }
  axios.post("/api/project/new", project);
  }

  return (
    <>
      <Navbar />
      <Box sx={{ width: "70%", m: 4 }}>
        <Typography>Create new project..</Typography>
        <form onSubmit={SubmitHandler}>
          <TextField
            fullWidth
            label='Project Id'
            id='title'
            size='small'
            value={id}
            sx={{ mt: 1, mb: 2, width: "70ch" }}
            onChange={handleIdChange}
          />
          <TextField
            fullWidth
            label='Project Title'
            id='title'
            size='small'
            value={title}
            sx={{ mt: 1, mb: 2, width: "70ch" }}
            onChange={handleTitleChange}
          />
          <TextField
            label='Add Location'
            id='outlined-start-adornment'
            size='small'
            value={location}
            sx={{ mt: 1, mb: 2, width: "70ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleLocationChange}
          />

          <div>
            <TextField
              label='Lat'
              id='outlined-size-small'
              value={lat}
              size='small'
              sx={{ mr: 2 }}
              onChange={handleLatChange}
            />
            <TextField
              label='Long'
              id='outlined-size-normal'
              size='small'
              value={long}
              sx={{ mr: 2 }}
              onChange={handleLongChange}
            />
          </div>
          <TextField
            fullWidth
            label='Executing Agency'
            id='title'
            size='small'
            value={ea}
            sx={{ mt: 1, mb: 2, width: "70ch" }}
            onChange={handleEaChange}
          />
          <TextField
            label='Cost'
            id='outlined-start-adornment'
            size='small'
            value={cost}
            sx={{ mt: 1, mb: 2, width: "70ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleCostChange}
          />
          <TextField
            fullWidth
            label='Timespan'
            id='title'
            size='small'
            value={timeSpan}
            sx={{ mt: 1, mb: 2, width: "70ch" }}
            onChange={handleTimeSpanChange}
          />

          <TextField
            fullWidth
            label='Goal of the Project'
            id='goal'
            size='small'
            value={goal}
            sx={{ mt: 1, mb: 2, width: "70ch" }}
            onChange={handleGoalChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label='Proposal Date'
                inputFormat='MM/DD/YYYY'
                value={value}
                onChange={handleProposalChange}
                renderInput={(params) => (
                  <TextField sx={{ width: "70ch" }} {...params} />
                )}
              />
            </Stack>
          </LocalizationProvider>
          <Button type='submit' variant='contained' sx={{ m: 4 }}>
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}
