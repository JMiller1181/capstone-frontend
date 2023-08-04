import  { FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    submission: (data: object) => void;
}

const DateForm = ({submission}:Props) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [datesSelected, setDatesSelected] = useState(false);

      useEffect(() => {
      // Enable submission when startDate or endDate changes
        if (startDate && endDate) {
          setDatesSelected(true)
        }
      }, [startDate, endDate, submission]);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    }
    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(datesSelected) {
          const dateData = { Start: startDate, End: endDate };
          console.log(dateData);
          submission(dateData);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MM/dd/yyyy"
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
        <label>Select End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MM/dd/yyyy"
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );};

export default DateForm;
