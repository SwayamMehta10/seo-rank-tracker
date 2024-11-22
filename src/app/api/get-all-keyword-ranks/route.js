import doGoogleSearch from "@/libs/rankingFunctions";
import { Keyword } from "@/models/keyword";
import { Result } from "@/models/results";
import mongoose from "mongoose";

export async function GET() {
	// Use a connection pool or ensure the connection is reused
	if (!mongoose.connection.readyState) {
		await mongoose.connect(process.env.MONGODB_URI);
	}
	const keywordsDocs = await Keyword.find();

	// Perform Google searches concurrently
	const googleSearchPromises = keywordsDocs.map((keywordDoc) =>
		doGoogleSearch(keywordDoc.domain, keywordDoc.keyword)
	);
	const responses = await Promise.allSettled(googleSearchPromises);

	// Map the responses to database save operations
	const savePromises = responses.map((response, index) => {
		const keywordDoc = keywordsDocs[index];

		// Only proceed if the promise was fulfilled
		if (response.status === "fulfilled") {
			const { search_id, position } = response.value;
			return Result.create({
				domain: keywordDoc.domain,
				keyword: keywordDoc.keyword,
				search_id: search_id,
				position: position,
			});
		} else {
			// Log or handle rejected promise
			console.error(
				`Failed to fetch results for keyword: ${keywordDoc.keyword}, Reason: ${response.reason}`
			);
			return null; // Placeholder for failure cases
		}
	});

	// Wait for all save operations to complete
	const saveResults = await Promise.allSettled(savePromises);

	return Response.json(true);
}
