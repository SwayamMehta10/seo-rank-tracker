import { models, model, Schema } from "mongoose";

const ResultSchema = new Schema(
	{
		domain: { type: String, required: true },
		keyword: { type: String, required: true },
		search_id: { type: String, required: true },
		position: { type: Number, required: true },
	},
	{ timestamps: true }
);
export const Result = models?.Result || model("Result", ResultSchema);
