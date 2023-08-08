import { useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}
const Location = ({ dataLabel, submission }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form className="form-section" onSubmit={handleSubmit(submission)}>
      <input
        id="location"
        className={`focus-ring ${errors[dataLabel] ? "focus-ring-danger" : ""}`}
        {...register(dataLabel, { required: true, minLength: 3 })}
      ></input>
      <button
        className={`btn btn-${!errors[dataLabel] ? "primary" : "danger"} mt-4`}
        type="submit"
      >
        Submit
      </button>
      <p
        className={`error-message ${
          errors[dataLabel] ? "visible" : "invisible"
        }`}
      >
        {errors[dataLabel]?.type === "required"
          ? "A Destination is required"
          : "Destination must be more than 3 characters long"}
      </p>
    </form>
  );
};

export default Location;
