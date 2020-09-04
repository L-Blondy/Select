import React, { useRef, forwardRef, useEffect } from 'react'
import { SelectBase } from 'src/components/base'
import { FnReturningPromise, Opt, BaseProps, OpenSource } from 'src/types'
import { useDebounce, useAsync } from 'src/hooks'

const noop = () => { }

interface Props extends Omit<BaseProps, 'isPending' | 'options'> {
	callback: FnReturningPromise
	debounceMs?: number
	filterFn: (option: Opt, keyword: string) => boolean
}

const SelectAsyncFiltered = forwardRef<HTMLDivElement, Props>(({
	callback,
	debounceMs = 300,
	filterFn = () => true,
	onClose = noop,
	onOpen = noop,
	value: opt,
	withCleanup = true,
	...props
}, ref) => {

	const [ debouncedCallback, cancel ] = useDebounce(callback, debounceMs)
	const [ requestState, execute, setRequestState ] = useAsync(debouncedCallback, 'fetchCities')
	const lastKeyword = useRef(opt?.label || '')
	const dataKeyword = useRef<string>('')

	useEffect(() => {
		if (requestState.status !== 'success') return
		dataKeyword.current = (requestState.args || [ '' ])[ 0 ]
		console.log('success', requestState.args, requestState.data)
	}, [ requestState ])

	const reset = () => {
		cancel()
		setRequestState({
			data: [],
			args: null,
			isPending: false,
			status: 'idle',
		})
	}

	const handleInputChange = (keyword: string) => {
		lastKeyword.current = keyword
		console.log(dataKeyword.current)
		if (requestState.data?.length && keyword.indexOf(dataKeyword.current) === 0) return
		keyword
			? execute(keyword)
			: reset()
	}

	const handleClose = () => {
		onClose()
		reset()
	}

	const handleOpen = (openSource: OpenSource) => {
		onOpen(openSource)
		if (withCleanup || !lastKeyword.current) return
		execute(lastKeyword.current)
	}

	const options = (requestState.data as Opt[] || []).filter((opt => filterFn(opt, lastKeyword.current)))

	return (
		<SelectBase
			onInputChange={handleInputChange}
			isPending={requestState.isPending}
			onClose={handleClose}
			onOpen={handleOpen}
			options={options}
			value={opt}
			withCleanup={withCleanup}
			ref={ref}
			{...props}
		/>
	)
})

export default SelectAsyncFiltered