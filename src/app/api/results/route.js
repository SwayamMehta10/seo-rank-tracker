import mongoose from "mongoose";
import { Result } from "@/models/results";

export async function GET(req) {
	mongoose.connect(process.env.MONGODB_URI);
	const url = new URL(req.url);
	const id = url.searchParams.get("id");
	const domain = url.searchParams.get("domain");
	const keyword = url.searchParams.get("keyword");
	if (id) {
		return Response.json(await Result.findOne({ search_id: id }));
	}
	if (domain && keyword) {
		return Response.json(await Result.find({ domain, keyword }));
	}
}
