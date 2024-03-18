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
			<head>
				<link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
				<title>
					Blog-v2
				</title>
			</head>
			<body className="bg-background text-text">
				<RecoilRoot>
					{children}
				</RecoilRoot>
			</body>
		</html>
	);
}
