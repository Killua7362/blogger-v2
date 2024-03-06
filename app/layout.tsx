import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head></head>
			<body className="bg-background text-text">
				{children}
			</body>
		</html>
	);
}
