import React from 'react'
import { TOptBase } from 'src/types'

const noop = () => { }

type Props<TOpt> = {
	options: TOpt[]
	onMouseOver: (index: number) => void
	onClick: (e: React.MouseEvent<HTMLLIElement>) => void
	isOpen: boolean
	index: number
	noOptionsMessage: string
	className: string
}

function Menu<TOpt extends TOptBase>({
	options,
	onMouseOver = noop,
	onClick = noop,
	isOpen,
	index,
	noOptionsMessage,
	className
}: Props<TOpt>) {

	return (
		<div className={className}>
			<ul className={className + `__ul ${isOpen ? 'open' : 'close'}`}>
				{options.length
					? (
						options.map((opt, i) => (
							<li
								onMouseDown={e => e.preventDefault()}
								onMouseOver={() => onMouseOver(i)}
								onClick={onClick}
								className={i === index ? 'active-option' : ''}
								key={opt.value + i}>
								{opt.label}
							</li>
						))
					) : (
						<li className='no-option'>{noOptionsMessage}</li>
					)
				}
			</ul>
		</div>
	)
}

export default Menu
