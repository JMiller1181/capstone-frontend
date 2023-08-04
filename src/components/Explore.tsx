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
    } else {
      setSelectedChoice(false);
    }
  };

  return (
    <>
      <form>
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
      </form>

      {selectedChoice ? (
        <div className="adventure-options">
          <form onSubmit={handleSubmit(() => submission(explore))}>
            {adventureOptions.map((option) => (
              <label key={option}>
                {option}
                <input type="checkbox" name={option} onChange={handleCheck} />
              </label>
            ))}
            <button className="btn btn-primary" type="submit"></button>
          </form>
        </div>
      ) : <button className="btn btn-primary" onClick={() => submission({[dataLabel]: "No"})}>Next</button>}
    </>
  );
};

export default Explore;
