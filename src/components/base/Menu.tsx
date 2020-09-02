import React from 'react'
import { OptBase } from 'src/types'

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

const Menu = <TOpt extends OptBase>({
	options,
	onMouseOver = noop,
	onClick = noop,
	isOpen,
	index,
	noOptionsMessage,
	className
}: Props<TOpt>) => {

	return (
		<ul className={` ${className} ${isOpen ? 'open' : 'close'}`}>
			{options.length
				? (
					options.map((opt, i) => (
						<li
							onMouseDown={e => e.preventDefault()}
							onMouseOver={() => onMouseOver(i)}
							onClick={onClick}
							className={`select__menu__option ${i === index ? 'active-option' : ''}`}
							key={opt.value + i}>
							{opt.label}
						</li>
					))
				) : (
					<li className={`select__menu__option no-option`}>{noOptionsMessage}</li>
				)
			}
		</ul>
	)
}

export default Menu
