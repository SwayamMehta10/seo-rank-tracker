"use client";
import DeleteButton from "@/components/deleteButton";
import DoubleHeader from "@/components/doubleHeader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Chart from "@/components/chart";
import Swal from "sweetalert2";

export default function KeywordPage(props) {
	const domain = props.params.domain;
	const keyword = decodeURIComponent(props.params.keyword);
	const router = useRouter();
	const [results, setResults] = useState([]);

	useEffect(() => {
		axios
			.get("/api/keywords?keyword=" + keyword + "&domain=" + domain)
			.then((response) => setResults(response.data.results));
	}, []);

	async function deleteKeyword() {
		const urlParams =
			"?domain=" + domain + "&keyword=" + encodeURIComponent(keyword);
		const url = "/api/keywords" + urlParams;
		await axios.delete(url).then(() => {
			router.push("/domains/" + domain);
		});
	}

	return (
		<>
			<div className="flex items-end mb-8">
				<DoubleHeader
					preTitle={domain + " »"}
					mainTitle={keyword}
					preTitleLink={"/domains/" + domain}
				/>
				<div className="p-2">
					<DeleteButton
						onClick={() => {
							Swal.fire({
								title: "Are you sure?",
								text: "You won't be able to revert this!",
								icon: "warning",
								showCancelButton: true,
								confirmButtonColor: "#3085d6",
								cancelButtonColor: "#d33",
								confirmButtonText: "Yes, delete it!",
							}).then((result) => {
								if (result.isConfirmed) {
									Swal.fire({
										title: "Deleted!",
										text: "The keyword has been deleted.",
										icon: "success",
									});
									deleteKeyword();
								}
							});
						}}
					/>
				</div>
			</div>
			{results.length === 0 ? (
				<div>Loading ...</div>
			) : (
				<Chart width={"100%"} results={results} />
			)}
		</>
	);
}
