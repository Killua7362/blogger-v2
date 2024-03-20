import dotenv from 'dotenv'
import withBundleAnalyzer from '@next/bundle-analyzer';
dotenv.config({ path: "../.env" })

const withAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true
	},
	env: {
		CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
	}
};

export default withAnalyzer(nextConfig);
