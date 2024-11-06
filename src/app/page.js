/* eslint-disable @next/next/no-img-element */
"use client";
import NewDomainForm from "@/components/newDomainForm";
import DomainList from "@/components/domainList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
	const [domains, setDomains] = useState([]);
	const [keywords, setKeywords] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		fetchDomains();
	}, []);

	function fetchDomains() {
		setLoading(true);
		axios.get("/api/domains").then((res) => {
			setDomains(res.data.domains);
			setKeywords(res.data.keywords);
			setLoading(false);
		});
	}

	return (
		<div className="">
			<NewDomainForm onNew={fetchDomains} />
			{loading && <div>Loading...</div>}
			{!loading && <DomainList domains={domains} keywords={keywords} />}
		</div>
	);
}
