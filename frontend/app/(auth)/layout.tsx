'use client'

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode,
}>) {
	return (

		<GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
			<div className="min-h-screen w-full flex justify-center items-center bg-[#151518]">
				{children}
			</div>
		</GoogleOAuthProvider>
	);
}
