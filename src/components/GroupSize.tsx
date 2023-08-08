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
      <form
        className="form-section"
        onSubmit={handleSubmit(submission)}
        onChange={handleChange}
      >
        <input
          id="group-size"
          className={`focus-ring ${
            errors[dataLabel] ? "focus-ring-danger" : ""
          }`}
          {...register(dataLabel, { required: true })}
          min={0}
          type="number"
        ></input>
        <button
          className={`btn btn-${
            !errors[dataLabel] ? "primary" : "danger"
          } mt-4`}
          type="submit"
        >
          Submit
        </button>
          <p className={`error-message ${errors[dataLabel]?.type==="required" ? "visible":"invisible"}`}>Must select a group size</p>
      </form>
    </div>
  );
};

export default GroupSize;
