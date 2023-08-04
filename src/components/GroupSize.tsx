import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const GroupSize = ({ dataLabel, submission }: Props) => {
  const { register, handleSubmit } = useForm();
  const [people, setPeople] = useState({});

  const handleChange = (data: FieldValues) => {
    setPeople({ ...people, ...data });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submission)} onChange={handleChange}>
        <label>{dataLabel}</label>
        <input
          {...register(dataLabel, { required: true })}
          min={1}
          type="number"
        ></input>
        <button className="btn btn-primary" type="submit"></button>
      </form>
    </div>
  );
};

export default GroupSize;
