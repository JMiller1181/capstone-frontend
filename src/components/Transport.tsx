import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const Transport = ({ dataLabel, submission }: Props) => {
  const { handleSubmit } = useForm();

  const transportOptions = [
    "rent a car",
    "public transportation",
    "ride share services",
    "personal vehicle",
  ];

  const [transport, setTransport] = useState({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setTransport({ [dataLabel]: selectedOptions });
    console.log(transport);
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
      <form onSubmit={handleSubmit(() => submission(transport))}>
        {transportOptions.map((option) => (
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

export default Transport;
