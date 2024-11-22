import localFont from "next/font/local";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginScreen from "./loginScreen";
import Header from "./header";

export const metadata = {
	title: "SEO Rank Tracker",
	description:
		"A tool to keep track of ranks of domain keywords and help in SEO optimization",
};

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default async function RootLayout({ children }) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{!session && (
					<div className="">
						<LoginScreen />
					</div>
				)}
				{session && (
					<div className="max-w-lg mx-auto">
						<Header />
						{children}
					</div>
				)}
			</body>
		</html>
	);
}
