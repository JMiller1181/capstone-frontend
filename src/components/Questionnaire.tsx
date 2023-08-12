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
    "Where are you planning to vacation? Please provide the city and state.",
    "What are your vacation dates?",
    "How many people will be in your group?",
    "What types of activities interest you?",
    "Do you prefer luxury resorts, mid-range hotels, budget options, or unique accommodations like vacation rentals?",
    "Are you interested in cultural events, festivals, or shows?",
    "What's your preferred vacation style: beach relaxation, nature exploration, cultural visits, or adventurous activities?",
    "How do you plan to get around during your vacation?",
    "Are you eager to experience local cuisines and dining?",
    "Do you seek outdoor or adventurous experiences?",
    "Is shopping for local products or souvenirs important to you?",
    "Do you want to take day trips to nearby attractions?",
    "Interested in exploring nightlife options?",
    "Is there anything specific you'd like to include in your vacation that we haven't covered yet?",
  ];

  const foodOptions = ["Dining at restaurants", "Cook your meals"];

  const activityOptions = [
    "Educational",
    "Relaxation",
    "Arts & Crafts",
    "Tourist Hotspots",
    "Sports & Recreation",
    "Culinary Adventures",
    "Wildlife Viewing",
    "Live Music & Concerts",
    "Historical Sites & Museums",
    "Outdoor Picnics",
    "Photography Expeditions",
    "Water Sports & Boating",
    "Spa & Wellness Treatments",
    "Theatre & Performing Arts",
    "Food Tours & Tastings",
    "Shopping & Local Markets",
    "Nature Hikes & Trails",
    "Cultural Workshops",
    "Wine & Brewery Tours",
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
        <div className="background">
          <div className="card">
            <div className="question">
              <h4>{questions[cardIndex]}</h4>
            </div>
            {components[cardIndex]}
          </div>
        </div>
      ) : (
        <div  id="user-check-box">
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
