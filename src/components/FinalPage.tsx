import React from "react";

interface Props {
  itinerary: string;
  onClick: () => void;
}

const FinalPage = ({ itinerary, onClick }: Props) => {
  const paragraphs = itinerary.split("\n\n");

  return (
    <div id="final-page">
      <div id="itinerary">
        {paragraphs.map((paragraph, index) => (
          <div key={index}>
            {paragraph.split("\n").map((line, lineIndex) => (
              <p key={lineIndex}>
                {line.startsWith("- ") ? (
                  <span>&bull; {line.substring(2)}</span>
                ) : (
                  <span>
                    <strong>{line}</strong>
                  </span>
                )}
              </p>
            ))}
            <hr />
          </div>
        ))}
      </div>
      <button
  id="go-home-button"
  className="btn btn-primary"
  onClick={() => {
    onClick(); 
    window.location.reload(); 
  }}
>
  Back to Home
</button>
    </div>
  );
};

export default FinalPage;
