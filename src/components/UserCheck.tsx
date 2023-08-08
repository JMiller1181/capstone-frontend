
interface Props {
    questions: string[];
    userAnswers:{[key: string]: string}
}
const UserCheck = ({userAnswers, questions}:Props) => {
    const answers = Object.values(userAnswers)
  return (
    <div id="user-check">
      <div id="questions">
        {questions.map((question, index) => (
          <div><h5 id={index.toString()} key={index}>{question}</h5><p>{JSON.stringify(answers[index])}</p></div>
        ))}
      </div>
    </div>
  );
}

export default UserCheck