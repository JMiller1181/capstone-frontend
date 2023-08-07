import { useForm } from "react-hook-form";

interface Props {
  dataLabel: string;
  submission: (data: object) => void;
}

const Additional = ({ dataLabel, submission }: Props) => {
    const { register, handleSubmit } = useForm();
    return (
      <div>
        <form className="form-section" onSubmit={handleSubmit(submission)}>
          <input {...register(dataLabel)} id="location"></input>
          <button className="btn btn-primary mt-4" type="submit">Submit</button>
        </form>
      </div>
    );
};

export default Additional;
