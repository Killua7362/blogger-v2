'use client'
import { useReportWebVitals } from 'next/web-vitals'

export const WebReport = () => {
	useReportWebVitals((metric) => {
		console.log(metric)
	})
	return <>
	</>
}

