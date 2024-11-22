import { sortBy, sumBy, uniqBy } from "lodash";
import { ResponsiveContainer, AreaChart, Tooltip, Area, YAxis } from "recharts";

export default function Chart({ results, width }) {
	const lowestRank = sortBy(results, "position").reverse()?.[0].position;
	const highestRank = sortBy(results, "position")?.[0]?.position;
	const domainLow = lowestRank + 3;
	let data = results;
	data = data.map((result) => {
		return {
			keyword: result.keyword,
			date: result.createdAt.substring(0, 10),
			rank: result.position,
			points: domainLow - result.position,
		};
	});
	const originalData = [...data];
	data = uniqBy(data, (r) => r.date);
	data.forEach((result, index) => {
		const originalDataResults = originalData.filter(
			(ogResult) => ogResult.date === result.date
		);
		if (originalDataResults.length > 1) {
			data[index]["points"] =
				sumBy(originalDataResults, "points") /
				originalDataResults.length;
			data[index]["rank"] =
				sumBy(originalDataResults, "rank") / originalDataResults.length;
		}
	});
	data = sortBy(data, "date");
	return (
		<div className="">
			<ResponsiveContainer width={width} height={80}>
				<AreaChart
					width={width}
					data={data}
					margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient
							id="colorPv"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#82ca9d"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="#82ca9d"
								stopOpacity={0.1}
							/>
						</linearGradient>
					</defs>
					<YAxis hide={true} domain={[0, lowestRank]} />
					<Tooltip
						labelFormatter={(value, name) =>
							name?.[0]?.payload?.date?.substring(0, 10)
						}
						formatter={(value, name, props) => [
							"Rank: " + props?.payload?.rank,
						]}
					/>
					<Area
						type="monotone"
						dataKey="points"
						stroke="#82ca9d"
						fillOpacity={1}
						fill="url(#colorPv)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}