import { useState } from "react";
import FinalPage from "./components/FinalPage";
import Questionnaire from "./components/Questionnaire";
import "./styles/App.css";

function App() {
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
          <Questionnaire onSubmit={handleFormSubmission}></Questionnaire>
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
