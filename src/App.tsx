import { useState } from "react";
import FinalPage from "./components/FinalPage";
import Questionnaire from "./components/Questionnaire";
import { Configuration, OpenAIApi } from "openai";
import "./styles/App.css";

function App() {
  const [userData, setUserData] = useState({});
  const [itinerary, setItinerary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const configuration = new Configuration({
    organization: "org-Ln6nrybVYLHIb0codP6HfeRu",
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const labels = [
    "Location",
    "Start",
    "End",
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

  const handleFormSubmission = async (formData: any[]) => {
    try {
      setLoading(true);
      setError(null);
 
      const updatedUserData = labels.reduce(
        (acc, label, index) => ({ ...acc, [label]: formData[index] }),
        {}
      );
      
      setUserData(updatedUserData);

      const createPrompt = (userData: { Location?: any; Dates?: any; Start?: any; End?: any; People?: any; Lodging?: any; Activities?: any; Explore?: any; Food?: any; Outdoors?: any; Shopping?: any; }) => {
        const prompt = `I am thrilled to be going on vacation! My chosen destination is ${userData.Location}. I have planned a duration of stay ${userData.Dates} days of vacation, from ${userData.Start} to ${userData.End}, and I'll be traveling with ${userData.People} friends. We prefer staying in ${userData.Lodging}. During this vacation, our main goal is to have ${userData.Activities}. We are excited to explore ${userData.Location} and immerse ourselves in ${userData.Explore}. We're open to ${userData.Food}, we also enjoy cooking some of our meals. Please include the times to eat itinerary for simply breakfast, lunch, and dinner. At the end of the itinerary include a list of 25 local cuisines and dishes that we should try. For relaxation, we'd love to spend some time ${userData.Outdoors}. For adventure, we would love to spend some time to ${userData.Shopping}. We're flexible about the itinerary and would like a mix of pre-planned activities and some free time to explore on our own. Additionally, if there are any exciting festivals or events happening during our stay, we'd love to attend. Overall, we're looking forward to an unforgettable vacation filled with fun, relaxation, and amazing experiences in ${userData.Location}.`;
        console.log(prompt)
        return prompt;
      };

      const prompt = createPrompt(updatedUserData);

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "assistant", content: prompt }],
      });

      const response = completion.data.choices[0].message;
      console.log(response);

      setItinerary(response);
      setLoading(false);
    } catch (error) {
      console.error("Error while generating the itinerary:", error);
      setError("An error occurred while generating the itinerary.");
      setLoading(false);
    }
  };

  return (
    <>
      {!itinerary ? (
        <div
          id="card-container"
          className="d-flex justify-content-center align-items-center"
        >
          <Questionnaire onSubmit={handleFormSubmission}></Questionnaire>
        </div>
      ) : (
        <FinalPage
          itinerary={itinerary} // Fixed typo in "itenerary" to "itinerary"
          onClick={() => console.log(userData)}
        />
      )}
    </>
  );
}

export default App;
