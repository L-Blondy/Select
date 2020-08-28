import React from 'react'
import { TOptBase, EOpenSource } from 'src/types'
import SelectBase from './base/SelectBase'
import { useSetState } from 'src/hooks'

const noop = () => { }

interface Props<TOpt> extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'> {
	options: TOpt[]
	value?: TOpt
	noOptionsMessage?: string
	onInputClick?: () => void
	onInputChange?: (value: string) => void
	onChange?: (value: TOpt) => void
	onOpen?: (openSource: EOpenSource) => void
	onClose?: () => void
}

function SelectFiltered<TOpt extends TOptBase>({
	options: defaultOptions,
	onChange = noop,
	onInputChange = noop,
	onOpen = noop,
	onClose = noop,
	value: opt = { value: '', label: '' } as TOpt,
	...props
}: Props<TOpt>) {

	const [ state, setState ] = useSetState({
		filter: opt.label,
		opt: opt
	})

	const handleInputChange = (filter: string) => {
		setState({ filter })
		onInputChange(filter)
	}

	const handleChange = (option: TOpt) => {
		setState({
			filter: option.label,
			opt: option
		})
		onChange(option)
	}
	const handleOpen = (openSource: EOpenSource) => {
		if (openSource !== 'inputChange')
			setState({ filter: '' })
		onOpen(openSource)
	}
	const handleClose = () => {
		setState({ filter: state.opt.label })
		onClose()
	};

	return (
		<SelectBase
			options={defaultOptions.filter(opt => RegExp('^' + state.filter, 'i').test(opt.label))}
			onChange={handleChange}
			onInputChange={handleInputChange}
			onOpen={handleOpen}
			onClose={handleClose}
			filter={state.filter}
			value={opt ?? state.opt}
			{...props}
		/>
	)
}

export default SelectFiltered