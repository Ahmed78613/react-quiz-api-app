import React from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {
	const [quiz, setQuiz] = React.useState(createOptions());
	let updatedQuestion = props.question;
	// .replace text -> puntuation
	if (updatedQuestion.includes("&#039;"))
		updatedQuestion = updatedQuestion.replaceAll("&#039;", "'");
	if (updatedQuestion.includes("&quot;"))
		updatedQuestion = updatedQuestion.replaceAll("&quot;", '"');

	function createOptions() {
		/* Combine correct and incorrect answer arrays*/
		const optionsArray = props.incorrect_answers.concat(props.correct_answer);
		/* Make inputs for each option*/
		const inputsArray = optionsArray.map((option) => {
			// .replace text -> puntuation
			if (option.includes("&#039;")) option = option.replaceAll("&#039;", "'");
			const id = nanoid();
			return (
				<input
					type="button"
					value={option}
					key={id}
					className="default-btn"
					onClick={() => updateOptions(id)}
				/>
			);
		});
		/* Shuffles the array */
		inputsArray.sort(() => Math.random() - 0.5);
		return inputsArray;
	}

	function updateOptions(id) {
		setQuiz((prevQuiz) =>
			prevQuiz.map((option) => {
				return option.key === id
					? { ...option, props: { ...option.props, className: "chosen-btn" } }
					: { ...option, props: { ...option.props, className: "default-btn" } };
			})
		);
	}

	return (
		<div className="quiz-contents">
			<h2>{updatedQuestion}</h2>
			<div className="btnGroup">{quiz}</div>
			<hr />
		</div>
	);
}
