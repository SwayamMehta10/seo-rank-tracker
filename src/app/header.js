/* eslint-disable @next/next/no-img-element */
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LogoutLink from "@/components/logoutLink";

export default async function Header() {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	return (
		<header className="mx-auto my-4 flex items-center justify-between">
			<a
				href="/"
				className="text-3xl font-bold bg-gradient-to-r from-indigo-900 to-blue-600 text-transparent bg-clip-text"
			>
				RankTracker
			</a>
			<div className="flex items-center gap-2 bg-slate-300 p-1 rounded-full">
				<img
					src={user?.image}
					alt="Profile Image"
					className="h-12 rounded-full"
				/>
				<div className="pr-4 leading-5">
					<h3 className="font-bold">{user?.name}</h3>
					<LogoutLink />
				</div>
			</div>
		</header>
	);
}
