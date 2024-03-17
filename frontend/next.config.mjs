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
	}
};

export default withAnalyzer(nextConfig);
