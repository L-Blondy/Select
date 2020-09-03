import React from 'react'

type Props = React.ComponentPropsWithoutRef<'div'>

const Arrow: React.FC<Props> = ({
	className,
	...props }) => {

	return (
		<div
			data-testid='toggle'
			className={className}
			onMouseDown={e => e.preventDefault()}
			{...props}>

			<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
				<rect width="10" height="10" fill="none" />
				<path fill="currentColor" d="M3.21256 4.25785C3.36291 4.10406 3.57222 4.09199 3.75601 4.25785L5.1036 5.54992L6.45118 4.25785C6.63498 4.09199 6.84464 4.10406 6.99395 4.25785C7.14429 4.4113 7.13464 4.67061 6.99395 4.81475C6.85395 4.95889 5.37498 6.36716 5.37498 6.36716C5.30015 6.44406 5.20187 6.48268 5.1036 6.48268C5.00532 6.48268 4.90705 6.44406 4.83153 6.36716C4.83153 6.36716 3.35325 4.95889 3.21256 4.81475C3.07187 4.67061 3.06222 4.4113 3.21256 4.25785Z" />
			</svg>
		</div>
	)
}

export default Arrow