import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const Explore = ({ dataLabel, submission }: Props) => {
  const { handleSubmit } = useForm();

  const adventureOptions = [
    "relax on the beach",
    "explore nature",
    "visit cultural sites",
  ];

  const [explore, setExplore] = useState({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState(false);
  const [radioActive, setRadioActive] = useState(false);

  useEffect(() => {
    setExplore({ [dataLabel]: selectedOptions });
    console.log(explore);
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

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "Yes") {
      setSelectedChoice(true);
      setRadioActive(true)
    } else {
      setSelectedChoice(false);
      setRadioActive(true);
    }
  };

  return (
    <>
      <form className="form-section">
        <div className=" check-options">
          <label className="option-label">
            Yes
            <input
              type="radio"
              name="option"
              value="Yes"
              onChange={handleOptionChange}
            />
          </label>
          <label className="option-label">
            No
            <input
              type="radio"
              name="option"
              value="No"
              onChange={handleOptionChange}
            />
          </label>
        </div>
        {!selectedChoice ? (
          <button
            className="btn btn-primary mt-4"
            onClick={() => {
              submission({ [dataLabel]: "No" });
            }}
            disabled={!radioActive}
          >
            Submit
          </button>
        ) : (
          <br></br>
        )}
      </form>

      {selectedChoice ? (
        <div>
          <form
            className="form-section"
            onSubmit={handleSubmit(() => submission(explore))}
          >
            <div className="check-options">
              {adventureOptions.map((option) => (
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
          </form>
        </div>
      ) : (
        <br></br>
      )}
    </>
  );
};

export default Explore;
