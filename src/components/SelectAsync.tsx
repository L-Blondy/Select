import React, { useEffect, useState } from 'react'
import { useAsync, useSetState, useDebouncedEffect, useDebounce } from 'src/hooks'
import { SelectBase } from './base'
import { fetchCities } from 'src/API'
import { TOptBase, EOpenSource } from 'src/types'

const noop = () => { }

interface Props<TOpt> extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'> {
	value?: TOpt
	noOptionsMessage?: string
	onInputClick?: () => void
	onInputChange?: (value: string) => void
	onChange?: (value: TOpt) => void
	onOpen?: (openSource: EOpenSource) => void
	onClose?: () => void
}

function SelectAsync<TOpt extends TOptBase>({
	onChange = noop,
	onInputChange = noop,
	onOpen = noop,
	onClose = noop,
	value: opt = { value: '', label: '' } as TOpt,
	...props
}: Props<TOpt>) {

	const debouncedFetchCities = useDebounce(fetchCities, 1000)
	const [ { pending, data: options }, execute ] = useAsync(debouncedFetchCities)
	const [ state, setState ] = useSetState({
		filter: opt.label,
		opt: opt
	})

	useEffect(() => {
		if (opt.value === state.opt.value) return
		setState({ filter: opt.label, opt: opt })
	}, [ options, opt, setState, state.opt.value ])


	const handleInputChange = (filter: string) => {
		onInputChange(filter)
		setState({ filter })
		execute(filter)
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
		<div>
			<h1>Select Async is in the Game !</h1>
			<br />
			<SelectBase
				options={options as TOpt[] || []}
				filter={state.filter}
				isLoading={pending}
				value={state.opt}
				onInputChange={handleInputChange}
				onChange={handleChange}
				onOpen={handleOpen}
				onClose={handleClose}
				{...props}
			/>
		</div>
	)
}

export default SelectAsync
