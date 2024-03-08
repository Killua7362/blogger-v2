'use client'

import "./globals.css";
import { RecoilRoot } from "recoil";

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode,
}>) {
	return (
		<html lang="en">
			<head></head>
			<body className="bg-background text-text">
				<RecoilRoot>
					{children}
				</RecoilRoot>
			</body>
		</html>
	);
}
