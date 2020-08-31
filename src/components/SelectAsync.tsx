import React, { useEffect, useState } from 'react'
import { useAsync, useSetState, useDebouncedEffect, useDebounce } from 'src/hooks'
import { SelectBase } from './base'
import useCommonHandlers from './useCommonHandlers'
import { fetchCities } from 'src/API'
import { OptBase, OpenSource } from 'src/types'

const noop = () => { }

interface Props<Opt> extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'> {
	value?: Opt
	noOptionsMessage?: string
	onInputClick?: () => void
	onInputChange?: (value: string) => void
	onChange?: (value: Opt) => void
	onOpen?: (openSource: OpenSource) => void
	onClose?: () => void
}

function SelectAsync<Opt extends OptBase>({
	onChange = noop,
	onInputChange = noop,
	value: opt = { value: '', label: '' } as Opt,
	...props
}: Props<Opt>) {

	const [ debouncedCallback, cancel ] = useDebounce(fetchCities, 1000)
	const [ { pending, data: options }, execute, setState ] = useAsync(debouncedCallback)

	const handleInputChange = (keyword: string) => {
		if (keyword) return execute(keyword)
		cancel()
		setState({
			data: [],
			pending: false,
			error: null
		})
	}


	const handleChange = () => {
		setState({ data: [] })
	}

	return (
		<div>
			<h1>Select Async is in the Game !</h1>
			<br />
			<SelectBase
				options={options as Opt[] || []}
				isLoading={pending}
				onChange={handleChange}
				onInputChange={handleInputChange}
				{...props}
			/>
		</div>
	)
}

export default SelectAsync
