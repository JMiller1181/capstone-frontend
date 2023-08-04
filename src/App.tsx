import { useState } from "react";
import FinalPage from "./components/FinalPage";
import Questionnaire from "./components/Questionnaire";
import "./styles/App.css";

function App() {
  const labels = [
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
  const text = [
    "What is your destination for the vacation?",
    "What are the dates of your vacation?",
    "Are you traveling alone or with others? If with others, how many people will be in your group?",
    "What type of activities do you enjoy?",
    "Are you looking for luxury resorts, mid-range hotels, budget-friendly options, or perhaps something unique like vacation rentals or boutique hotels?",
    "Are you interested in attending any cultural events, festivals, or shows while there?",
    "Are you looking to relax on the beach, explore nature, visit cultural sites, or engage in adventurous activities?",
    "What is your preferred mode of transportation during the vacation?",
    "Do you enjoy trying local cuisines and dining at different restaurants, or do you prefer to cook your meals?",
    "Are you interested in any adventurous or outdoor activities?",
    "Would you like to spend some time shopping for local products or souvenirs?",
    "Are you interested in taking any day trips to nearby attractions or locations outside of your main destination?",
    "Would you like to explore the nightlife scene to you during this vacation?",
    "Is there anything specific you'd like to include in your vacation that we haven't covered yet?",
  ];
  const [userData, setUserData] = useState({});
  const [itenerary, setItenerary] = useState(false);
  const handleFormSubmission = (formData: object) => {
    setUserData({ ...userData, ...formData });
    console.log(userData);
    setItenerary(true);
  };
  return (
    <>
      {!itenerary ? (
        <div
          id="card-container"
          className="d-flex justify-content-center align-items-center"
        >
          <Questionnaire
            onSubmit={handleFormSubmission}
            questions={text}
            dataLabels={labels}
          ></Questionnaire>
        </div>
      ) : (
        <FinalPage
          itenerary="Put itenerary here"
          onClick={() => console.log(userData)}
        />
      )}
    </>
  );
}

export default App;
