import React from 'react'

interface TProps {
	when: boolean
	className: string
	width: number
}

const LoadingIndicator: React.FC<TProps> = ({ when, width, ...props }) => {

	if (!when) return null

	const style = {
		width: width + 'px',
		marginRight: width / 5 + 'px'
	}

	return (
		<div style={style} {...props} />
	)
}

export default LoadingIndicator
