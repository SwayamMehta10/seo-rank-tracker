import DoubleHeader from "@/components/doubleHeader";
import DomainRow from "@/components/domainRow";

export default function DomainList({ domains, keywords }) {
	return (
		<>
			<DoubleHeader
				preTitle={"Your Domains"}
				mainTitle={
					domains.length > 1
						? `${domains.length} Domains`
						: `${domains.length} Domain`
				}
			/>
			{domains.map((domainDoc) => (
				<DomainRow
					key={domainDoc._id}
					{...domainDoc}
					keywords={keywords.filter(
						(k) => k.domain === domainDoc.domain
					)}
				/>
			))}
		</>
	);
}
