import React, { useRef, forwardRef } from 'react'
import { useAsync, useDebounce } from 'src/hooks'
import { SelectBase } from './base'
import { BaseProps, Opt, OpenSource, FnReturningPromise } from 'src/types'

const noop = () => { }

interface Props extends Omit<BaseProps, 'isPending' | 'options'> {
	callback: FnReturningPromise
	debounceMs?: number
	withCache?: boolean
}

const SelectAsync = forwardRef<HTMLDivElement, Props>(({
	callback,
	debounceMs = 300,
	onInputChange = noop,
	onOpen = noop,
	onClose = noop,
	withCleanup = true,
	withCache = true,
	value: opt,
	...props
}, ref) => {

	const [ debouncedCallback, cancel ] = useDebounce(callback, debounceMs)
	const [ { isPending, data: options }, execute, setState ] = useAsync(debouncedCallback, 'fetchCities', withCache)
	const lastKeyword = useRef(opt?.label || '')

	const reset = () => {
		cancel()
		setState({
			data: [],
			isPending: false,
			status: 'idle',
		})
	}

	const handleInputChange = (keyword: string) => {
		lastKeyword.current = keyword
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

	return (
		<SelectBase
			options={options as Opt[] || []}
			isPending={isPending}
			onClose={handleClose}
			onInputChange={handleInputChange}
			onOpen={handleOpen}
			withCleanup={withCleanup}
			value={opt}
			ref={ref}
			{...props}
		/>
	)
})

export default SelectAsync
