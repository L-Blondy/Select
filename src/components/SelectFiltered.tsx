import React, { useState } from 'react'
import { BaseProps, Opt } from 'src/types'
import SelectBase from './base/SelectBase'

const noop = () => { }

interface Props extends Omit<BaseProps, 'isPending' | 'withCleanup'> {
	filterFn: (option: Opt, keyword: string) => boolean
}

function SelectFiltered({
	options: defaultOptions,
	filterFn,
	onInputChange = noop,
	onClose = noop,
	...props
}: Props) {

	const [ options, setOptions ] = useState(defaultOptions)

	const handleInputChange = (keyword: string) => {
		onInputChange(keyword)
		setOptions(defaultOptions.filter((option) => filterFn(option, keyword)))
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