// API route handler to create new domain entry in MongoDB database

import { Domain } from "@/models/domain";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";
import * as cheerio from "cheerio";
import { Keyword } from "@/models/keyword";

async function getIconUrl(domain) {
	try {
		const response = await axios.get(`https://` + domain);
		const $ = cheerio.load(response.data);
		const links = $("link");
		let href = "";

		links.each((i, link) => {
			const rel = $(link).attr("rel") || "";
			if (rel.includes("icon")) {
				href = $(link).attr("href");
			}
		});
		console.log({ href });

		if (href.includes("://")) {
			return href;
		} else {
			return `https://` + domain + href;
		}
	} catch (e) {
		console.error("Error fetching or parsing HTML:", e);
		return null;
	}
}

export async function POST(req) {
	const data = await req.json();
	await mongoose.connect(process.env.MONGODB_URI);
	const session = await getServerSession(authOptions);
	let icon = null;
	try {
		icon = await getIconUrl(data?.domain);
	} catch (e) {
		console.error(e);
	}
	const doc = await Domain.create({
		domain: data?.domain,
		owner: session?.user?.email || "unknown",
		icon,
	});
	return Response.json(doc);
}

export async function GET() {
	await mongoose.connect(process.env.MONGODB_URI);
	const session = await getServerSession(authOptions);
	const email = session?.user?.email;
	const domains = await Domain.find({ owner: email });
	const keywords = await Keyword.find({
		owner: email,
		domain: domains.map((doc) => doc.domain),
	});
	return Response.json({ domains, keywords });
}

export async function DELETE(req) {
	const url = new URL(req.url);
	const domain = url.searchParams.get("domain");
	await mongoose.connect(process.env.MONGODB_URI);
	const session = await getServerSession(authOptions);
	await Domain.deleteOne({ owner: session.user?.email, domain: domain });
	return Response.json(true);
}
