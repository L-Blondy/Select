import React from 'react'

interface TProps {
	className: string
}

const Loader: React.FC<TProps> = ({ className }) => {

	return (
		<div className={`select__loader ${className}`}>
			<svg height="10" viewBox="0 0 12 12" >
				<circle fill="currentColor" className="circle" cx="1.5" cy="6" r="1" />
				<circle fill="currentColor" className="circle" cx="5" cy="6" r="1" />
				<circle fill="currentColor" className="circle" cx="8.5" cy="6" r="1" />
			</svg>
		</div>
	)
}

export default Loader
