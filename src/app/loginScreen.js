"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import DoubleHeader from "@/components/doubleHeader";

const LoginScreen = () => {
	return (
		<div className="bg-white mt-8 max-w-md border-blue-100 border-b-4 mx-auto rounded-xl p-4 py-6 text-center">
			<DoubleHeader preTitle={"Welcome Back"} mainTitle={"Login to your account"}/>
			<button
				onClick={() => signIn("google")}
				className="bg-indigo-500 text-white px-6 py-2 rounded-xl border border-indigo-700 border-b-4 inline-flex gap-2 items-center my-6"
			>
				<Image
					className="invert"
					src="https://www.svgrepo.com/show/50809/google.svg"
					height={20}
					width={20}
					alt="Google Logo"
				/>
				Login with Google
			</button>
		</div>
	);
};
export default LoginScreen;
