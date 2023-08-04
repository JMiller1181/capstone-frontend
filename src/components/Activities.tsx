import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const Activities = ({ dataLabel, submission }: Props) => {
  const options = ["1", "2", "3"];

  const { handleSubmit } = useForm();
  const [activities, setActivities] = useState({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
      setActivities({ [dataLabel]: selectedOptions });
      console.log(activities);
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
      <form onSubmit={handleSubmit(() => submission(activities))} >
        {options.map((option) => (
          <label key={option}>
            {option}
            <input type="checkbox" name={option} onChange={handleCheck} />
          </label>
        ))}
        <button className="btn btn-primary" type="submit"></button>
      </form>
    </div>
  );
};

export default Activities;
