import React, { useRef, useEffect } from 'react'
import { useAsync, useDebounce } from 'src/hooks'
import { SelectBase } from './base'
import { fetchCities } from 'src/API'
import { BaseProps, OptBase, OpenSource } from 'src/types'

const noop = () => { }

interface Props<Opt> extends Omit<BaseProps<Opt>, 'isLoading' | 'options'> { }

function SelectAsync<Opt extends OptBase>({
	onInputChange = noop,
	onOpen = noop,
	onClose = noop,
	withCleanup = true,
	value: opt = { value: '', label: '' } as Opt,
	...props
}: Props<Opt>) {

	const [ debouncedCallback, cancel ] = useDebounce(fetchCities, 1000)
	const [ { isPending, data: options }, execute, setState ] = useAsync(debouncedCallback, 'fetchCities')
	const lastKeyword = useRef(opt.value)

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
		if (keyword)
			return execute(keyword)
		reset()
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
			isLoading={isPending}
			onClose={handleClose}
			onInputChange={handleInputChange}
			onOpen={handleOpen}
			withCleanup={withCleanup}
			{...props}
		/>
	)
}

export default SelectAsync
