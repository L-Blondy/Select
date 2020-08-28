import React from 'react'

type TProps = React.ComponentPropsWithoutRef<'div'>

const ArrowButton: React.FC<TProps> = (props) => {

	return (
		<div
			data-testid='toggle'
			onMouseDown={e => e.preventDefault()}
			{...props}>
			<svg className='select__arrow-button__icon' width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.316587 0.347749C0.752587 -0.0982512 1.35959 -0.133251 1.89259 0.347749L5.80059 4.09475L9.70859 0.347749C10.2416 -0.133251 10.8496 -0.0982512 11.2826 0.347749C11.7186 0.792749 11.6906 1.54475 11.2826 1.96275C10.8766 2.38075 6.58759 6.46475 6.58759 6.46475C6.37059 6.68775 6.08559 6.79975 5.80059 6.79975C5.51559 6.79975 5.23059 6.68775 5.01159 6.46475C5.01159 6.46475 0.724587 2.38075 0.316587 1.96275C-0.091413 1.54475 -0.119413 0.792749 0.316587 0.347749V0.347749Z" fill="#989898" />
			</svg>

		</div>
	)
}

export default ArrowButton