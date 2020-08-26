import React from 'react'

interface TProps {
	when: boolean
	className: string
}

const LoadingIndicator: React.FC<TProps> = ({ when, ...props }) => {

	if (!when) return null

	return (
		<div {...props} />
	)
}

export default LoadingIndicator
