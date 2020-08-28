import React, { useEffect, useState } from 'react'
import { useAsync, useDebounce, useDebouncedEffect } from 'src/hooks'
import { SelectBase } from './base'
import { fetchCities } from 'src/API'
import { TOptBase, EOpenSource } from 'src/types'
// import { useDebounce } from 'react-use'

const noop = () => { }

interface Props<TOpt> extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'> {
	// options: TOpt[]
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

	// const debouncedFetchCities = useDebounce(fetchCities)
	const [ { pending, data }, execute ] = useAsync(fetchCities)
	const [ filter, setFilter ] = useState('')

	// useEffect(() => console.log('data:', data), [ data ])

	const handleInputChange = (filter: string) => {
		onInputChange(filter)
		setFilter(filter)
	}

	useDebouncedEffect(() => {
		execute(filter)
	}, [ filter ], 1000)

	return (
		<div>
			<h1>Select Async is in the Game !</h1>
			<br />
			<SelectBase
				options={data || []}
				onInputChange={handleInputChange}
				filter={filter}
				isLoading={pending}
				{...props}
			/>
		</div>
	)
}

export default SelectAsync
