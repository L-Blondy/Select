import React from 'react'
import { SelectBase } from 'src/components/base'
import { FnReturningPromise, Opt } from 'src/types'
import { useDebounce, useAsync } from 'src/hooks'

interface Props {
	callback: FnReturningPromise
	debounceMs: number
	filterFn: (option: Opt, keyword: string) => boolean
}

function SelectAsyncFiltered({
	callback,
	debounceMs = 300,
	filterFn,
	...props
}: Props) {

	const [ debouncedCallback, cancel ] = useDebounce(callback, debounceMs)
	const [ { isPending, data: options }, execute, setState ] = useAsync(debouncedCallback, 'fetchCities', true)

	return (
		<SelectBase
			options={[]}
		/>
	)
}

export default SelectAsyncFiltered