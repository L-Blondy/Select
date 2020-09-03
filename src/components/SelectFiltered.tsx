import React, { useState } from 'react'
import { BaseProps } from 'src/types'
import SelectBase from './base/SelectBase'

const noop = () => { }

interface Props extends Omit<BaseProps, 'isLoading' | 'withCleanup'> { }

function SelectFiltered({
	options: defaultOptions,
	onInputChange = noop,
	onClose = noop,
	...props
}: Props) {

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