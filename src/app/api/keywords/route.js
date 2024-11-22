import mongoose from "mongoose";
import { Keyword } from "@/models/keyword";
import { Result } from "@/models/results";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import doGoogleSearch from "@/libs/rankingFunctions";
import { URL } from "url";

export async function POST(req) {
	await mongoose.connect(process.env.MONGODB_URI);
	const data = await req.json();
	const session = await getServerSession(authOptions);
	const keywordDoc = await Keyword.create({
		domain: data.domain,
		keyword: data.keyword,
		owner: session.user.email,
	});

	let resultsData;
	try {
		resultsData = await doGoogleSearch(data.domain, data.keyword);

		await Result.create({
			domain: data.domain,
			keyword: data.keyword,
			search_id: resultsData.search_id,
			position: resultsData.position,
		});
	} catch (error) {
		console.error("Error in Google search or database insertion:", error);
	}

	return Response.json(keywordDoc);
}

export async function GET(req) {
	const url = new URL(req.url);
	const domain = url.searchParams.get("domain");
	const keyword = url.searchParams.get("keyword");
	await mongoose.connect(process.env.MONGODB_URI);
	const session = await getServerSession(authOptions);
	const keywordsDocs = await Keyword.find(
		keyword
			? { domain, keyword, owner: session.user.email }
			: { domain, owner: session.user.email }
	);
	const resultsDocs = await Result.find({
		domain,
		keyword: keywordsDocs.map((doc) => doc.keyword),
	});
	return Response.json({
		keywords: keywordsDocs,
		results: resultsDocs,
	});
}

export async function DELETE(req) {
	const url = new URL(req.url);
	const domain = url.searchParams.get("domain");
	const keyword = url.searchParams.get("keyword");
	await mongoose.connect(process.env.MONGODB_URI);
	const session = await getServerSession(authOptions);
	await Keyword.deleteOne({ domain, keyword, owner: session.user.email });
	return Response.json(true);
}
