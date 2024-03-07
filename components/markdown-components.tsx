export const MarkdownComponents =
{
	em(props) {
		const { node, ...rest } = props
		return <i style={{ color: 'red' }} {...rest} />
	},
	h1(props) {
		const { node, ...rest } = props
		return <h3 className='text-2xl' {...rest} />
	},
	ul(props) {
		const { node, ...rest } = props
		return <ul className='list-disc' {...rest} />
	},
	pre({ children }) {
		return children
	},
}

