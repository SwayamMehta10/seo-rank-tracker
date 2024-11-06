"use client";

import { signOut } from "next-auth/react";

function LogoutLink() {
	return (
		<button
			className="text-slate-500 hover:underline"
			onClick={() => signOut()}
		>
			Logout &raquo;
		</button>
	);
}
export default LogoutLink;
