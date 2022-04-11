import React from "react";

export default function Home(props) {
	return (
		<div className="home-contents">
			<h1 className="logo">Quizzical</h1>
			<h2>Get Quiz or Get Out.</h2>
			<div>
				<form
					className="game-settings"
					onSubmit={props.startQuiz}
					onChange={props.gameSettings}
				>
					<label htmlFor="category">Category</label>
					<select id="category" name="category">
						<option value="" disabled>
							Select a Category
						</option>
						<option value="">Any Category</option>
						<option value="">General Knowledge</option>
						<option value="11">Movies</option>
						<option value="12">Music</option>
						<option value="15">Gaming</option>
						<option value="17">Science & Nature</option>
						<option value="21">Sports</option>
						<option value="23">History</option>
						<option value="24">Politics</option>
						<option value="26">Celebrities</option>
					</select>

					<label htmlFor="difficulty">Difficulty</label>
					<select id="difficulty" name="difficulty">
						<option value="" disabled>
							Select a Difficulty
						</option>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>

					<label htmlFor="questions">No. of questions</label>
					<select id="questions" name="questions">
						<option value="" disabled>
							Select Questions Quantity
						</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>
					<input type="submit" className="start-btn" value="Let's go!" />
				</form>
			</div>
		</div>
	);
}
