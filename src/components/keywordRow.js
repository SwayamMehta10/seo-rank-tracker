"use-client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Chart from "./chart";
import axios from "axios";

export default function KeywordRow({
	keyword,
	domain,
	results: defaultResults,
}) {
	const [results, setResults] = useState(defaultResults || []);
	const rankExists = results.some((r) => r.position);
	const rankNotFound = results.length > 0 && !rankExists;
	useEffect(() => {
		reFetchResultsIfNoRank();
	}, []);

	function reFetchResultsIfNoRank() {
		if (!rankExists) {
			axios
				.get(`/api/results?domain=${domain}&keyword=${keyword}`)
				.then((res) => {
					setResults(res.data);
				});
		}
	}

	return (
		<div className="flex gap-2 bg-white border border-blue-200 border-b-4 pr-0 rounded-lg items-center my-3">
			{rankExists ? (
				<Link
					href={
						"/domains/" + domain + "/" + encodeURIComponent(keyword)
					}
					className="font-bold grow block p-4"
				>
					{keyword}
				</Link>
			) : (
				<span className="font-bold grow block p-4 cursor-not-allowed">
					{keyword}
				</span>
			)}
			<div className="">
				<div className="min-h-[80px] w-[300px] flex items-center">
					{results.length === 0 && (
						<div className="block text-center w-full">
							Checking Rank...
						</div>
					)}
					{rankNotFound && (
						<div className="block text-center w-full">
							Not found :/
						</div>
					)}
					{rankExists && (
						<div className="pt-2 min-h-[80px]">
							<Chart results={results} width={300} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
