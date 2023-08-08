import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
  options: string[];
}

const Checkboxes = ({ dataLabel, submission, options }: Props) => {
  const { handleSubmit } = useForm();

  const [choice, setChoice] = useState({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setChoice({ [dataLabel]: selectedOptions });
    console.log(choice);
  }, [dataLabel, selectedOptions]);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, name]);
      console.log(selectedOptions);
    } else {
      setSelectedOptions((selectedOptions) =>
        selectedOptions.filter((option) => option !== name)
      );
      console.log(selectedOptions);
    }
  };
  return (
    <div>
      <form
        className="form-section"
        onSubmit={handleSubmit(() => {
          submission(choice);
          setSelectedOptions([]);
        })}
      >
        <div className="check-options">
          {options.map((option) => (
            <label className="option-label p-2" key={option}>
              {option}
              <input type="checkbox" name={option} onChange={handleCheck} />
            </label>
          ))}
        </div>
        <button
          className="btn btn-primary mt-4"
          type="submit"
          disabled={selectedOptions.length === 0}
        >
          Submit
        </button>
          <p className={`error-message ${selectedOptions.length > 0 ? "invisible":"visible"}`}>
            Must select at least one option
          </p>
      </form>
    </div>
  );
};

export default Checkboxes;
