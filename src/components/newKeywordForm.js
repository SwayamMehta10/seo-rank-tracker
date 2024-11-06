"use client";
import { useState } from "react";
import axios from "axios";

export default function NewKeywordForm({ onNew, domain }) {
	const [keyword, setKeyword] = useState(""); // Hook to manage domain state
	async function handleSubmit(ev) {
		ev.preventDefault(); // Prevents default form submission behaviour that would cause a page reload
		setKeyword("");
		await axios.post("/api/keywords", { keyword, domain });
		onNew();
	}

	return (
		<div>
			<form action="" className="flex gap-2 my-8" onSubmit={handleSubmit}>
				<input
					value={keyword}
					onChange={(ev) => setKeyword(ev.target.value)}
					type="text"
					name=""
					id=""
					className="bg-white border border-b-4 border-blue-200 px-4 py-2 text-xl rounded-lg grow"
					placeholder="New Keyword"
				/>
				<button
					type="submit"
					className="bg-indigo-500 text-white px-8 rounded-lg border border-b-4 border-indigo-700"
				>
					Add
				</button>
			</form>
		</div>
	);
}
