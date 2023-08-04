interface Props {
  itenerary: string;
  onClick: () => void;
}
const FinalPage = ({ itenerary, onClick }: Props) => {
  return (
    <>
      <div>{itenerary}</div>
      <button className="btn" onClick={onClick}>go home</button>
    </>
  );
};

export default FinalPage;
