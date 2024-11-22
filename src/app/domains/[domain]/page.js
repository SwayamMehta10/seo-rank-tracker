"use client";
import DoubleHeader from "@/components/doubleHeader";
import NewKeywordForm from "@/components/newKeywordForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import KeywordRow from "@/components/keywordRow";
import DeleteButton from "@/components/deleteButton";
import Swal from "sweetalert2";

export default function DomainPage(props) {
	const [keywords, setKeywords] = useState([]);
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([]);
	const router = useRouter();
	const domain = props.params.domain;
	useEffect(() => {
		fetchKeywords();
	}, []);

	async function fetchKeywords() {
		setLoading(true);
		await axios.get("/api/keywords?domain=" + domain).then((response) => {
			setKeywords(response.data.keywords);
			setResults(response.data.results);
			setLoading(false);
		});
	}

	async function deleteDomain() {
		await axios.delete("/api/domains?domain=" + domain).then(() => {
			router.push("/");
		});
	}

	return (
		<div className="">
			<div className="flex items-end">
				<DoubleHeader
					preTitle={"Domains »"}
					mainTitle={domain}
					preTitleLink={"/"}
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
										text: "Your domain has been deleted.",
										icon: "success",
									});
									deleteDomain();
								}
							});
						}}
					/>
				</div>
			</div>
			<NewKeywordForm domain={domain} onNew={fetchKeywords} />
			{loading && <div>Loading...</div>}
			{!loading &&
				keywords.map((keywordDoc) => (
					<KeywordRow
						key={keywordDoc._id}
						{...keywordDoc}
						results={results.filter(
							(r) => r.keyword === keywordDoc.keyword
						)}
					/>
				))}
			{!loading && !keywords?.length && <div>No keywords found :(</div>}
		</div>
	);
}
