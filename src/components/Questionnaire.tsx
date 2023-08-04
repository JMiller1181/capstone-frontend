import { useState } from "react";

import Location from "./Location";
import DateForm from "./DateForm";
import GroupSize from "./GroupSize";
import Activities from "./Activities";
import Lodging from "./Lodging";
import Events from "./Events";
import Explore from "./Explore";
import Transport from "./Transport";
import Food from "./Food";
import Outdoors from "./Outdoors";
import Shopping from "./Shopping";
import Trips from "./Trips";
import Nightlife from "./Nightlife";
import Additional from "./Additional";

interface Props {
  dataLabels: string[];
  questions: string[];
  onSubmit: (data: object) => void;
}
const Questionnaire = ({ questions, onSubmit, dataLabels }: Props) => {
  //useState to track state objects
  const [cardIndex, setCardIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  //function to pass into components to collect answers
  const collectAnswer = (data: object) => {
    setUserAnswers({ ...userAnswers, ...data });
    console.log(userAnswers);
    cycleText();
  };
  //function to pass user answers to main
  const submitData = (data: object) => {
    onSubmit(data);
  };
  //function that makes the text change with every submission
  const cycleText = () => {
    if (cardIndex <= questions.length - 1) {
      setCardIndex((prevIndex) => prevIndex + 1);
    }
  };
  // array of components to be used
  const components = [
    <Location dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <DateForm submission={collectAnswer} />,
    <GroupSize dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Activities dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Lodging dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Events dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Explore dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Transport dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Food dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Outdoors dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Shopping dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Trips dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Nightlife dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Additional dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
  ];

  //Conditional rendering of components and Final page after all questions have been answered
  return (
    <div>
      <div>{questions[cardIndex]}</div>
      {components[cardIndex]}
      {cardIndex === questions.length && (
        <div>
          <h3>Does everything here look alright?</h3>
          <p></p>
          <button
            className="btn btn-primary"
            onClick={() => submitData(userAnswers)}
          >
            Yes! Create my itinerary!
          </button>
          <button className="btn btn-danger" onClick={() => setCardIndex(0)}>
            No! Take me back!
          </button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
