import { useState } from "react";

import Location from "./Location";
import DateForm from "./DateForm";
import GroupSize from "./GroupSize";
import Explore from "./Explore";
import Additional from "./Additional";
import Checkboxes from "./Checkboxes";
import Radio from "./Radio";
import UserCheck from "./UserCheck";

interface Props {
  onSubmit: (data: object) => void;
}
const Questionnaire = ({ onSubmit }: Props) => {
  const dataLabels = [
    "Location",
    "Dates",
    "People",
    "Activities",
    "Lodging",
    "Events",
    "Explore",
    "Transport",
    "Food",
    "Outdoors",
    "Shopping",
    "Trips",
    "Nightlife",
    "Additional",
  ];
  const questions = [
    "What is your destination for the vacation? Please put both city and state.",
    "What are the dates of your vacation?",
    "How many people other than you will be in your group?",
    "What type of activities are you interested in?",
    "Are you looking for luxury resorts, mid-range hotels, budget-friendly options, or perhaps something unique like vacation rentals?",
    "Are you interested in attending any cultural events, festivals, or shows while there?",
    "Are you looking to relax on the beach, explore nature, visit cultural sites, or engage in adventurous activities?",
    "What is your preferred mode of transportation during the vacation?",
    "Do you enjoy trying local cuisines and dining at different restaurants, or do you prefer to cook your meals?",
    "Are you interested in any adventurous or outdoor activities?",
    "Would you like to spend some time shopping for local products or souvenirs?",
    "Are you interested in taking any day trips to nearby attractions or locations outside of your main destination?",
    "Would you like to explore the nightlife scene to you during this vacation?",
    "Is there anything specific you'd like to include in your vacation that we haven't covered yet? Please be detailed.",
  ];

  const foodOptions = ["Dining at restaurants", "Cook your meals"];

  const activityOptions = [
    "Educational",
    "Relaxation",
    "Arts & Crafts",
    "Tourist Hotspots",
  ];

  const lodgingOptions = [
    "Luxury resorts",
    "Mid-range hotels",
    "Budget-friendly",
    "Vacation rentals",
  ];

  const transportOptions = [
    "Rent a car",
    "Public transportation",
    "Ride share services",
    "Personal vehicle",
  ];

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
    <DateForm dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <GroupSize dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Checkboxes
      options={activityOptions}
      dataLabel={dataLabels[cardIndex]}
      submission={collectAnswer}
    />,
    <Checkboxes
      options={lodgingOptions}
      dataLabel={dataLabels[cardIndex]}
      submission={collectAnswer}
    />,
    <Radio dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Explore dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Checkboxes
      options={transportOptions}
      dataLabel={dataLabels[cardIndex]}
      submission={collectAnswer}
    />,
    <Checkboxes
      options={foodOptions}
      dataLabel={dataLabels[cardIndex]}
      submission={collectAnswer}
    />,
    <Radio dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Radio dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Radio dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Radio dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
    <Additional dataLabel={dataLabels[cardIndex]} submission={collectAnswer} />,
  ];

  //Conditional rendering of components and Final page after all questions have been answered
  return (
    <>
      {cardIndex < questions.length ? (
        <div className="card">
          <div className="question">
            <h4>{questions[cardIndex]}</h4>
          </div>
          {components[cardIndex]}
        </div>
      ) : (
        <div id="user-check-box">
          <h3>Does everything here look alright?</h3>
          <UserCheck questions={questions} userAnswers={userAnswers} />
          <div id="button-container">
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
        </div>
      )}
    </>
  );
};

export default Questionnaire;
