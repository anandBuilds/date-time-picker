import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Popper,
  Select,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Import calendar icon

export default function DatePickerValue() {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("AM");
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (date && hour !== "" && minute !== "") {
      const formattedDate = dayjs(date)
        .hour(period === "AM" ? parseInt(hour) % 12 : (parseInt(hour) % 12) + 12)
        .minute(parseInt(minute))
        .format("YYYY-MM-DD HH:mm A");
      setValue(formattedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        id="datetime-local"
        label="Date and time picker"
        value={value}
        onClick={handleClick}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <CalendarMonthIcon />
            </InputAdornment>
          ),
        }}
      />

      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <Paper elevation={3}>
          <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
          <Stack direction="row" spacing={2} sx={{ p: 2 }}>
            <TextField
              id="time-hour"
              label="HH"
              type="number"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              sx={{ width: 80 }}
              inputProps={{ min: 1, max: 12 }}
            />
            <TextField
              id="time-min"
              label="MM"
              type="number"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              sx={{ width: 80 }}
              inputProps={{ min: 0, max: 59 }}
            />
            <FormControl sx={{ width: 80 }}>
              <Select
                id="am-pm-select"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ p: 2 }}>
            <Button onClick={handleClose}>Set</Button>
            <Button onClick={() => setAnchorEl(null)}>Cancel</Button>
          </Stack>
        </Paper>
      </Popper>
    </LocalizationProvider>
  );
}
