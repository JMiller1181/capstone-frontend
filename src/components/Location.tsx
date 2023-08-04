import {  useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}
const Location = ({ dataLabel, submission }: Props) => {
    const {register, handleSubmit} = useForm()
  return (
    <div>
      <form onSubmit={handleSubmit(submission)}>
        <label>{dataLabel}</label>
        <input {...register(dataLabel)}></input>
        <button className="btn btn-primary" type="submit"></button>
      </form>
    </div>
  );
};

export default Location;
