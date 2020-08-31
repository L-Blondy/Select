import React, { useState } from 'react'
import { OptBase, OpenSource } from 'src/types'
import SelectBase from './base/SelectBase'

const noop = () => { }

interface Props<Opt> extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'> {
	options: Opt[]
	value?: Opt
	noOptionsMessage?: string
	onInputClick?: () => void
	onInputChange?: (value: string) => void
	onChange?: (value: Opt) => void
	onOpen?: (openSource: OpenSource) => void
	onClose?: () => void
}

function SelectFiltered<Opt extends OptBase>({
	options: defaultOptions,
	onInputChange = noop,
	onClose = noop,
	...props
}: Props<Opt>) {

	const [ options, setOptions ] = useState(defaultOptions)

	const handleInputChange = (filter: string) => {
		onInputChange(filter)
		setOptions(defaultOptions.filter(opt => RegExp('^' + filter, 'i').test(opt.label)))
	}

	const handleClose = () => {
		onClose()
		setOptions(defaultOptions)
	}

	return (
		<SelectBase
			options={options}
			onInputChange={handleInputChange}
			onClose={handleClose}
			{...props}
		/>
	)
}

export default SelectFiltered