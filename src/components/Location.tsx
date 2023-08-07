import {  useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}
const Location = ({ dataLabel, submission }: Props) => {
    const {register, handleSubmit, formState: {errors}} = useForm()
  return (
      <form className="form-section" onSubmit={handleSubmit(submission)}>
        <input id="location"
          {...register(dataLabel, { required: true, minLength: 3 })}
        ></input>
        {errors[dataLabel]?.type === "required" && (
          <p className="error-message">A Destination is required</p>
        )}
        {errors[dataLabel]?.type === "minLength" && (
          <p className="error-message">Destination must be more than 3 characters long</p>
        )}
        <button className="btn btn-primary mt-4" type="submit">
          Submit
        </button>
      </form>
  );
};

export default Location;
