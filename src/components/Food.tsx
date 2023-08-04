import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const Food = ({ dataLabel, submission }: Props) => {
  const { handleSubmit } = useForm();

  const foodOptions = [
    "dining at different restaurants", "cook your meals",
  ];

  const [food, setFood] = useState({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setFood({ [dataLabel]: selectedOptions });
    console.log(food);
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
      <form onSubmit={handleSubmit(() => submission(food))}>
        {foodOptions.map((option) => (
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

export default Food;
