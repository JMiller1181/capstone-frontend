interface Props {
  itinerary: string;
  onClick: () => void;
}
const FinalPage = ({ itinerary, onClick }: Props) => {
  return (
    <>
      <div>{itinerary}</div>
      <button className="btn" onClick={onClick}>go home</button>
    </>
  );
};

export default FinalPage;
