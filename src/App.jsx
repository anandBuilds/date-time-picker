import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DatePickerValue from "./components/date-time-picker/DateTimePicker";
// import DateTimePicker from './components/date-time-picker/DateTimePicker'

function App() {
  return (
    <>
      {/* <DateTimePicker/> */}
      <DatePickerValue />
    </>
  );
}

export default App;
