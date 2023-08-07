import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const Radio = ({ dataLabel, submission }: Props) => {
  const { register } = useForm();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [optionSelected, setOptionSelected] = useState(false);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setOptionSelected(true);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (selectedOption !== "") {
      const data = { [dataLabel]: selectedOption };
      submission(data);
      setOptionSelected(false);
    } else {
      console.log("Please select an option.");
    }
  };

  useEffect(() => {
    setSelectedOption("");
  }, [dataLabel]);

  return (
    <form className="form-section" onSubmit={onSubmit}>
      <div className="check-options">
        <label className="option-label">
          Yes
          <input
            type="radio"
            value="Yes"
            {...register(dataLabel, { required: true })}
            onChange={handleOptionChange}
            checked={selectedOption === "Yes"}
          />
        </label>
        <label className="option-label">
          No
          <input
            type="radio"
            value="No"
            {...register(dataLabel, { required: true })}
            onChange={handleOptionChange}
            checked={selectedOption === "No"}
          />
        </label>
      </div>
      {!optionSelected && (
        <p className="error-message">Please select an option</p>
      )}
      <button className="btn btn-primary mt-4" type="submit" disabled={!optionSelected}>
        Submit
      </button>
    </form>
  );
};

export default Radio;
