/* Fetching rank of keywords using simple web scraping via puppeteer. This solution will break if google changes the search id or h3 tags so it's not feasible.

const puppeteer = require("puppeteer");
async function getKeywordRank(domain, keyword) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		`https://www.google.com/search?q=${encodeURIComponent(keyword)}`
	);
	const results = await page.$$eval("#search a > h3", (elts) => {
		return elts.map((h3) => {
			const title = h3.innerText;
			const link = h3.parentElement.href;
			return { title, link };
		});
	});
	await page.close();
	await browser.close();
	return results.findIndex((resultItem) => resultItem.link.includes(domain));
}

getKeywordRank("github.com", "git").then((pos) => console.log(pos));
*/

// Using SerpAPI
require("dotenv").config();
const { getJson } = require("serpapi");
export default async function doGoogleSearch(domain, keyword) {
	return new Promise((resolve, reject) => {
		getJson(
			{
				engine: "google",
				q: keyword,
				api_key: process.env.SERP_API_KEY,
			},
			(json) => {
				try {
					const search_id = json["search_metadata"].id;
					const search_results = json["organic_results"];
					const result = search_results.find((r) =>
						r.link.includes(domain)
					);
					const position = result?.position ?? 0;
					resolve({ search_id, position });
				} catch (error) {
					reject(error);
				}
			}
		);
	});
}
