/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

function DomainRow({ owner, domain, icon, keywords }) {
	return (
		<div className="flex gap-2 bg-white border border-blue-200 border-b-4 p-4 rounded-lg items-center my-3">
			{icon && <img src={icon} alt="" className="h-12" />}
			<div className="">
				<Link
					href={"/domains/" + domain}
					className="font-bold text-xl leading-5 block"
				>
					{domain}
				</Link>
				{keywords.map((keywordDoc) => (
					<
						//eslint-disable-next-line react/jsx-key
					>
						<Link
							href={
								"/domains/" + domain + "/" + keywordDoc.keyword
							}
							className="text-xs text-gray-500 bg-slate-200 inline-block mt-1 p-1 rounded-md"
						>
							{keywordDoc.keyword}
						</Link>{" "}
					</>
				))}
			</div>
			<div className="">
				<div className="bg-green-100 w-36 h-[64px]"></div>
			</div>
		</div>
	);
}
export default DomainRow;
