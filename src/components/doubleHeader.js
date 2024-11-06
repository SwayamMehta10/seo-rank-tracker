import Link from "next/link";

function doubleHeader({ preTitle, mainTitle, preTitleLink }) {
	return (
		<div className="">
			{preTitleLink && (
				<Link
					href={preTitleLink}
					className="block text-gray-300 text-lg uppercase"
				>
					{preTitle}
				</Link>
			)}
			{!preTitleLink && (
				<h3 className="block text-gray-300 text-lg uppercase">
					{preTitle}
				</h3>
			)}
			<h2 className="font-bold text-3xl mb-4 leading-5">{mainTitle}</h2>
		</div>
	);
}
export default doubleHeader;
