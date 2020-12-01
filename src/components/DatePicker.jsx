import React, { useState } from "react";
import "date-fns";
import "./styles/DatePicker.css";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function DatePicker(props) {
  const [selectedDate, setSelectedDate] = useState(props.date);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="date-picker">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            margin="normal"
            id="date-picker"
            format="MM/dd/yyyy"
            minDate={props.minDate}
            maxDate={props.maxDate}
            disablePast
            value={selectedDate}
            onChange={handleDateChange}
            InputProps={{
              disableUnderline: true,
            }}
            KeyboardButtonProps={{ "aria-label": "change date" }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default DatePicker;
