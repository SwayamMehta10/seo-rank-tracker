"use-client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Chart from "./chart";

export default function KeywordRow({ keyword, owner, domain, results }) {
	const latestResult = results.reverse()[0];
	const [latestRank, setLatestRank] = useState(latestResult?.position || null);
	useEffect(() => {
		setTimeout(checkRank, 3000);
	}, [latestRank]);

	function checkRank() {
		if (!latestRank) {
			const url = `/api/results?=id` + latestResult.search_id;
			axios.get(url).then((response) => {
				const newRankFromDb = response.data.position;
				if (newRankFromDb) {
					setLatestRank(newRankFromDb);
				} else {
					setTimeout(checkRank, 3000);
				}
			});
		}
	}

	return (
		<div className="flex gap-2 bg-white border border-blue-200 border-b-4 p-4 pr-0 rounded-lg items-center my-3">
			<Link
				href={"/domains/" + domain + "/" + encodeURIComponent(keyword)}
				className="font-bold grow block"
			>
				{keyword}
			</Link>
			<div className="">
				<div className="h-[64px] w-[300px]">
					{!latestRank && <div>Checking Rank...</div>}
					{latestRank && (
						<div>
							<Chart results={results} width={300} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
