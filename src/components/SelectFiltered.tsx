import React, { useState } from 'react'
import { BaseProps, OptBase } from 'src/types'
import SelectBase from './base/SelectBase'

const noop = () => { }

interface Props<Opt> extends Omit<BaseProps<Opt>, 'isLoading' | 'withCleanup'> { }

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