import { useState } from "react";
import FinalPage from "./components/FinalPage";
import Questionnaire from "./components/Questionnaire";
import { Configuration, OpenAIApi } from "openai";
import "./styles/App.css";
import { LinearProgress } from '@mui/material';
// import LinearProgress  from "@mui/material/LinearProgress";

function App() {
  //This might not be necessary, maybe delete
  const [userData, setUserData] = useState({});
  const [itinerary, setItinerary] = useState("");
  const [hasItinerary, setHasItinerary] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const configuration = new Configuration({
    organization: "org-Ln6nrybVYLHIb0codP6HfeRu",
    apiKey: "Your key",
  });
  const openai = new OpenAIApi(configuration);
  //I don't think this is being used, maybe delete
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
      `During this vacation, our main goal is to do the follow activities:  ${userData.Activities}. 
      We prefer staying in ${userData.Lodging}.`, `Ways we like to eat are: ${userData.Food}`, 
      `As for transportation, we will be getting around by the following: ${userData.Transport}.`
    ];

    if (userData.Explore === "Yes") {
      promptParts.push(`We are excited to explore ${userData.Location} and immerse ourselves in cultural events, festivals, and shows.`);
    }

    if (userData.Relaxation === "Yes") {
      promptParts.push(`For relaxation, we'd love to spend some time ${userData.Relaxation}.`);
    }

    if (userData.Outdoors === "Yes") {
      promptParts.push(`For adventure, we would love to spend some time to ${userData.Outdoors}.`);
    }

    if (userData.Shopping === "Yes") {
      promptParts.push(`We would love to spend some time to ${userData.Shopping}. So include any malls or notable shopping areas.`);
    }

    if (userData.Trips === "Yes") {
      promptParts.push(`We are interested in taking day trips to nearby sites outside ${userData.Location}.`);
    }

    if (userData.Nightlife === "Yes") {
      promptParts.push(`We would love to explore the nightlfe so please recommend local bars and clubs`);
    }

    if (userData.Additional && userData.Additional.trim() !== "") {      
      promptParts.push(`These are also some things I would like to do: ${userData.Additional}.`);
    }
   
    return promptParts.join("\n\n");
  };

  const systemConfig = [
    `With all this in mind and all the up to date knowledge that you have up to 2021 you will create a day-by-day itinerary. 
    Please label each day with dates. Start by giving me 2 to 3 paragraphs about ${userData.Location}.
    Include the exact time of the day for each meal and actvity suggested starting between 7am to 10am each day. 
    Each day should include breakfast, lunch, and dinner, as well as 3-4 daytime activities, excluding meals. 
    At the end of the itinerary, include a list of 25 local cuisines and dishes that we should try, along with the best places to eat in the area. 
    Also list 25 other actvities we can do while in ${userData.Location}. `
  ]

  const handleFormSubmission = async (formData: any) => {
    try {
      setLoading(true);
      setError(null);
      setUserData(formData);

      const prompt = createPrompt(formData);

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `You are a helpful an expert travel assistant` + systemConfig },
          {role: "user", content: prompt}
      ],
        
      });

      const response = completion.data.choices[0].message.content;
      console.log(response);

      setItinerary(response);
      setHasItinerary(true);
    } catch (error) {
      console.error("Error while generating the itinerary:", error);
      setError("An error occurred while generating the itinerary.");
    }
    finally {
      setLoading(false);
    }
  };

//   const loadingPic = () =>(
//     <div id="card-container"
//     className="d-flex justify-content-center align-items-center">
//           <img src='loader.jpg' alt="Loading" />
//     </div>
//  )

 const loadingPic = () => (
  <div
    id="loading"
    className="d-flex justify-content-center align-items-center"
  >
          <img src='src/loader.jpg' alt="Loading" />       
  </div>  
);

// const loadingBar = () => (
// <div className="d-flex justify-content-center align-items-center">
// <LinearProgress color="secondary" />
// <LinearProgress color="success" />
// </div> 
// );

  return (
    <>
      { loading ? (loadingPic()) : !hasItinerary ? (
        <div
          id="card-container"
          className="d-flex justify-content-center align-items-center"
        >
          <Questionnaire onSubmit={handleFormSubmission}></Questionnaire>
        </div>
      ) : (
        <FinalPage
          itinerary={itinerary}
          onClick={() => setHasItinerary(false)}
        />
      )}
    </>
  );
}

export default App;
