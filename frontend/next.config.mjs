import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
		removeConsole: process.env.NODE_ENV === 'production' ? true : false,
	},
	env: {
		CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		BACKEND_URL: process.env.BACKEND_URL
	}
};

export default nextConfig;
