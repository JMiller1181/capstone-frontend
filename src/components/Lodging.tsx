import { ChangeEvent,useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const Lodging = ({ dataLabel, submission }: Props) => {
  const { handleSubmit } = useForm();

  const lodgingOptions = [
    "luxury resorts",
    "mid-range hotels",
    "budget-friendly",
    "vacation rentals/boutique hotels",
  ];

    const [lodging, setLodging] = useState({});
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
      setLodging({ [dataLabel]: selectedOptions });
      console.log(lodging);
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
      <form onSubmit={handleSubmit(() => submission(lodging))}>
        {lodgingOptions.map((option) => (
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

export default Lodging;
