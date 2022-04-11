import "./App.css";
import React from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";

export default function App() {
	const [start, setStart] = React.useState(false);
	const [quizData, setQuizData] = React.useState(0);
	const [score, setScore] = React.useState(0);
	/* Game Settings */
	const [category, setCategory] = React.useState(9);
	const [difficulty, setDifficulty] = React.useState("easy");
	const [quantity, setQuantity] = React.useState(5);

	/* Skip first render and when play again is clicked*/
	const skipRenderCycle = React.useRef(false);

	React.useEffect(() => {
		if (skipRenderCycle.current) {
			fetch(
				`https://opentdb.com/api.php?amount=${quantity}&difficulty=${difficulty}${
					category.length === 0 ? "" : "&category=" + category
				}`
			)
				.then((res) => res.json())
				.then((data) => setQuizData(data.results));
			console.log("API Fetch Request Requested");
		} else skipRenderCycle.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [start]);

	function startQuiz(event) {
		event.preventDefault();
		setStart((prevStart) => !prevStart);
	}

	let questions;
	if (quizData !== 0) {
		questions = quizData.map((question) => {
			return <Quiz key={question.question} {...question} />;
		});
	}

	function CheckAnswers() {
		/* If all are correct*/
		if (score === 5) return playAgain();
		/* Set score to 0*/
		setScore(0);
		/* Get answers and selcted options*/
		const answers = quizData.map((option) => option.correct_answer);
		const selected = document.querySelectorAll(".chosen-btn");
		/* If not all questions are answered = animation*/
		const allSelected = document.querySelectorAll(
			".chosen-btn, .correct-btn, .incorrect-btn"
		);
		if (allSelected.length < 5) return tryAgainAnimation();
		/* Checks Answers*/
		for (let i = 0; i < selected.length; i++) {
			if (answers.includes(selected[i].value)) {
				selected[i].className = "correct-btn";
			} else {
				selected[i].className = "incorrect-btn";
			}
		}
		/* Set score*/
		setScore(
			(prevScore) => document.getElementsByClassName("correct-btn").length
		);
	}

	function tryAgainAnimation() {
		const button = document.getElementsByClassName("submit-btn");
		button[0].style.animationName = "TryAgain";
		setTimeout(() => {
			button[0].style.animationName = "";
		}, 1000);
	}

	function playAgain() {
		skipRenderCycle.current = false;
		setStart((prevValue) => !prevValue);
		setScore(0);
	}

	function gameSettings(e) {
		const type = e.target.id;
		const value = e.target.value;

		type === "category" && setCategory(value);
		type === "difficulty" && setDifficulty(value);
		type === "questions" && setQuantity(value);
	}

	return (
		<main>
			<img src="./images/top-Blob" className="background-top" alt="" />
			<img src="./images/bottom-Blob" className="background-bottom" alt="" />
			{!start ? (
				<Home
					startQuiz={startQuiz}
					{...quizData}
					category={category}
					difficulty={difficulty}
					quantity={quantity}
					gameSettings={gameSettings}
				/>
			) : (
				questions
			)}
			{start && (
				<div className="scoreboard">
					<h2>You scored {score}/5 correct answers</h2>
					<button onClick={CheckAnswers} className="submit-btn">
						{score < 5 ? "Check answers" : "Play again"}
					</button>
				</div>
			)}
		</main>
	);
}
