interface Props {
  questions: string[];
  userAnswers: { [key: string]: string };
}
const UserCheck = ({ userAnswers, questions }: Props) => {
  const answers = Object.values(userAnswers);

  return (
    <div className="card" id="user-check">
      <h3 id="user-check-title">Does everything here look alright?</h3>
      <div id="questions">
        {questions.map((question, index) => (
          <div key={index}>
            <strong id={index.toString()}>{question}</strong>
            <p>
              {Array.isArray(answers[index])
                ? answers[index].join(", ")
                : answers[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCheck;
