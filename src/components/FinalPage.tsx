import React from "react";

interface Props {
  itinerary: string;
  onClick: () => void;
}

const FinalPage = ({ itinerary, onClick }: Props) => {
  const paragraphs = itinerary.split("\n\n");

  return (
    <div id="final-page" >
      <div id="itinerary">
        {paragraphs.map((paragraph, index) => (
          <>
            <p key={index}>{paragraph}</p>
            <hr></hr>
          </>
        ))}
      </div>
      <button id="go-home-button" className="btn btn-primary" onClick={onClick}>
        Back to Home
      </button>
    </div>
  );
};

export default FinalPage;
