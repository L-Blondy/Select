import React from 'react'
import { Opt } from 'src/types'

const noop = () => { }

type Props = {
	options: Opt[]
	onMouseOver: (index: number) => void
	onClick: (e: React.MouseEvent<HTMLLIElement>) => void
	index: number
	noOptionsMessage: string
	className: string
}

const Menu = ({
	options,
	onMouseOver = noop,
	onClick = noop,
	index,
	noOptionsMessage,
	className
}: Props) => {

	return (
		<ul className={className}>
			{options.length
				? (
					options.map((opt, i) => (
						<li
							onMouseDown={e => e.preventDefault()}
							onMouseOver={() => onMouseOver(i)}
							onClick={onClick}
							className={`select__option ${i === index ? 'active-option' : ''}`}
							key={opt.value + i}>
							{opt.label}
						</li>
					))
				) : (
					<li className={`select__option no-option`}>{noOptionsMessage}</li>
				)
			}
		</ul>
	)
}

export default React.memo(Menu)
