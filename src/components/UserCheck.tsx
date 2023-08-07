
interface Props {
    questions: string[];
    userAnswers:{[key: string]: string}
}
const UserCheck = ({userAnswers, questions}:Props) => {
    const answers = Object.values(userAnswers)
  return (
    <div id="user-check">
      <div id="questions">
        {questions.map((question) => (
          <p>{question}</p>
        ))}
      </div>
      <div id="answers">
        {answers.map((answer, index) => (
          <p key={index}>{JSON.stringify(answer)}</p>
        ))}
      </div>
    </div>
  );
}

export default UserCheck