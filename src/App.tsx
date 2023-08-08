import { useState } from "react";
import FinalPage from "./components/FinalPage";
import Questionnaire from "./components/Questionnaire";
import { Configuration, OpenAIApi } from "openai";
import "./styles/App.css";

function App() {
  const [userData, setUserData] = useState({});
  const [itinerary, setItinerary] = useState("");
  const [hasItinerary, setHasItinerary] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

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
    "Relaxation",
    "Transport",
    "Food",
    "Outdoors",
    "Shopping",
    "Trips",
    "Nightlife",
    "Additional",
  ];

  const createPrompt = (userData: any) => {
    const promptParts = [
      `I am thrilled to be going on vacation! My chosen destination is ${userData.Location}. 
      I have planned a duration of stay ${userData.Dates} days of vacation, from ${userData.Start} to ${userData.End}. 
      I'll be traveling with ${userData.People} friends.`,
      `During this vacation, our main goal is to have ${userData.Activities}. 
      We prefer staying in ${userData.Lodging}.`,
    ];

    if (userData.Explore === "Yes") {
      promptParts.push(`We are excited to explore ${userData.Location} and immerse ourselves in cultural events, festivals, and shows.`);
    }

    if (userData.Relaxation === "Yes") {
      promptParts.push(`For relaxation, we'd love to spend some time ${userData.Relaxation}.`);
    }

    promptParts.push(`As for transportation, we will be getting around by the following: ${userData.Transport}.`);

    if (userData.Outdoors === "Yes") {
      promptParts.push(`For adventure, we would love to spend some time to ${userData.Outdoors}.`);
    }

    if (userData.Shopping === "Yes") {
      promptParts.push(`We would love to spend some time to ${userData.Shopping}.`);
    }

    if (userData.Trips === "Yes") {
      promptParts.push(`We are interested in taking day trips to nearby sites outside ${userData.Location}.`);
    }

    if (userData.Additional && userData.Additional.trim() !== "") {      
      promptParts.push(`These are also some things I would like to do: ${userData.Additional}.`);
    }

    promptParts.push(`Start by giving me two paragraphs about the ${userData.Location}.
    With all this in mind, please create a day-by-day itinerary labeled with dates and activities. 
    Each day should include breakfast, lunch, and dinner, as well as 2-3 daytime activities.
    Please include the times to eat in the itinerary for breakfast, lunch, and dinner.
    At the end of the itinerary, include a list of 25 local cuisines and dishes that we should try.
    We're flexible about the itinerary and would like a mix of pre-planned activities and some free time to explore on our own.
    Additionally, if there are any exciting festivals or events happening during our stay, we'd love to attend.
    Overall, we're looking forward to an unforgettable vacation filled with fun, relaxation, and amazing experiences in ${userData.Location}.`);

    return promptParts.join("\n\n");
  };

  const handleFormSubmission = async (formData: any) => {
    try {
      setLoading(true);
      setError(null);
      setUserData(formData);

      const prompt = createPrompt(formData);

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
        
      });

      const response = completion.data.choices[0].message.content;
      console.log(response);

      setItinerary(response);
      setHasItinerary(true);
      setLoading(false);
    } catch (error) {
      console.error("Error while generating the itinerary:", error);
      setError("An error occurred while generating the itinerary.");
      setLoading(false);
    }
  };

  return (
    <>
      {!hasItinerary ? (
        <div
          id="card-container"
          className="d-flex justify-content-center align-items-center"
        >
          <Questionnaire onSubmit={handleFormSubmission}></Questionnaire>
        </div>
      ) : (
        <FinalPage
          itinerary={itinerary}
          onClick={() => console.log(userData)}
        />
      )}
    </>
  );
}

export default App;
