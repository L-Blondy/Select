import React from 'react'

const noop = () => { }

interface Props extends Omit<React.ComponentPropsWithRef<'input'>, 'onChange'> {
	value: string
	onPressUp: () => void
	onPressDown: () => void
	onPressEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
	onChange: (value: string) => void
	onClick: (e: React.MouseEvent<HTMLInputElement>) => void
	onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = React.forwardRef<HTMLInputElement, Props>(({
	value,
	onChange = noop,
	onPressUp = noop,
	onPressDown = noop,
	onPressEnter = noop,
	onKeyDown = noop,
	...props
}, ref) => {

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case 'ArrowUp':
				e.preventDefault()
				onPressUp()
				break
			case 'ArrowDown':
				e.preventDefault()
				onPressDown()
				break
			case 'Enter':
				onPressEnter(e)
		}
		e.persist()
		onKeyDown(e)
	}

	return (
		<input
			ref={ref}
			value={value}
			onChange={e => onChange(e.target.value)}
			onKeyDown={handleKeyDown}
			spellCheck={false}
			autoComplete='off'
			{...props}
		/>
	)
})

export default Input
