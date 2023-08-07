import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const GroupSize = ({ dataLabel, submission }: Props) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [people, setPeople] = useState({});

  const handleChange = (data: FieldValues) => {
    setPeople({ ...people, ...data });
  };
  return (
    <div>
      <form className="form-section" onSubmit={handleSubmit(submission)} onChange={handleChange}>
        <input id="group-size"
          {...register(dataLabel, { required: true })}
          min={1}
          type="number"
        ></input>
        {errors[dataLabel]?.type === "required" && <p>Must select a group size</p>}
        <button className="btn btn-primary mt-4" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GroupSize;
