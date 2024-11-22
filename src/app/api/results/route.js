import mongoose from "mongoose";
import { Result } from "@/models/results";

export async function GET(req) {
	mongoose.connect(process.env.MOGODB_URI);
	const url = new URL(req.url);
	const id = url.searchParams.get("id");
	return Response.json(await Result.findOne({ search_id: id }));
}
