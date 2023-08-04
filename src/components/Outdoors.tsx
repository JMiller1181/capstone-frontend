import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const Outdoors = ({ dataLabel, submission }: Props) => {
  const [selectedOption, setSelectedOption] = useState({});

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption({ [dataLabel]: event.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (selectedOption !== "") {
      const data = selectedOption;
      console.log(data);
      submission(data);
    } else {
      console.log("Please select an option.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Yes
        <input
          type="radio"
          name="option"
          value="Yes"
          onChange={handleOptionChange}
        />
      </label>
      <label>
        No
        <input
          type="radio"
          name="option"
          value="No"
          onChange={handleOptionChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Outdoors;
